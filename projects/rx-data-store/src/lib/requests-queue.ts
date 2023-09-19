import { catchError, EMPTY, finalize, map, mergeMap, Observable, of, reduce, Subject, withLatestFrom } from 'rxjs';

export type Mutation<T, R> = [R, ((data: T, response: R) => T) | undefined];

export class RequestsQueue<T, R> {
  private requestsCount = 0;

  private mutationsQueue$ = new Subject<Observable<Mutation<T, R>>>();

  /**
   * An observable that only emits a function when completed.
   * The emitted function accumulates the requested mutations.
   */
  mutations$ = this.mutationsQueue$.pipe(
    mergeMap((mutation$: Observable<Mutation<T, R>>) => mutation$, 1),
    reduce(
      (mutations, mutation) => {
        mutations.push(mutation);
        return mutations;
      },
      [] as Mutation<T, R>[],
    ),
    map(
      (mutations) => (data: T) =>
        mutations.reduce((acc, [response, mutate]) => (mutate ? mutate(acc, response) : acc), data),
    ),
  );

  /**
   * Add a request to the queue.
   *
   * @param request$ The request observable.
   * @param mutate The handler responsible for updating the data according to the response (of the request).
   * @param handleError Handle errors thrown by the request.
   */
  add(request$: Observable<R>, mutate?: (data: T, response: R) => T, handleError?: (error: any) => void) {
    this.requestsCount += 1;
    this.mutationsQueue$.next(
      request$.pipe(
        withLatestFrom(of(mutate)),
        catchError((error) => {
          handleError?.(error);
          return EMPTY;
        }),
        finalize(() => {
          this.requestsCount -= 1;
          if (this.requestsCount === 0) {
            this.mutationsQueue$.complete();
          }
        }),
      ),
    );
  }
}
