import { Directive, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';

@Directive({
  selector: '[autocompleteSuggestionsTemplate]',
  exportAs: 'autocompleteSuggestionsTemplate',
})
export class AutocompleteSuggestionsTemplateDirective {
  @ViewChildren(AutocompleteSuggestionDirective)
  suggestionsQueryList!: QueryList<AutocompleteSuggestionDirective>;

  constructor(public elementRef: ElementRef) {}
}
