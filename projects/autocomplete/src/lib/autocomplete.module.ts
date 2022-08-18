import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutocompleteHighlightSuggestionPipe } from './autocomplete-highlight-suggestion.pipe';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { AutocompleteInputDirective } from './autocomplete-input/autocomplete-input.directive';
import { AutocompleteInput2Directive } from './autocomplete-input/autocomplete-input2.directive';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';
import { AutocompleteSuggestionsTemplateDirective } from './autocomplete-suggestions-template.directive';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions/autocomplete-suggestions.component';

const features = [
  AutocompleteHighlightSuggestionPipe,
  AutocompleteInputComponent,
  AutocompleteInputDirective,
  AutocompleteInput2Directive,
  AutocompleteSuggestionDirective,
  AutocompleteSuggestionsTemplateDirective,
  AutocompleteSuggestionsComponent,
];

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: features,
  exports: features,
})
export class AutocompleteModule {}
