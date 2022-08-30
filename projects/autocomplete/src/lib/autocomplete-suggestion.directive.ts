import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autocompleteSuggestion]',
})
export class AutocompleteSuggestionDirective {
  @Input() autocompleteSuggestion!: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
