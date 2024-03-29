import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  map,
  ReplaySubject,
  shareReplay,
  startWith,
  Subscription,
  tap,
} from 'rxjs';

import { coerceStringArray } from '@angular/cdk/coercion';
import { AsyncPipe, NgIf } from '@angular/common';
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

import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';

/**
 * Provides all the information needed to render suggestions.
 *
 * @example
 * ```html
 * <autocomplete-suggestions
 *   [datalist]="myDatalist"
 *   [inputMinLength]="myInputMinLength"
 *   [(inputValue)]="myInputValue"
 *   #autocomplete
 *  >
 *   <div *ngFor="let suggestion of autocomplete.suggestions$ | async">
 *     {{ suggestion }}
 *   </div>
 * </autocomplete-suggestions>
 * ```
 */
@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf],
  selector: 'autocomplete-suggestions',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSuggestionsComponent implements AfterViewInit, OnDestroy {
  /* --- Datalist related properties --- */

  private _datalist?: string[];

  private _datalist$ = new ReplaySubject<string[]>(1);

  datalist$ = this._datalist$.asObservable();

  /**
   * List of items on which to perform the search.
   */
  @Input() set datalist(datalist: (string | number)[]) {
    this._datalist = coerceStringArray(datalist);
    this._datalist$.next(this._datalist);
  }

  get datalist(): string[] {
    return this._datalist ?? [];
  }

  /* --- Value related properties --- */

  private inputValue$ = new BehaviorSubject('');

  /**
   * The input string to search in the datalist.
   */
  @Input() set inputValue(value: string) {
    this.inputValue$.next(String(value));
  }

  get inputValue(): string {
    return this.inputValue$.value;
  }

  @Output() inputValueChange = new EventEmitter<string>();

  /**
   * Minimum string length required to start searching the datalist.
   */
  @Input() inputMinLength = 0;

  /* ----- Suggestions related properties ----- */

  @ContentChildren(AutocompleteSuggestionDirective, { descendants: true })
  suggestionsQueryList!: QueryList<AutocompleteSuggestionDirective>;

  private suggestions: string[] = [];

  /**
   * Subset of the datalist that matches the searched string.
   */
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
    tap((suggestions) => (this.suggestions = suggestions)),
    shareReplay(1),
  );

  private _focusedSuggestionIndex$ = new BehaviorSubject(-1);

  /**
   * Index of the focused suggestion when navigating between them using the up and down arrows.
   */
  focusedSuggestionIndex$ = this._focusedSuggestionIndex$.asObservable();

  /**
   * Primarily relies on input string length to determine whether suggestions should be displayed.
   */
  private areSuggestionsExpected$ = new BehaviorSubject(false);

  /**
   * Relies on suggestion availability and input string length to determine whether suggestions should be displayed.
   */
  shouldDisplaySuggestions$ = combineLatest([this.suggestions$, this.areSuggestionsExpected$]).pipe(
    map(([suggestions, areSuggestionsExpected]) => suggestions.length > 0 && areSuggestionsExpected),
    shareReplay(1),
  );

  /* ----- */

  private subscription!: Subscription;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.subscription = this.listenToClickedSuggestion();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onFocus(): void {
    this.areSuggestionsExpected$.next(
      this.inputValue$.value.length >= this.inputMinLength && !this.datalist.includes(this.inputValue),
    );
  }

  onInput(value: string): void {
    this.inputValue = value;
    this.areSuggestionsExpected$.next(value.length >= this.inputMinLength);
  }

  async onArrowUp(): Promise<void> {
    if (!(await firstValueFrom(this.shouldDisplaySuggestions$))) {
      this.areSuggestionsExpected$.next(this.inputValue$.value.length >= this.inputMinLength);
      return;
    }
    this._focusedSuggestionIndex$.next(
      this._focusedSuggestionIndex$.value > 0 ? this._focusedSuggestionIndex$.value - 1 : this.suggestions.length - 1,
    );
    this.scrollToFocusedSuggestion();
  }

  async onArrowDown(): Promise<void> {
    if (!(await firstValueFrom(this.shouldDisplaySuggestions$))) {
      this.areSuggestionsExpected$.next(this.inputValue$.value.length >= this.inputMinLength);
      return;
    }
    this._focusedSuggestionIndex$.next(
      this._focusedSuggestionIndex$.value < this.suggestions.length - 1 ? this._focusedSuggestionIndex$.value + 1 : 0,
    );
    this.scrollToFocusedSuggestion();
  }

  onEnter(): void {
    if (this.suggestions.length === 0) {
      return;
    }
    if (this.suggestions.length === 1) {
      if (this._focusedSuggestionIndex$.value !== 0) {
        this._focusedSuggestionIndex$.next(0);
      }
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
