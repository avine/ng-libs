import { ReplaySubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode, MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

const materialModules = [LayoutModule, MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule] as const;

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterModule, ...materialModules, MenuComponent],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  @ViewChild(MatSidenavContent) content!: MatSidenavContent;

  drawerMode!: MatDrawerMode;

  closeOnNavigationEnd!: boolean;

  isSidenavOpened$ = new ReplaySubject<boolean>(1);

  private readonly subscription = new Subscription();

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.breakpointObserver.observe(Breakpoints.Web).subscribe(({ matches: isWeb }) => {
        if (isWeb) {
          this.drawerMode = 'side';
          this.closeOnNavigationEnd = false;
        } else {
          this.drawerMode = 'over';
          this.closeOnNavigationEnd = true;
        }
      })
    );

    this.isSidenavOpened$.next(this.drawerMode === 'over' ? false : true);

    this.subscription.add(
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          if (this.closeOnNavigationEnd) {
            this.sidenav.close();
          }

          this.document.defaultView?.requestAnimationFrame(() =>
            this.content.getElementRef().nativeElement.scrollTo(0, 0)
          );
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
