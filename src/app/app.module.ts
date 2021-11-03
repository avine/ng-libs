import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IfNonNullishModule } from '@avine/ng-if-non-nullish';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IfNonNullishComponent } from './if-non-nullish/if-non-nullish.component';

const materialComponents = [MatButtonModule, MatGridListModule];

@NgModule({
  declarations: [AppComponent, IfNonNullishComponent],
  imports: [BrowserModule, BrowserAnimationsModule, materialComponents, AppRoutingModule, IfNonNullishModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
