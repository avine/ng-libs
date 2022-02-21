import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { MenuComponent } from './menu/menu.component';

const materialModules = [MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule];

@NgModule({
  imports: [CommonModule, RouterModule, materialModules],
  declarations: [LayoutComponent, MenuComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
