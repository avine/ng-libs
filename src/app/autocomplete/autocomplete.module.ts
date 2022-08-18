import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@avine/ng-autocomplete';

import { AutocompleteRoutingModule } from './autocomplete-routing.module';
import { DemoComponent } from './demo/demo.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
  declarations: [DemoComponent, ReactiveFormComponent],
  imports: [CommonModule, ReactiveFormsModule, OverlayModule, AutocompleteRoutingModule, AutocompleteModule],
})
export class AutocompleteDemoModule {}
