import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IfNonNullishModule } from '@avine/ng-if-non-nullish';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IfNonNullishComponent } from './if-non-nullish/if-non-nullish.component';

@NgModule({
  declarations: [AppComponent, IfNonNullishComponent],
  imports: [BrowserModule, AppRoutingModule, IfNonNullishModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
