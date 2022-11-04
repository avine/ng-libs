import { debounceTime, filter, Observable, of, ReplaySubject, shareReplay, startWith, switchMap, tap } from 'rxjs';

export class RxDataStore<T, A extends any[]> {
  /**
   * Cache of the latest values from the data source per arguments.
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
    filter((data) => !!(data || this.args)),
    debounceTime(0),
    switchMap((data) => {
      if (data) {
        return of(data);
      }
      let cacheKey: string | void;
      if (this.useCache) {
        cacheKey = this.buildCacheKey(this.args as A);
        const cached = cacheKey && this.cache.get(cacheKey);
        if (cached) {
          return of(cached);
        }
      }
      return this.dataSource(...(this.args as A)).pipe(
        tap((data) => {
          if (this.useCache && cacheKey) {
            this.cache.set(cacheKey, data);
          }
        })
      );
    }),
    tap((data) => (this.dataSnapshot = data)),
    shareReplay(1)
  );

  /**
   * Get the data as instant snapshot.
   */
  dataSnapshot?: T;

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
   * Set the data without fetching from the `dataSource`.
   *
   * @param data
   */
  set(data: T) {
    this.dispatcher$.next(data);
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
