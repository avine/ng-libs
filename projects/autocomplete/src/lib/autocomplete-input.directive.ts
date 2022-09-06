import { firstValueFrom } from 'rxjs';

import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions.component';

@Directive({
  standalone: true,
  selector: '[autocompleteInput]',
  exportAs: 'autocompleteInput',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AutocompleteInputDirective,
      multi: true,
    },
  ],
})
export class AutocompleteInputDirective implements AsyncValidator {
  /**
   * Attach the autocomplete suggestions component to a form field (typically an HTMLInputElement).
   *
   * The autocomplete suggestions component reacts to the following events fired by the form field:
   * - `focus` and `input`: determines whether to display the suggestions
   * - `keydown.ArrowUp` and `keydown.ArrowDown`: navigate between suggestions and focus on one in particular
   * - `keydown.Enter`: selects focused suggestion if any
   * - `keydown.Escape`: hide suggestions
   */
  @Input() autocompleteInput!: AutocompleteSuggestionsComponent;

  get inputWidthPx(): string {
    return this.elementRef.nativeElement.offsetWidth + 'px';
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event']) onClick(event: Event): void {
    if (event.target === this.elementRef.nativeElement) {
      return;
    }
    this.autocompleteInput.hideSuggestions();
  }

  @HostListener('focus') onFocus(): void {
    this.autocompleteInput.onFocus();
  }

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    this.autocompleteInput.onInput(value);
  }

  @HostListener('keydown.ArrowUp', ['$event']) onArrowUp(event: Event): void {
    this.autocompleteInput.onArrowUp(event);
  }

  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: Event): void {
    this.autocompleteInput.onArrowDown(event);
  }

  @HostListener('keydown.Enter') async onEnter(): Promise<void> {
    this.autocompleteInput.onEnter();
  }

  @HostListener('keydown.Escape') onEscape(): void {
    this.autocompleteInput.onEscape();
  }

  async validate({ value }: AbstractControl<any, any>): Promise<ValidationErrors | null> {
    if (!value) {
      return null;
    }
    const datalist = await firstValueFrom(this.autocompleteInput.datalist$);
    if ((!datalist.length && this.autocompleteInput.isEmptyDatalistAllowed) || datalist.includes(value)) {
      return null;
    }
    return { datalist };
  }
}
