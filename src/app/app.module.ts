import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, LayoutComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
