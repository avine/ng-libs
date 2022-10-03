import { firstValueFrom } from 'rxjs';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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

  private _isEmptyDatalistAllowed = false;

  /**
   * Whether to validate any input string when `datalist` is empty.
   */
  @Input() set isEmptyDatalistAllowed(value: BooleanInput) {
    this._isEmptyDatalistAllowed = coerceBooleanProperty(value);
  }

  get isEmptyDatalistAllowed() {
    return this._isEmptyDatalistAllowed;
  }

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
    event.preventDefault();
    this.autocompleteInput.onArrowUp();
  }

  @HostListener('keydown.ArrowDown', ['$event']) onArrowDown(event: Event): void {
    event.preventDefault();
    this.autocompleteInput.onArrowDown();
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
    if ((!datalist.length && this.isEmptyDatalistAllowed) || datalist.includes(value)) {
      return null;
    }
    return { datalist };
  }
}
