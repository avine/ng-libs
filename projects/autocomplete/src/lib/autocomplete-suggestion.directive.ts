import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[autocompleteSuggestion]',
})
export class AutocompleteSuggestionDirective {
  /**
   * Indicates that the DOM element represents a clickable suggestion.
   */
  @Input() autocompleteSuggestion!: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
