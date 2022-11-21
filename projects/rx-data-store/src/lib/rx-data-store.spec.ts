import { delay, interval, Observable, of, skip, take, tap, throwError, zip } from 'rxjs';

import { RequestsQueue } from './requests-queue';
import { RxDataStore } from './rx-data-store';

describe('RxDataStore', () => {
  let dataSource: jest.Mock<Observable<string>, [arg: string]>;
  beforeEach(() => {
    dataSource = jest.fn((arg: string) => of(arg));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should emit when initial args provided', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED']);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      await sequence(noop);
    });

    it('should not emit when initial args not provided', async () => {
      expect.assertions(0);

      // Given
      const dataStore = new RxDataStore(dataSource);

      // When / Then
      dataStore.data$.subscribe(() => expect(true).toBeTruthy());

      await sequence(noop);
    });
  });

  describe('fetch', () => {
    it('should trigger data$ to emit (even when args not provided)', async () => {
      expect.assertions(1);

      // Given (subscribe) / Then (expect)
      const dataStore = new RxDataStore(dataSource);
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      dataStore.fetch('FETCHED');

      await sequence(noop);
    });

    it('should trigger data$ to emit (even if called before data$ subscription)', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(dataSource);

      // When
      dataStore.fetch('FETCHED');

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      await sequence(noop);
    });

    it('should trigger data$ to emit once even if called multiple times (thanks to debounceTime)', async () => {
      expect.assertions(1);

      // Given (subscribe) / Then (expect)
      const dataStore = new RxDataStore(dataSource);
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      dataStore.fetch('...');
      dataStore.fetch('...');
      dataStore.fetch('FETCHED');

      await sequence(noop);
    });

    it('should trigger data$ to emit once even if there are multiple subscribers (thanks to shareReplay)', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource);
      zip([dataStore.data$, dataStore.data$, dataStore.data$]).subscribe((dataList) => {
        // Then
        expect(dataSource).toHaveBeenCalledTimes(1);
        expect(dataList).toEqual(['FETCHED', 'FETCHED', 'FETCHED']);
      });

      // When
      dataStore.fetch('FETCHED');

      await sequence(noop);
    });

    it('should trigger data$ to emit multiple times', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource);
      const fetched = ['FETCHED 1', 'FETCHED 2'];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When (fetching multiple times)
      dataStore.fetch('FETCHED 1');
      await sequence(() => dataStore.fetch('FETCHED 2'));
    });
  });

  describe('setData', () => {
    it('should trigger data$ to emit without fetching', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource);

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('DATA'));

      // When
      dataStore.setData('DATA');
      await sequence(() => expect(dataSource).not.toHaveBeenCalled());
    });

    it('should trigger data$ to emit multiple times without fetching', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource);
      const dataset = ['DATA 1', 'DATA 2'];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(dataset.shift()));

      // When
      dataStore.setData('DATA 1');
      await sequence(
        () => dataStore.setData('DATA 2'),
        () => expect(dataSource).not.toHaveBeenCalled()
      );
    });

    it('should work with falsy values', async () => {
      expect.assertions(2);

      // Given
      const _dataSource = jest.fn(() => of(true));
      const dataStore = new RxDataStore(_dataSource);

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(false));

      // When
      dataStore.setData(false);
      await sequence(() => expect(_dataSource).not.toHaveBeenCalled());
    });
  });

  describe('updateData', () => {
    it('should trigger data$ to emit without fetching', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource, ['Hello']);
      const dataset = ['Hello', 'Hello World!'];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(dataset.shift()));

      // When
      await sequence(
        () => dataStore.updateData((data) => `${data} World!`),
        () => expect(dataSource).toHaveBeenCalledTimes(1)
      );
    });

    it('should set pending status to false when endOfPending set to true', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource, ['Hello']);
      const pendingStatus = [true, false];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe();
      dataStore.pending$.subscribe((pending) => expect(pending).toBe(pendingStatus.shift()));

      // When
      dataStore.pending();
      await sequence(() => dataStore.updateData((data) => `${data} World!`, true));
    });

    it('should call console.error when dataSnapshot is undefined', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource);
      const pendingStatus = [true, false];

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      dataStore.data$.subscribe();
      dataStore.pending$.subscribe((pending) => expect(pending).toBe(pendingStatus.shift()));

      // When
      dataStore.pending();
      await sequence(
        () => dataStore.updateData((data) => data, true),
        () => expect(consoleError).toHaveBeenCalled()
      );
    });
  });

  describe('refresh', () => {
    it('should fetch again', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED']);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.refresh(),
        () => expect(dataSource).toHaveBeenCalledTimes(2)
      );
    });

    it('should do nothing when args not provided', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(dataSource);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe(() => expect(true).toBeTruthy());

      // When
      dataStore.refresh();
      await sequence(() => expect(dataSource).toHaveBeenCalledTimes(0));
    });
  });

  describe('mutation', () => {
    it('should work when handler provided', async () => {
      expect.assertions(8);

      // Given
      const dataStore = new RxDataStore(() => of(['DATA']), []);
      const dataset = [['DATA'], ['DATA', 'MUTATION']];
      const pendingStatus = [true, false, true, false]; // One `true` for the fetch and another for the mutation

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toEqual(dataset.shift()));
      dataStore.pending$.subscribe((data) => expect(data).toBe(pendingStatus.shift()));

      const mutate = jest.fn((data: string[], value: string) => {
        data.push(value);
        return data;
      });

      await sequence(() => {
        dataStore
          // When
          .mutation(of('MUTATION'), mutate)
          // Then
          .subscribe((response) => {
            expect(response).toBe('MUTATION');
            expect(mutate).toHaveBeenCalled();
          });
      });
    });

    it('should work when handler not provided', async () => {
      expect.assertions(6);

      // Given
      const dataStore = new RxDataStore(() => of('DATA'), []);
      const pendingStatus = [true, false, true, false]; // One `true` for the fetch and another for the mutation

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toEqual('DATA'));
      dataStore.pending$.subscribe((data) => expect(data).toBe(pendingStatus.shift()));

      await sequence(() => {
        dataStore
          .mutation(of('WHATEVER')) // When
          .subscribe((response) => expect(response).toBe('WHATEVER')); // Then
      });
    });

    it('should handle error', async () => {
      expect.assertions(7);

      // Given
      const dataStore = new RxDataStore(() => of(['DATA']), []);
      const pendingStatus = [true, false, true, false]; // One `true` for the fetch and another for the mutation

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toEqual(['DATA']));
      dataStore.pending$.subscribe((data) => expect(data).toBe(pendingStatus.shift()));

      const mutate = jest.fn();

      await sequence(() => {
        dataStore
          // When
          .mutation(
            throwError(() => new Error('Oops!')),
            mutate
          )
          // Then
          .subscribe({
            error: (error) => {
              expect(error.message).toBe('Oops!');
              expect(mutate).not.toHaveBeenCalled();
            },
          });
      });
    });
  });

  describe('mutationQueue', () => {
    it('should work', (done) => {
      expect.assertions(6);

      // Given
      const dataStore = new RxDataStore(() => of(['DATA']), []);
      const dataset = [['DATA'], ['DATA', 'MUTATION 1', 'MUTATION 2']];

      const mutate = jest.fn((data: string[], value: string) => {
        data.push(value);
        return data;
      });

      expect((dataStore as any).requestsQueue).toBeUndefined();

      // When
      dataStore.data$.subscribe((data) => {
        // Then
        expect(data).toEqual(dataset.shift());
        if (dataset.length === 0) {
          expect(mutate).toHaveBeenCalledTimes(2);
          expect((dataStore as any).requestsQueue).toBeUndefined();
          done();
        }
      });

      // When
      dataStore.mutationQueue(of('MUTATION 1').pipe(delay(0)), mutate);
      dataStore.mutationQueue(of('MUTATION 2').pipe(delay(0)), mutate);

      expect((dataStore as any).requestsQueue).toBeInstanceOf(RequestsQueue);
    });
  });

  describe('pending', () => {
    it('should change when fetching data', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource, ['DATA']);
      const pendingStatus = [true, false];

      // When (subscribe) / Then (expect)
      dataStore.pending$.subscribe((pending) => expect(pending).toBe(pendingStatus.shift()));
      dataStore.data$.subscribe();

      await sequence(noop);
    });

    it('should change when calling .pending() and .setData()', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(dataSource);
      const pendingStatus = [true, false];

      // When (subscribe) / Then (expect)
      dataStore.pending$.subscribe((pending) => expect(pending).toBe(pendingStatus.shift()));
      dataStore.data$.subscribe();

      // When
      dataStore.pending();
      await sequence(() => dataStore.setData('DATA', true));
    });

    it('should be set to false after dataSource throws error', (done) => {
      expect.assertions(2);

      // Given
      const _dataSource = () => throwError(() => new Error('Oops!'));
      const dataStore = new RxDataStore(_dataSource);
      const pendingStatus = [true, false];

      // When (subscribe) / Then (expect)
      dataStore.pending$.subscribe((pending) => expect(pending).toBe(pendingStatus.shift()));

      // When
      dataStore.data$.subscribe({ error: () => done() });

      // When
      dataStore.fetch();
    });
  });

  describe('error', () => {
    it('should emit when error occurs while fetching', (done) => {
      expect.assertions(1);

      // Given
      const _dataSource = () => throwError(() => new Error('Oops!'));
      const dataStore = new RxDataStore(_dataSource, []);

      // When (subscribe) / Then (expect)
      dataStore.error$.subscribe((error) => expect(error?.message).toBe('Oops!'));

      // When
      dataStore.data$.subscribe({ error: () => done() });
    });

    it('should emit when error occurs while mutating', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(dataSource, ['DATA']);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe();
      dataStore.error$.subscribe((error) => expect(error?.message).toBe('Oops!'));

      // When
      await sequence(() =>
        dataStore.mutation(throwError(() => new Error('Oops!'))).subscribe({ error: () => undefined })
      );
    });
  });

  describe('cache', () => {
    it('should be used when fetching with same args multiple times (basic)', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED'),
        () => expect(dataSource).toHaveBeenCalledTimes(1)
      );
    });

    it('should be used when fetching with same args multiple times (advanced)', async () => {
      expect.assertions(4);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED 1'], true);
      const fetched = ['FETCHED 1', 'FETCHED 2', 'FETCHED 1'];

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED 2'),
        () => dataStore.fetch('FETCHED 1'),
        () => expect(dataSource).toHaveBeenCalledTimes(2)
      );
    });

    it('should work with falsy values', async () => {
      expect.assertions(3);

      // Given
      const _dataSource = jest.fn(() => of(false));
      const dataStore = new RxDataStore(_dataSource, [], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(false));

      // When
      await sequence(
        () => dataStore.fetch(),
        () => expect(_dataSource).toHaveBeenCalledTimes(1)
      );
    });

    it('should not be used when refreshing (basic)', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.refresh(),
        () => expect(dataSource).toHaveBeenCalledTimes(2)
      );
    });

    it('should not be used when refreshing (advanced)', async () => {
      expect.assertions(5);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED 1'], true);
      const fetched = ['FETCHED 1', 'FETCHED 2', 'FETCHED 2', 'FETCHED 1'];

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED 2'),
        () => dataStore.refresh(),
        () => dataStore.fetch('FETCHED 1'),
        () => expect(dataSource).toHaveBeenCalledTimes(3)
      );
    });

    it('should be cleared when requested', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(dataSource, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // WHen
      await sequence(
        () => dataStore.clearCache(),
        () => dataStore.fetch('FETCHED'),
        () => expect(dataSource).toHaveBeenCalledTimes(2)
      );
    });
  });

  describe('dataSnapshot', () => {
    it('should be the latest emitted value', async () => {
      expect.assertions(5);

      // Given
      const dataStore = new RxDataStore(dataSource);
      const mixed = ['FETCHED', 'DATA'];
      expect(dataStore.dataSnapshot).toBeUndefined();

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(mixed.shift()));

      // When
      dataStore.fetch('FETCHED');

      await sequence(
        () => expect(dataStore.dataSnapshot).toBe('FETCHED'), // Then
        () => dataStore.setData('DATA'), // When
        () => expect(dataStore.dataSnapshot).toBe('DATA') // Then
      );
    });

    it('should map data when mapper available', async () => {
      expect.assertions(2);

      // Given
      const _data = { prop: 1 };
      const _dataSource = jest.fn(() => of(_data));
      const dataStore = new RxDataStore(_dataSource, []);
      dataStore.map = (d) => ({ ...d });

      // When
      dataStore.data$.subscribe();

      // Then
      await sequence(() => {
        expect(dataStore.dataSnapshot).not.toBe(_data);
        expect(dataStore.dataSnapshot).toEqual(_data);
      });
    });
  });

  describe('map', () => {
    afterEach(() => {
      RxDataStore.map = undefined;
    });

    it('should map the emitted value', async () => {
      expect.assertions(5);

      // Given
      const _data = { prop: 1 };
      const _dataSource = () => of(_data);
      const dataStore = new RxDataStore(_dataSource, []);
      dataStore.map = (d) => ({ ...d });

      // When (subscribe) / Then (expect)
      zip([dataStore.data$, dataStore.data$]).subscribe(([data1, data2]) => {
        expect(data2).not.toBe(data1);

        expect(data1).not.toBe(_data);
        expect(data1).toEqual(_data);

        expect(data2).not.toBe(_data);
        expect(data2).toEqual(_data);
      });

      await sequence(noop);
    });

    it('should map globally the emitted value', async () => {
      expect.assertions(5);

      // Given
      RxDataStore.map = (d) => ({ ...d });
      const _data = { prop: 1 };
      const _dataSource = () => of(_data);
      const dataStore = new RxDataStore(_dataSource, []);

      // When (subscribe) / Then (expect)
      zip([dataStore.data$, dataStore.data$]).subscribe(([data1, data2]) => {
        expect(data2).not.toBe(data1);

        expect(data1).not.toBe(_data);
        expect(data1).toEqual(_data);

        expect(data2).not.toBe(_data);
        expect(data2).toEqual(_data);
      });

      await sequence(noop);
    });

    it('should do nothing when equal to "noop" (bypassing the global mapper)', async () => {
      expect.assertions(2);

      // Given
      RxDataStore.map = (d) => ({ ...d });
      const _data = { prop: 1 };
      const _dataSource = () => of(_data);
      const dataStore = new RxDataStore(_dataSource, []);
      dataStore.map = 'noop';

      // When (subscribe) / Then (expect)
      zip([dataStore.data$, dataStore.data$]).subscribe(([data1, data2]) => {
        expect(data1).toBe(_data);
        expect(data2).toBe(_data);
      });

      await sequence(noop);
    });
  });

  describe('when dataSource emits more than one value', () => {
    it('should works', (done) => {
      expect.assertions(4);

      // Given
      const _dataSource = jest.fn(() => interval(0).pipe(take(3)));
      const dataStore = new RxDataStore(_dataSource, []);
      const dataset = [0, 1, 2];

      // When
      dataStore.data$.subscribe((data) => {
        // Then
        expect(data).toBe(dataset.shift());
        if (dataset.length === 0) {
          expect(_dataSource).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });

    it('should cancel previous dataSource subscription when fetching in between', (done) => {
      expect.assertions(6);

      // Given
      const _dataSource = jest.fn(() => interval(0).pipe(take(3)));
      const dataStore = new RxDataStore(_dataSource, []);
      const dataset = [0, 1, 0, 1, 2];

      // When
      dataStore.data$.subscribe((data) => {
        // Then
        expect(data).toBe(dataset.shift());

        if (dataset.length === 3) {
          // When
          dataStore.fetch();
        } else if (dataset.length === 0) {
          // Then
          expect(_dataSource).toHaveBeenCalledTimes(2);
          done();
        }
      });
    });

    it('should emits the "last" dataSource value (when using cache)', (done) => {
      expect.assertions(5);

      // Given
      const _dataSource = jest.fn(() => interval(0).pipe(take(3)));
      const dataStore = new RxDataStore(_dataSource, [], true);
      const dataset = [0, 1, 2, 2];

      // When
      dataStore.data$.subscribe((data) => {
        // Then
        expect(data).toBe(dataset.shift());

        if (dataset.length === 1) {
          // When
          dataStore.fetch();
        } else if (dataset.length === 0) {
          // Then
          expect(_dataSource).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });

    it('should emits the "latest" dataSource value (when using cache)', (done) => {
      expect.assertions(4);

      // Given
      const _dataSource = jest.fn(() => interval(0).pipe(take(3)));
      const dataStore = new RxDataStore(_dataSource, [], true);
      const dataset = [0, 1, 1];

      // When
      dataStore.data$.subscribe((data) => {
        // Then
        expect(data).toBe(dataset.shift());

        if (dataset.length === 1) {
          // When
          dataStore.fetch();
        } else if (dataset.length === 0) {
          // Then
          expect(_dataSource).toHaveBeenCalledTimes(1);
          done();
        }
      });
    });
  });

  describe('buildCacheKey', () => {
    it('should call console.error when unable to build key', async () => {
      expect.assertions(4);

      // Given
      const badArg: { circular?: {} } = {};
      badArg.circular = badArg;

      const _dataSource = jest.fn((arg: typeof badArg) => of(arg));
      const dataStore = new RxDataStore(_dataSource, [badArg], true);

      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(badArg));

      await sequence(
        // When
        () => dataStore.fetch(badArg),
        // Then
        () => {
          expect(consoleError).toHaveBeenCalledTimes(2);

          // Because the data could not be cached, the _dataSource has been triggered 2 times
          expect(_dataSource).toHaveBeenCalledTimes(2);
        }
      );
    });
  });
});

/**
 * Execute a sequence of callbacks.
 *
 * @description
 * Wait a bit before starting (thanks to `skip` operator), between callbacks and after ending (because `resolve` is called as the last callback).
 */
const sequence = (...callbacks: CallableFunction[]) =>
  new Promise<void>((resolve) => {
    let index = 0;
    const callback = () => {
      if (index < callbacks.length) {
        callbacks[index]();
        index += 1;
      } else {
        subscription.unsubscribe();
        resolve();
      }
    };
    const subscription = interval(0).pipe(skip(1), tap(callback)).subscribe();
  });

/**
 * Do nothing.
 *
 * @description
 * Use it as the sequence callback when you need wait a bit before ending the test.
 *
 * @example
 * sequence(noop);
 */
const noop = () => undefined;
