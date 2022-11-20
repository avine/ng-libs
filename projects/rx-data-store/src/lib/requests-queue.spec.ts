import { delay, of, throwError } from 'rxjs';

import { RequestsQueue } from './requests-queue';

describe('RequestsQueue', () => {
  it('should emit mutations when queue is completed', (done) => {
    // Given
    const requestsQueue = new RequestsQueue<number, number>();

    const mutateA = jest.fn();
    const mutateB = jest.fn();

    // When
    requestsQueue.mutations$.subscribe((mutations) => {
      // Then
      expect(mutations).toEqual([
        [1, mutateA],
        [2, mutateA],
        [3, mutateB],
        [4, mutateB],
      ]);
      done();
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });

  it('should ignore errors', (done) => {
    // Given
    const requestsQueue = new RequestsQueue<number, number>();

    const error = new Error('Oops!');

    const mutateA = jest.fn();
    const mutateB = jest.fn();

    // When
    requestsQueue.mutations$.subscribe((mutations) => {
      // Then
      expect(mutations).toEqual([
        [1, mutateA],
        [2, mutateA],
        [3, mutateB],
        [4, mutateB],
      ]);
      done();
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(throwError(() => error).pipe(delay(0)));
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });

  it('should notify errors', (done) => {
    // Given
    const requestsQueue = new RequestsQueue<number, number>();

    const error = new Error('Oops!');
    const handleError = jest.fn();

    const mutateA = jest.fn();
    const mutateB = jest.fn();

    // When
    requestsQueue.mutations$.subscribe((mutations) => {
      // Then
      expect(handleError).toHaveBeenCalledWith(error);
      expect(mutations).toEqual([
        [1, mutateA],
        [2, mutateA],
        [3, mutateB],
        [4, mutateB],
      ]);
      done();
    });

    // When
    requestsQueue.add(of(1, 2).pipe(delay(0)), mutateA);
    requestsQueue.add(throwError(() => error).pipe(delay(0)), undefined, handleError);
    requestsQueue.add(of(3, 4).pipe(delay(0)), mutateB);
  });
});
