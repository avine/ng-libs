import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteTemplate]',
})
export class AutocompleteTemplateDirective {}

@Directive({
  selector: '[autocompleteSuggestion]',
})
export class AutocompleteSuggestionDirective {
  constructor(public elementRef: ElementRef) {}
}
