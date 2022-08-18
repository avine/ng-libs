import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@avine/ng-autocomplete';

import { AutocompleteDemoRoutingModule } from './autocomplete-demo-routing.module';
import { AutocompleteDemoComponent } from './autocomplete-demo.component';
import { DemoComponent } from './demo/demo.component';
import { Demo2Component } from './demo2/demo2.component';

@NgModule({
  declarations: [AutocompleteDemoComponent, DemoComponent, Demo2Component],
  imports: [CommonModule, AutocompleteDemoRoutingModule, AutocompleteModule, ReactiveFormsModule],
})
export class AutocompleteDemoModule {}
