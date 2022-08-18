import { firstValueFrom } from 'rxjs';

import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

import { AutocompleteSuggestionsComponent } from '../autocomplete-suggestions/autocomplete-suggestions.component';

@Directive({
  selector: '[autocompleteInput2]',
  exportAs: 'autocompleteInput2',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AutocompleteInput2Directive,
      multi: true,
    },
  ],
})
export class AutocompleteInput2Directive implements AsyncValidator {
  @Input() autocompleteInput2!: AutocompleteSuggestionsComponent;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) closeSuggestion(event: Event): void {
    if (event.target === this.elementRef.nativeElement) {
      return;
    }
    this.autocompleteInput2.hideSuggestions();
  }

  @HostListener('focus')
  onFocus(): void {
    this.autocompleteInput2.onFocus();
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    this.autocompleteInput2.onInput(value);
  }

  @HostListener('keydown.ArrowUp', ['$event'])
  onArrowUp(event: Event): void {
    this.autocompleteInput2.onArrowUp(event);
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  onArrowDown(event: Event): void {
    this.autocompleteInput2.onArrowDown(event);
  }

  @HostListener('keydown.Enter')
  async onEnter(): Promise<void> {
    this.autocompleteInput2.onEnter();
  }

  @HostListener('keydown.Escape')
  onEscape(): void {
    this.autocompleteInput2.onEscape();
  }

  async validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> {
    const datalist = await firstValueFrom(this.autocompleteInput2.datalist$);
    return !control.value || !datalist.length || datalist.includes(control.value) ? null : { datalist: true };
  }
}
