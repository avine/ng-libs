import { finalize, mergeMap, Observable, of, Subject, withLatestFrom } from 'rxjs';

export type Mutation<T, R> = [R, ((data: T, response: R) => T) | undefined];

export class RequestsQueue<T, R> {
  private requestsCount = 0;

  private mutationsQueue$ = new Subject<Observable<Mutation<T, R>>>();

  mutations$ = this.mutationsQueue$.pipe(mergeMap((mutation$: Observable<Mutation<T, R>>) => mutation$, 1));

  private mutationsBuffer: Mutation<T, R>[] = [];

  constructor(private callback: (mutations: Mutation<T, R>[]) => void) {
    this.mutationsSubscription();
  }

  add(request$: Observable<R>, mutate?: (data: T, response: R) => T) {
    this.requestsCount += 1;
    this.mutationsQueue$.next(
      request$.pipe(
        withLatestFrom(of(mutate)),
        finalize(() => {
          this.requestsCount -= 1;
          if (this.requestsCount === 0) {
            this.flushMutationsBuffer();
          }
        })
      )
    );
  }

  private mutationsSubscription() {
    this.mutations$.subscribe((mutation) => this.mutationsBuffer.push(mutation));
  }

  private flushMutationsBuffer() {
    this.callback(this.mutationsBuffer);
    this.mutationsBuffer = [];
  }
}
