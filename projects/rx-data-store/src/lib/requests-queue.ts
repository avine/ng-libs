import { catchError, EMPTY, finalize, map, mergeMap, Observable, of, reduce, Subject, withLatestFrom } from 'rxjs';

export type Mutation<T, R> = [R, ((data: T, response: R) => T) | undefined];

export class RequestsQueue<T, R> {
  private requestsCount = 0;

  private mutationsQueue$ = new Subject<Observable<Mutation<T, R>>>();

  mutations$ = this.mutationsQueue$.pipe(
    mergeMap((mutation$: Observable<Mutation<T, R>>) => mutation$, 1),
    reduce((mutations, mutation) => {
      mutations.push(mutation);
      return mutations;
    }, [] as Mutation<T, R>[]),
    map(
      (mutations) => (data: T) =>
        mutations.reduce((acc, [response, mutate]) => (mutate ? mutate(acc, response) : acc), data)
    )
  );

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
        })
      )
    );
  }
}
