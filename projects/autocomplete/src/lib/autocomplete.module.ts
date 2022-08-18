import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteHighlightSuggestionPipe } from './autocomplete-highlight-suggestion.pipe';
import { AutocompleteInputDirective } from './autocomplete-input.directive';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions/autocomplete-suggestions.component';

const features = [
  AutocompleteHighlightSuggestionPipe,
  AutocompleteInputDirective,
  AutocompleteSuggestionDirective,
  AutocompleteSuggestionsComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: features,
  exports: features,
})
export class AutocompleteModule {}
