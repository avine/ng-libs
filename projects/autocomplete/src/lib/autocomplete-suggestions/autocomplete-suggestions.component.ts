import { BehaviorSubject, combineLatest, map, ReplaySubject, tap } from 'rxjs';

import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { AutocompleteSuggestionDirective } from '../autocomplete-suggestion.directive';

@Component({
  selector: 'autocomplete-suggestions',
  templateUrl: './autocomplete-suggestions.component.html',
})
export class AutocompleteSuggestionsComponent {
  /* --- Value related properties --- */

  private value$ = new BehaviorSubject<string>('');

  @Input() set value(value: string) {
    this.value$.next(String(value));
  }

  get value(): string {
    return this.value$.value;
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() inputMinLength = 0;

  /* --- Datalist related properties --- */

  private _datalist?: string[];

  private _datalist$ = new ReplaySubject<string[]>(1);

  datalist$ = this._datalist$.asObservable();

  @Input() set datalist(datalist: string[]) {
    this._datalist = coerceStringArray(datalist);
    this._datalist$.next(this._datalist);
  }

  get datalist(): string[] {
    return this._datalist ?? [];
  }

  /* ----- Suggestions related properties ----- */

  @ContentChildren(AutocompleteSuggestionDirective, { descendants: true })
  suggestionsQueryList!: QueryList<AutocompleteSuggestionDirective>;

  private suggestions: string[] = [];

  suggestions$ = combineLatest([this.value$, this.datalist$]).pipe(
    map(([value, datalist]) => {
      const valueInLowerCase = value.toLowerCase();
      return datalist.filter((item) => item.toLowerCase().includes(valueInLowerCase));
    }),
    tap((suggestions) => {
      if (this.focusedSuggestionIndex >= suggestions.length) {
        this.focusedSuggestionIndex = -1;
      }
    }),
    tap((suggestions) => (this.suggestions = suggestions))
  );

  focusedSuggestionIndex = -1;

  shouldDisplaySuggestions = false;

  @Output() suggestion = new EventEmitter<string>();

  /* ----- */

  private dispatchValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }

  onFocus(): void {
    this.shouldDisplaySuggestions =
      this.value$.value.length >= this.inputMinLength && !this.datalist.includes(this.value);
  }

  onInput(value: string): void {
    this.dispatchValue(value);
    this.shouldDisplaySuggestions = value.length >= this.inputMinLength;
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.suggestions.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.inputMinLength;
      return;
    }
    this.focusedSuggestionIndex = Math.max(0, Number(this.focusedSuggestionIndex) - 1);
    this.scrollToFocusedSuggestion();
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.suggestions.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.inputMinLength;
      return;
    }
    this.focusedSuggestionIndex = Math.min(this.suggestions.length - 1, Number(this.focusedSuggestionIndex) + 1);
    this.scrollToFocusedSuggestion();
  }

  onEnter(): void {
    if (this.suggestions.length === 0) {
      return;
    }
    if (this.suggestions.length === 1) {
      this.focusedSuggestionIndex = 0;
    } else if (this.focusedSuggestionIndex === -1) {
      if (this.suggestions.find((suggestion) => suggestion === this.value)) {
        this.shouldDisplaySuggestions = false;
      }
      return;
    }
    this.selectSuggestion(this.suggestions[this.focusedSuggestionIndex]);
  }

  onEscape(): void {
    this.shouldDisplaySuggestions = false;
  }

  selectSuggestion(suggestion: string): void {
    this.dispatchValue(suggestion);
    this.shouldDisplaySuggestions = false;
    this.focusedSuggestionIndex = -1;
    this.suggestion.emit(suggestion);
  }

  hideSuggestions(): void {
    this.shouldDisplaySuggestions = false;
  }

  private scrollToFocusedSuggestion(): void {
    this.suggestionsQueryList
      .toArray()
      [this.focusedSuggestionIndex].elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
  }
}
