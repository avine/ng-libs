import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteTemplateDirective, AutocompleteSuggestionDirective } from './autocomplete.directive';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [AutocompleteComponent, AutocompleteTemplateDirective, AutocompleteSuggestionDirective],
  exports: [AutocompleteComponent, AutocompleteTemplateDirective, AutocompleteSuggestionDirective],
})
export class AutocompleteModule {}
