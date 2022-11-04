import { interval, Observable, of, skip, tap, zip } from 'rxjs';

import { RxDataStore } from './rx-data-store';

describe('RxDataStore', () => {
  let fetch: jest.Mock<Observable<string>, [arg: string]>;
  beforeEach(() => {
    fetch = jest.fn((arg: string) => of(arg));
  });

  describe('constructor', () => {
    it('should emit when initial args provided', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED']);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      await sequence(noop);
    });

    it('should not emit when initial args not provided', async () => {
      expect.assertions(0);

      // Given
      const dataStore = new RxDataStore(fetch);

      // When / Then
      dataStore.data$.subscribe(() => expect(true).toBeTruthy());

      await sequence(noop);
    });
  });

  describe('fetch', () => {
    it('should trigger data$ to emit (even when args not provided)', async () => {
      expect.assertions(1);

      // Given (subscribe) / Then (expect)
      const dataStore = new RxDataStore(fetch);
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      dataStore.fetch('FETCHED');

      await sequence(noop);
    });

    it('should trigger data$ to emit (even if called before data$ subscription)', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(fetch);

      // When
      dataStore.fetch('FETCHED');

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      await sequence(noop);
    });

    it('should trigger data$ to emit once even if called multiple times (thanks to debounceTime)', async () => {
      expect.assertions(1);

      // Given (subscribe) / Then (expect)
      const dataStore = new RxDataStore(fetch);
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
      const dataStore = new RxDataStore(fetch);
      zip([dataStore.data$, dataStore.data$, dataStore.data$]).subscribe((dataList) => {
        // Then
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(dataList).toEqual(['FETCHED', 'FETCHED', 'FETCHED']);
      });

      // When
      dataStore.fetch('FETCHED');

      await sequence(noop);
    });

    it('should trigger data$ to emit multiple times', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(fetch);
      const fetched = ['FETCHED 1', 'FETCHED 2'];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When (fetching multiple times)
      dataStore.fetch('FETCHED 1');
      await sequence(() => dataStore.fetch('FETCHED 2'));
    });
  });

  describe('set', () => {
    it('should trigger data$ to emit without fetching', async () => {
      expect.assertions(2);

      // Given
      const dataStore = new RxDataStore(fetch);

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('DATA'));

      // When
      dataStore.set('DATA');
      await sequence(() => expect(fetch).not.toHaveBeenCalled());
    });

    it('should trigger data$ to emit multiple times without fetching', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(fetch);
      const dataset = ['DATA 1', 'DATA 2'];

      // Given (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(dataset.shift()));

      // When
      dataStore.set('DATA 1');
      await sequence(
        () => dataStore.set('DATA 2'),
        () => expect(fetch).not.toHaveBeenCalled()
      );
    });
  });

  describe('refresh', () => {
    it('should fetch again', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED']);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.refresh(),
        () => expect(fetch).toHaveBeenCalledTimes(2)
      );
    });

    it('should do nothing when args not provided', async () => {
      expect.assertions(1);

      // Given
      const dataStore = new RxDataStore(fetch);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe(() => expect(true).toBeTruthy());

      // When
      dataStore.refresh();
      await sequence(() => expect(fetch).toHaveBeenCalledTimes(0));
    });
  });

  describe('cache', () => {
    it('should be used when fetching with same args multiple times (basic)', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED'),
        () => expect(fetch).toHaveBeenCalledTimes(1)
      );
    });

    it('should be used when fetching with same args multiple times (advanced)', async () => {
      expect.assertions(4);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED 1'], true);
      const fetched = ['FETCHED 1', 'FETCHED 2', 'FETCHED 1'];

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED 2'),
        () => dataStore.fetch('FETCHED 1'),
        () => expect(fetch).toHaveBeenCalledTimes(2)
      );
    });

    it('should not be used when refreshing (basic)', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // When
      await sequence(
        () => dataStore.refresh(),
        () => expect(fetch).toHaveBeenCalledTimes(2)
      );
    });

    it('should not be used when refreshing (advanced)', async () => {
      expect.assertions(5);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED 1'], true);
      const fetched = ['FETCHED 1', 'FETCHED 2', 'FETCHED 2', 'FETCHED 1'];

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe(fetched.shift()));

      // When
      await sequence(
        () => dataStore.fetch('FETCHED 2'),
        () => dataStore.refresh(),
        () => dataStore.fetch('FETCHED 1'),
        () => expect(fetch).toHaveBeenCalledTimes(3)
      );
    });

    it('should be cleared when requested', async () => {
      expect.assertions(3);

      // Given
      const dataStore = new RxDataStore(fetch, ['FETCHED'], true);

      // When (subscribe) / Then (expect)
      dataStore.data$.subscribe((data) => expect(data).toBe('FETCHED'));

      // WHen
      await sequence(
        () => dataStore.clearCache(),
        () => dataStore.fetch('FETCHED'),
        () => expect(fetch).toHaveBeenCalledTimes(2)
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
