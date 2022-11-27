import { delay, of, throwError } from 'rxjs';

import { RequestsQueue } from './requests-queue';

describe('RequestsQueue', () => {
  let mutateA: jest.Mock<number, [data: number, response: number]>;
  let mutateB: jest.Mock<number, [data: number, response: number]>;

  let requestsQueue: RequestsQueue<number, number>;

  beforeEach(() => {
    // Given
    mutateA = jest.fn((data, response) => data + response);
    mutateB = jest.fn((data, response) => data + response);

    requestsQueue = new RequestsQueue();
  });

  it('should emit a function that accumulates mutations (but only when the queue completes)', (done) => {
    // When
    requestsQueue.mutations$.subscribe({
      next: (mutate) => {
        // Then
        expect(mutate(0)).toBe(10); // 0 + 1 + 2 + 3 + 4

        expect(mutateA).toHaveBeenNthCalledWith(1, 0, 1);
        expect(mutateA).toHaveBeenNthCalledWith(2, 1, 2);

        expect(mutateB).toHaveBeenNthCalledWith(1, 3, 3);
        expect(mutateB).toHaveBeenNthCalledWith(2, 6, 4);
      },
      complete: done,
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });

  it('should work when adding a request observable without a "mutate" function', (done) => {
    // When
    requestsQueue.mutations$.subscribe({
      next: (mutate) => {
        // Then
        expect(mutate(0)).toBe(3); // 0 + 1 + 2

        expect(mutateA).toHaveBeenNthCalledWith(1, 0, 1);
        expect(mutateA).toHaveBeenNthCalledWith(2, 1, 2);
      },
      complete: done,
    });

    // When
    requestsQueue.add(of(1).pipe(delay(0)), mutateA);
    requestsQueue.add(of(99).pipe(delay(0))); // when "mutate" function is not defined, the response is simply not used.
    requestsQueue.add(of(2).pipe(delay(0)), mutateA);
  });

  it('should ignore errors and emit the accumulation of mutations when the queue completes', (done) => {
    // Given
    const error = new Error('Oops!');

    // When
    requestsQueue.mutations$.subscribe({
      next: (mutate) => {
        // Then
        expect(mutate(0)).toBe(10); // 0 + 1 + 2 + 3 + 4

        expect(mutateA).toHaveBeenNthCalledWith(1, 0, 1);
        expect(mutateA).toHaveBeenNthCalledWith(2, 1, 2);

        expect(mutateB).toHaveBeenNthCalledWith(1, 3, 3);
        expect(mutateB).toHaveBeenNthCalledWith(2, 6, 4);
      },
      complete: done,
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(throwError(() => error).pipe(delay(0)));
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });

  it('should notify errors', (done) => {
    // Given
    const error = new Error('Oops!');
    const handleError = jest.fn();

    // When
    requestsQueue.mutations$.subscribe({
      next: () => {
        // Then
        expect(handleError).toHaveBeenCalledWith(error);
      },
      complete: done,
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(throwError(() => error).pipe(delay(0)), undefined, handleError);
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });
});
