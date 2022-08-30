import { BehaviorSubject, combineLatest, map, ReplaySubject, startWith, Subscription, tap } from 'rxjs';

import { coerceStringArray } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';

import { AutocompleteSuggestionDirective } from '../autocomplete-suggestion.directive';

@Component({
  selector: 'autocomplete-suggestions',
  templateUrl: './autocomplete-suggestions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSuggestionsComponent implements AfterViewInit, OnDestroy {
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

  /* --- Value related properties --- */

  private inputValue$ = new BehaviorSubject<string>('');

  @Input() set inputValue(value: string) {
    this.inputValue$.next(String(value));
  }

  get inputValue(): string {
    return this.inputValue$.value;
  }

  @Output() inputValueChange = new EventEmitter<string>();

  @Input() inputMinLength = 0;

  /* ----- Suggestions related properties ----- */

  @ContentChildren(AutocompleteSuggestionDirective, { descendants: true })
  suggestionsQueryList!: QueryList<AutocompleteSuggestionDirective>;

  private suggestions: string[] = [];

  suggestions$ = combineLatest([this.datalist$, this.inputValue$]).pipe(
    map(([datalist, value]) => {
      const valueInLowerCase = value.toLowerCase();
      return datalist.filter((item) => item.toLowerCase().includes(valueInLowerCase));
    }),
    tap((suggestions) => {
      if (this._focusedSuggestionIndex$.value >= suggestions.length) {
        this._focusedSuggestionIndex$.next(-1);
      }
    }),
    tap((suggestions) => (this.suggestions = suggestions))
  );

  private _focusedSuggestionIndex$ = new BehaviorSubject(-1);

  focusedSuggestionIndex$ = this._focusedSuggestionIndex$.asObservable();

  private areSuggestionsExpected$ = new BehaviorSubject<boolean>(false);

  shouldDisplaySuggestions$ = combineLatest([this.suggestions$, this.areSuggestionsExpected$]).pipe(
    map(([{ length }, areSuggestionsExpected]) => length > 0 && areSuggestionsExpected)
  );

  /* ----- */

  subscription!: Subscription;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.subscription = this.listenToClickedSuggestion();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onFocus(): void {
    this.areSuggestionsExpected$.next(
      this.inputValue$.value.length >= this.inputMinLength && !this.datalist.includes(this.inputValue)
    );
  }

  onInput(value: string): void {
    this.inputValue = value;
    this.areSuggestionsExpected$.next(value.length >= this.inputMinLength);
  }

  onArrowUp(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.areSuggestionsExpected$.next(this.inputValue$.value.length >= this.inputMinLength);
      return;
    }
    this._focusedSuggestionIndex$.next(Math.max(0, Number(this._focusedSuggestionIndex$.value) - 1));
    this.scrollToFocusedSuggestion();
  }

  onArrowDown(event: Event): void {
    event.preventDefault();
    if (!this.suggestionsQueryList.length) {
      this.areSuggestionsExpected$.next(this.inputValue$.value.length >= this.inputMinLength);
      return;
    }
    this._focusedSuggestionIndex$.next(
      Math.min(this.suggestions.length - 1, Number(this._focusedSuggestionIndex$.value) + 1)
    );
    this.scrollToFocusedSuggestion();
  }

  onEnter(): void {
    if (this.suggestions.length === 0) {
      return;
    }
    if (this.suggestions.length === 1) {
      this._focusedSuggestionIndex$.next(0);
    } else if (this._focusedSuggestionIndex$.value === -1) {
      if (this.suggestions.find((suggestion) => suggestion === this.inputValue)) {
        this.areSuggestionsExpected$.next(false);
      }
      return;
    }
    this.selectSuggestion(this.suggestions[this._focusedSuggestionIndex$.value]);
  }

  onEscape(): void {
    this.areSuggestionsExpected$.next(false);
  }

  selectSuggestion(suggestion: string): void {
    this.areSuggestionsExpected$.next(false);
    this._focusedSuggestionIndex$.next(-1);
    this.inputValue = suggestion;
    this.inputValueChange.emit(suggestion);
  }

  hideSuggestions(): void {
    this.areSuggestionsExpected$.next(false);
  }

  private listenToClickedSuggestion(): Subscription {
    return this.suggestionsQueryList.changes.pipe(startWith('whatever')).subscribe(() => {
      this.suggestionsQueryList.forEach(({ elementRef: { nativeElement }, autocompleteSuggestion }) => {
        this.renderer.listen(nativeElement, 'click', () => this.selectSuggestion(autocompleteSuggestion));
      });
    });
  }

  private scrollToFocusedSuggestion(): void {
    this.suggestionsQueryList
      .get(this._focusedSuggestionIndex$.value)
      ?.elementRef.nativeElement.scrollIntoView({ block: 'nearest' });
  }
}
