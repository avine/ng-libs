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

import { AutocompleteTemplateDirective, AutocompleteSuggestionDirective } from './autocomplete.directive';
import { AutocompleteDataListItem } from './autocomplete.types';
import { escapeRegExp, getAutocompleteDataListItem } from './autocomplete.utils';

@Component({
  selector: 'autocomplete-container',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AutocompleteComponent,
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor, Validator {
  @Input() type: 'text' | 'password' = 'text';

  @Input() placeholder?: string;

  @Input() readonly = false;

  @Input() disabled = false;

  @ContentChild(AutocompleteTemplateDirective, { read: TemplateRef }) suggestionsTemplate?: TemplateRef<unknown>;

  /* --- DataList related properties --- */

  private dataList$ = new BehaviorSubject<AutocompleteDataListItem[]>([]);

  private dataListValues: string[] = [];

  @Input() set dataList(data: (string | AutocompleteDataListItem)[]) {
    const dataList = data.map(getAutocompleteDataListItem);
    this.dataList$.next(dataList);
    this.dataListValues = dataList.map(({ value }) => value);
  }

  /* --- Input related properties --- */

  private value$ = new BehaviorSubject<string>('');

  @Input() set value(value: string) {
    this.value$.next(String(value));
  }

  get value(): string {
    return this.value$.value;
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() inputMinLengthToShowDataList = 0;

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  /* ----- Suggestions related properties ----- */

  @Input() highlightTag = 'i';

  suggestions$ = combineLatest([this.dataList$, this.value$]).pipe(
    map(([dataList, value]) => {
      const valueInLowerCase = value.toLowerCase();
      return dataList.filter((item) => item.value.toLowerCase().includes(valueInLowerCase));
    }),
    tap((suggestions) => {
      if (this.focusedSuggestionIndex >= suggestions.length) {
        this.focusedSuggestionIndex = -1;
      }
    })
  );

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
      this.value$.value.length >= this.inputMinLengthToShowDataList && !this.dataListValues.includes(this.value);
  }

  onInput(value: string): void {
    this.dispatchValue(value);
    this.shouldDisplaySuggestions = value.length >= this.inputMinLengthToShowDataList;
  }

  onBlur(): void {
    this.onTouched();
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.inputMinLengthToShowDataList;
      return;
    }
    this.focusedSuggestionIndex = Math.max(0, Number(this.focusedSuggestionIndex) - 1);
    this.scrollToFocusedSuggestion();
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.shouldDisplaySuggestions = this.value$.value.length >= this.inputMinLengthToShowDataList;
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

  selectSuggestion(suggestion: AutocompleteDataListItem): void {
    this.dispatchValue(suggestion.value);
    this.shouldDisplaySuggestions = false;
    this.focusedSuggestionIndex = -1;
  }

  private scrollToFocusedSuggestion(): void {
    this.suggestionsQueryList
      .toArray()
      [this.focusedSuggestionIndex].elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
  }

  trackBySuggestionValue(_: number, suggestion: AutocompleteDataListItem): string {
    return suggestion.value;
  }

  highlightSuggestion(suggestion: AutocompleteDataListItem): string {
    const tag = this.highlightTag;
    return suggestion.value.replace(new RegExp(escapeRegExp(this.value$.value), 'i'), `<${tag}>$&</${tag}>`);
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
    return !control.value || !this.dataListValues.length || this.dataListValues.includes(control.value)
      ? null
      : { dataList: true };
  }
}
