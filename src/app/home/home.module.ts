import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

const materialModules = [MatButtonModule, MatCardModule];

@NgModule({
  imports: [CommonModule, HomeRoutingModule, materialModules],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
