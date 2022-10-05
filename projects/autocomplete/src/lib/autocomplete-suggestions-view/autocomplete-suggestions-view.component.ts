import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

import { AutocompleteHighlightPipe } from '../autocomplete-highlight/autocomplete-highlight.pipe';
import { AutocompleteSuggestionDirective } from '../autocomplete-suggestion.directive';
import { AutocompleteSuggestionsComponent } from '../autocomplete-suggestions.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, AutocompleteHighlightPipe, AutocompleteSuggestionDirective],
  selector: 'autocomplete-suggestions-view',
  templateUrl: './autocomplete-suggestions-view.component.html',
  styleUrls: ['./autocomplete-suggestions-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteSuggestionsViewComponent {
  @Input() suggestionsComponent!: AutocompleteSuggestionsComponent;
}
