import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@avine/ng-autocomplete';

import { AutocompleteDemoRoutingModule } from './autocomplete-demo-routing.module';
import { AutocompleteDemoComponent } from './autocomplete-demo.component';

@NgModule({
  declarations: [AutocompleteDemoComponent],
  imports: [CommonModule, AutocompleteDemoRoutingModule, AutocompleteModule, ReactiveFormsModule],
})
export class AutocompleteDemoModule {}
