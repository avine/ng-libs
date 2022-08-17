import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';
import { AutocompleteSuggestionsTemplateDirective } from './autocomplete-suggestions-template.directive';

const features = [
  AutocompleteInputComponent,
  AutocompleteSuggestionDirective,
  AutocompleteSuggestionsTemplateDirective,
];

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [features],
  exports: [features],
})
export class AutocompleteModule {}
