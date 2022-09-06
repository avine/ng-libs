import { AutocompleteHighlightPipe } from './autocomplete-highlight/autocomplete-highlight.pipe';
import { AutocompleteInputDirective } from './autocomplete-input.directive';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions.component';

export const AUTOCOMPLETE_DIRECTIVES = [
  AutocompleteHighlightPipe,
  AutocompleteInputDirective,
  AutocompleteSuggestionDirective,
  AutocompleteSuggestionsComponent,
] as const;
