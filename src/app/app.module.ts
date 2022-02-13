import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormStepperModule } from '@avine/ng-form-stepper';
import { IfNonNullishModule } from '@avine/ng-if-non-nullish';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormStepperComponent } from './form-stepper/form-stepper.component';
import { IfNonNullishComponent } from './if-non-nullish/if-non-nullish.component';

const materialComponents = [MatSlideToggleModule];

@NgModule({
  declarations: [AppComponent, IfNonNullishComponent, FormStepperComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    materialComponents,
    AppRoutingModule,
    IfNonNullishModule,
    FormStepperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
