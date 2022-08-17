import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { AutocompleteSuggestionDirective } from '../autocomplete-suggestion.directive';
import { AutocompleteSuggestionsTemplateDirective } from '../autocomplete-suggestions-template.directive';
import { AutocompleteDatalistItem } from '../autocomplete.types';
import { getAutocompleteDatalistItem, highlightSuggestion } from '../autocomplete.utils';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AutocompleteInputComponent,
      multi: true,
    },
  ],
})
export class AutocompleteInputComponent implements ControlValueAccessor, Validator {
  @Input() type: 'text' | 'password' = 'text';

  @Input() placeholder?: string;

  @Input() readonly = false;

  @Input() disabled = false;

  /* --- Input related properties --- */

  private value$ = new BehaviorSubject<string>('');

  @Input() set value(value: string) {
    this.value$.next(String(value));
  }

  get value(): string {
    return this.value$.value;
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() minLength = 0;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  /* --- Datalist related properties --- */

  private datalist$ = new BehaviorSubject<AutocompleteDatalistItem[]>([]);

  private datalistValues: string[] = [];

  @Input() set datalist(data: (string | AutocompleteDatalistItem)[]) {
    const datalist = data.map(getAutocompleteDatalistItem);
    this.datalist$.next(datalist);
    this.datalistValues = datalist.map(({ value }) => value);
  }

  /* ----- Suggestions related properties ----- */

  @Input() highlightTag = 'i';

  suggestions$ = combineLatest([this.value$, this.datalist$]).pipe(
    map(([value, datalist]) => {
      const valueInLowerCase = value.toLowerCase();
      return datalist.filter((item) => item.value.toLowerCase().includes(valueInLowerCase));
    }),
    tap((suggestions) => {
      if (this.focusedSuggestionIndex >= suggestions.length) {
        this.focusedSuggestionIndex = -1;
      }
    })
  );

  @ContentChild(AutocompleteSuggestionsTemplateDirective, { read: TemplateRef })
  suggestionsTemplate?: TemplateRef<unknown>;

  @ContentChildren(AutocompleteSuggestionDirective, { descendants: true })
  suggestionsFromContentQueryList!: QueryList<AutocompleteSuggestionDirective>;

  @ViewChildren(AutocompleteSuggestionDirective)
  suggestionsFromViewQueryList!: QueryList<AutocompleteSuggestionDirective>;

  private get suggestionsQueryList(): QueryList<AutocompleteSuggestionDirective> {
    return this.suggestionsTemplate ? this.suggestionsFromContentQueryList : this.suggestionsFromViewQueryList;
  }

  focusedSuggestionIndex = -1;

  shouldDisplaySuggestions = false;

  @HostListener('document:click', ['$event']) closeSuggestion(event: Event): void {
    if (event.target === this.inputRef.nativeElement) {
      return;
    }
    this.shouldDisplaySuggestions = false;
  }

  /* ----- */

  private dispatchValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChange(value);
  }

  onFocus(): void {
    this.shouldDisplaySuggestions =
      this.value$.value.length >= this.minLength && !this.datalistValues.includes(this.value);
  }

  onInput(value: string): void {
    this.dispatchValue(value);
    this.shouldDisplaySuggestions = value.length >= this.minLength;
  }

  onBlur(): void {
    this.onTouched();
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.minLength;
      return;
    }
    this.focusedSuggestionIndex = Math.max(0, Number(this.focusedSuggestionIndex) - 1);
    this.scrollToFocusedSuggestion();
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.minLength;
      return;
    }
    this.focusedSuggestionIndex = Math.min(
      this.suggestionsQueryList.length - 1,
      Number(this.focusedSuggestionIndex) + 1
    );
    this.scrollToFocusedSuggestion();
  }

  async onEnter(): Promise<void> {
    if (this.suggestionsQueryList.length === 0) {
      return;
    }
    const suggestions = await firstValueFrom(this.suggestions$);
    if (this.suggestionsQueryList.length === 1) {
      this.focusedSuggestionIndex = 0;
    } else if (this.focusedSuggestionIndex === -1) {
      if (suggestions.find(({ value }) => value === this.value)) {
        this.shouldDisplaySuggestions = false;
      }
      return;
    }
    this.selectSuggestion(suggestions[this.focusedSuggestionIndex]);
  }

  onEscape(): void {
    this.shouldDisplaySuggestions = false;
  }

  selectSuggestion(suggestion: AutocompleteDatalistItem): void {
    this.dispatchValue(suggestion.value);
    this.shouldDisplaySuggestions = false;
    this.focusedSuggestionIndex = -1;
  }

  private scrollToFocusedSuggestion(): void {
    this.suggestionsQueryList
      .toArray()
      [this.focusedSuggestionIndex].elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
  }

  trackBySuggestionValue(_: number, suggestion: AutocompleteDatalistItem): string {
    return suggestion.value;
  }

  highlightSuggestion(suggestion: AutocompleteDatalistItem): string {
    return highlightSuggestion(suggestion.value, this.value$.value, this.highlightTag);
  }

  private onChange = (_value: string): void => undefined;

  private onTouched: () => void = () => undefined;

  /* ----- ControlValueAccessor ----- */

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  writeValue(value: string | null): void {
    const newValue = value ?? '';
    if (newValue === this.value) {
      return;
    }
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return !control.value || !this.datalistValues.length || this.datalistValues.includes(control.value)
      ? null
      : { datalist: true };
  }
}
