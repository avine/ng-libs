import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[autocompleteTemplate]',
})
export class AutocompleteTemplateDirective {}

@Directive({
  selector: '[autocompleteSuggestion]',
})
export class AutocompleteSuggestionDirective {
  @Input() autocompleteSuggestion!: number;

  @HostListener('click') onClick() {
    console.log(this.autocompleteSuggestion);
  }

  constructor(public elementRef: ElementRef) {}
}
