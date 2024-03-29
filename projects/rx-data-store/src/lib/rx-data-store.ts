import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  skip,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { RequestsQueue } from './requests-queue';

export class RxDataStore<T, A extends any[] = [], R = any> {
  /**
   * Define a global mapper that maps the value just before it is emitted by `data$`.
   * To bypass the global mapper for a particular instance, set the instance property `map` to `'noop'`.
   *
   * @description
   * You can use this feature to, for example, clone the data before it is emitted.
   */
  static map?: <T>(data: T) => T;

  /**
   * Cache of the latest values from the `dataSource` per arguments.
   */
  private cache = new Map<string, T>();

  /**
   * Triggers the `data$` pipeline.
   */
  private dispatcher$ = new ReplaySubject<T | undefined>(1);

  /**
   * Observe the data.
   */
  data$: Observable<T> = this.dispatcher$.pipe(
    startWith(undefined),
    filter((data) => !!(data !== undefined || this.args)),
    debounceTime(0),
    switchMap((data) => {
      if (data !== undefined) {
        return of(data);
      }
      let cacheKey: string | void;
      if (this.useCache) {
        cacheKey = this.buildCacheKey(this.args as A);
        if (cacheKey && this.cache.has(cacheKey)) {
          return of(this.cache.get(cacheKey) as T);
        }
      }
      this._pending$.next(true);
      return this.dataSource(...(this.args as A)).pipe(
        tap((data) => {
          if (this.useCache && cacheKey) {
            this.cache.set(cacheKey, data);
          }
        }),
        catchError(this.handleError.bind(this)),
        finalize(() => this._pending$.next(false)),
      );
    }),
    tap((data) => (this._dataSnapshot = data)),
    shareReplay(1),
    map((data) => this._map(data)),
  );

  private _pending$ = new BehaviorSubject(false);

  /**
   * Check the pending status of the data store.
   */
  pending$ = this._pending$.pipe(skip(1), distinctUntilChanged());

  private _dataSnapshot?: T;

  /**
   * Get the data as instant snapshot.
   */
  get dataSnapshot(): T | undefined {
    if (this._dataSnapshot === undefined) {
      return;
    }
    return this._map(this._dataSnapshot);
  }

  private _error$ = new Subject<any>();

  /**
   * An observable of errors emitted while fetching or mutating data.
   */
  error$ = this._error$.asObservable();

  /**
   * Maps the value just before it is emitted by `data$`.
   *
   * If the instance mapper is not defined then the global mapper `RxDataStore.map` is used (if defined).
   * To bypass the global mapper, set the instance mapper value to `'noop'`.
   *
   * @description
   * You can use this feature to, for example, clone the data before it is emitted.
   */
  map?: ((data: T) => T) | 'noop';

  private requestsQueue?: RequestsQueue<T, R>;

  /**
   * Reactive data store
   *
   * @example
   * // You don't need to call `.fetch` to start receiving data when initial `args` are provided.
   * const withInitialArgs = new RxDataStore((i: number) => of(`DATA ${i}`), [1]);
   * withInitialArgs.data$.subscribe((data) => console.log(data === 'DATA 1')); // true
   *
   * // You need to call `.fetch` to start receiving data when initial `args` are not provided.
   * const withoutInitialArgs = new RxDataStore((i: number) => of(`DATA ${i}`));
   * withoutInitialArgs.data$.subscribe((data) => console.log(data === 'DATA 1')); // true
   * withoutInitialArgs.fetch(1);
   *
   * @param dataSource A function that accepts arguments and returns an observable of the data.
   * @param args An array of initial arguments to use when fetching the data.
   * @param useCache Configure cache usage.
   */
  constructor(
    private dataSource: (...args: A) => Observable<T>,
    private args?: A,
    public useCache = false,
  ) {}

  /**
   * Fetch the data using provided arguments.
   *
   * @description
   * The data will be fetched from the `dataSource` or from the cache if available.
   *
   * @param args The arguments to use when fetching the data.
   */
  fetch(...args: A) {
    this.args = args;
    this.dispatcher$.next(undefined);
  }

  /**
   * Fetch the data from the `dataSource` (using the latest arguments) even if the cache is available.
   */
  refresh() {
    if (!this.args) {
      return;
    }
    if (this.useCache) {
      const cacheKey = this.buildCacheKey(this.args);
      if (cacheKey) {
        this.cache.delete(cacheKey);
      }
    }
    this.dispatcher$.next(undefined);
  }

  /**
   * Executes a request and updates the data store according to the response.
   *
   * @description
   * The pending status will be automatically updated during the process.
   *
   * @example
   * const dataStore = new RxDataStore(() => of(['DATA']), []);
   * dataStore.data$.subscribe(console.log); // ['DATA'] and ['DATA', 'MUTATION']
   * dataStore.mutation(of('MUTATION'), (data, value) => {
   *  data.push(value);
   *  return data;
   * }).subscribe(console.log); // 'MUTATION'
   *
   * @param request$ The request observable.
   * @param mutate The handler responsible for updating the data store.
   * @returns The value emitted by the request observable.
   */
  mutation<R>(request$: Observable<R>, mutate?: (data: T, response: R) => T): Observable<R> {
    this._pending$.next(true);
    return request$.pipe(
      tap((response) => mutate && this.updateData((data) => mutate(data, response))),
      catchError(this.handleError.bind(this)),
      finalize(() => this._pending$.next(false)),
    );
  }

  /**
   * Adds multiple requests to a queue and updates the data store only once the queue completes.
   *
   * @param request$ The request observable.
   * @param mutate The handler responsible for updating the data store.
   */
  mutationQueue(request$: Observable<R>, mutate?: (data: T, response: R) => T): void {
    if (!this.requestsQueue) {
      this.requestsQueue = new RequestsQueue<T, R>();
      this.requestsQueue.mutations$.subscribe((mutate) => {
        this.requestsQueue = undefined;
        this.updateData(mutate, true);
      });
    }
    this._pending$.next(true);
    this.requestsQueue.add(request$, mutate, this.handleError.bind(this));
  }

  /**
   * Set the pending status of the data store.
   *
   * @description
   * Call this method when starting an asynchronous data update to mark the pending status as `true`.
   * When the data is finally available, calling `.setData()` will automatically mark the pending status as `false`.
   *
   * @example
   * const dataStore = new RxDataStore(() => of('Initial data'), []);
   * dataStore.data$.subscribe();
   * dataStore.pending$.subscribe(console.log);
   * dataStore.pending(); // `pending$` will emits `true`.
   * setTimeout(() => {
   *   dataStore.setData('Updated data', true); // `pending$` will emits `false`.
   * }, 1000);
   */
  pending(state = true) {
    this._pending$.next(state);
  }

  /**
   * Set the data without fetching it from the `dataSource`.
   */
  setData(data: T, endOfPending = false) {
    this.dispatcher$.next(data);
    if (endOfPending) {
      this._pending$.next(false);
    }
  }

  /**
   * Update the data (from current data snapshot) without fetching it from the `dataSource`.
   */
  updateData(mutate: (data: T) => T, endOfPending = false) {
    const dataSnapshot = this.dataSnapshot; // Use a local variable to run the getter once.
    if (dataSnapshot === undefined) {
      if (endOfPending) {
        this._pending$.next(false);
      }
      console.error('RxDataStore: unable to update data because the data snapshot is undefined.');
      return;
    }
    this.setData(mutate(dataSnapshot), endOfPending);
  }

  /**
   * Clear cache.
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Map data using local `this.map()` or global `RxDataStore.map()`.
   */
  private _map(data: T): T {
    if (this.map) {
      return this.map !== 'noop' ? this.map(data) : data;
    }
    if (RxDataStore.map) {
      return RxDataStore.map(data);
    }
    return data;
  }

  /**
   * Build cache key safely.
   */
  private buildCacheKey(args: A): string | void {
    try {
      return JSON.stringify(args);
    } catch {
      console.error('RxDataStore: unable to build cache key from arguments', args);
    }
  }

  private handleError(error: any) {
    this._error$.next(error);
    return throwError(() => error);
  }
}
