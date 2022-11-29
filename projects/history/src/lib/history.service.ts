import { filter, map, Observable, scan, shareReplay, Subscription, tap } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Navigation } from './history.types';

@Injectable({
  providedIn: 'root',
})
export class HistoryService implements OnDestroy {
  historySize?: number;

  readonly history$: Observable<string[]> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    scan((history, { url }) => {
      history.unshift(url);
      if (this.historySize) {
        history = history.slice(0, this.historySize);
      }
      return history;
    }, [] as string[]),
    tap((history) => (this._historySnapshot = history)),
    shareReplay(1)
  );

  _historySnapshot: string[] = [];

  get historySnapshot(): string[] {
    return [...this._historySnapshot];
  }

  readonly navigation$: Observable<Navigation> = this.history$.pipe(
    map(([current, previous]) => ({ previous, current } as Navigation)),
    tap((navigation) => (this._navigationSnapshot = navigation)),
    shareReplay(1)
  );

  private _navigationSnapshot?: Navigation;

  get navigationSnapshot(): Navigation | undefined {
    return this._navigationSnapshot ? { ...this._navigationSnapshot } : undefined;
  }

  private subscription?: Subscription;

  constructor(private router: Router) {}

  init(historySize?: number): void {
    this.historySize = historySize;
    this.subscription = this.navigation$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
