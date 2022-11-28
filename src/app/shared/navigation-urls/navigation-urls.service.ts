import { filter, map, Observable, pairwise, shareReplay, startWith, Subscription, tap } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { NavigationUrls } from './navigation-urls.types';

@Injectable({
  providedIn: 'root',
})
export class NavigationUrlsService implements OnDestroy {
  urls$: Observable<NavigationUrls> = this.router.events.pipe(
    startWith(new NavigationEnd(0, '', '')),
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    pairwise(),
    map(([{ url: previous }, { url: current }]) => ({ previous: previous || null, current } as NavigationUrls)),
    tap((urls) => (this._urlsSnapshot = urls)),
    shareReplay(1)
  );

  private _urlsSnapshot?: NavigationUrls;

  get urlsSnapshot(): NavigationUrls | undefined {
    return this._urlsSnapshot;
  }

  private subscription?: Subscription;

  constructor(private router: Router) {}

  init(): void {
    this.subscription = this.urls$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
