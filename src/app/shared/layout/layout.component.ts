import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  private readonly subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.sidenav.close())
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
