import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

const materialModules = [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule] as const;

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ...materialModules, MenuComponent],
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
