import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode, MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

const materialModules = [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, LayoutModule] as const;

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ...materialModules, MenuComponent],
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

  private readonly subscription = new Subscription();

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
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

    this.subscription.add(
      this.breakpointObserver.observe(Breakpoints.Handset).subscribe(({ matches }) => {
        if (matches) {
          this.drawerMode = 'over';
          this.closeOnNavigationEnd = true;
        } else {
          this.drawerMode = 'side';
          this.closeOnNavigationEnd = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
