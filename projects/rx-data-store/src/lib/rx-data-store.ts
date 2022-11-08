import {
  BehaviorSubject,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

export class RxDataStore<T, A extends any[] = []> {
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
        tap(() => this._pending$.next(false))
      );
    }),
    tap((data) => (this.dataSnapshot = data)),
    shareReplay(1),
    map((data) => {
      if (this.map) {
        return this.map !== 'noop' ? this.map(data) : data;
      }
      if (RxDataStore.map) {
        return RxDataStore.map(data);
      }
      return data;
    })
  );

  private _pending$ = new BehaviorSubject(false);

  /**
   * Check the pending status of the data store.
   */
  pending$ = this._pending$.asObservable();

  /**
   * Get the data as instant snapshot.
   */
  dataSnapshot?: T;

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
  constructor(private dataSource: (...args: A) => Observable<T>, private args?: A, public useCache = false) {}

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
   * Set the pending status of the data store.
   *
   * @description
   * Call this method when starting an asynchronous data update to mark the pending status as `true`.
   * When the data is finally available, calling `.set()` will automatically mark the pending status as `false`.
   *
   * @example
   * const dataStore = new RxDataStore(() => of('Initial data'), []);
   * dataStore.data$.subscribe();
   * dataStore.pending$.subscribe(console.log);
   * dataStore.pending(); // `pending$` will emits `true`.
   * setTimeout(() => {
   *   dataStore.set('Updated data'); // `pending$` will emits `false`.
   * }, 1000);
   */
  pending(state = true) {
    this._pending$.next(state);
  }

  /**
   * Set the data without fetching it from the `dataSource`.
   */
  set(data: T) {
    this.dispatcher$.next(data);
    if (this._pending$.value) {
      this._pending$.next(false);
    }
  }

  /**
   * Update the data (from current data snapshot) without fetching it from the `dataSource`.
   */
  update(mutate: (data: T) => T) {
    if (this.dataSnapshot === undefined) {
      console.error('RxDataStore: unable to update because the current data snapshot is undefined.');
      return;
    }
    this.set(mutate(this.dataSnapshot));
  }

  /**
   * Clear cache.
   */
  clearCache() {
    this.cache.clear();
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
}
