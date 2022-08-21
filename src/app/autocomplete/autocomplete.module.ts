import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@avine/ng-autocomplete';

import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { DemoComponent } from './demo/demo.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { StandaloneComponent } from './standalone/standalone.component';

@NgModule({
  declarations: [DemoComponent, ReactiveFormComponent, TemplateFormComponent, StandaloneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    AutocompleteRoutingModule,
    AutocompleteModule,
  ],
})
export class AutocompleteDemoModule {}
