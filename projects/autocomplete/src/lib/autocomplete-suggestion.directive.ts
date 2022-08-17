import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteSuggestion]',
})
export class AutocompleteSuggestionDirective {
  constructor(public elementRef: ElementRef) {}
}
