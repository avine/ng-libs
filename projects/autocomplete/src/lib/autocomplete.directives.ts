import { AutocompleteHighlightPipe } from './autocomplete-highlight/autocomplete-highlight.pipe';
import { AutocompleteInputDirective } from './autocomplete-input.directive';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';
import { AutocompleteSuggestionsViewComponent } from './autocomplete-suggestions-view/autocomplete-suggestions-view.component';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions.component';

export const AUTOCOMPLETE_DIRECTIVES = [
  AutocompleteHighlightPipe,
  AutocompleteInputDirective,
  AutocompleteSuggestionDirective,
  AutocompleteSuggestionsViewComponent,
  AutocompleteSuggestionsComponent,
] as const;
