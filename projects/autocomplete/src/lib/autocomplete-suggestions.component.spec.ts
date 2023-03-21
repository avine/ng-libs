import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { firstValueFrom } from 'rxjs';
import { AutocompleteSuggestionDirective } from './autocomplete-suggestion.directive';

import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions.component';

// https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
window.HTMLElement.prototype.scrollIntoView = function () {};

describe('AutocompleteSuggestionsComponent', () => {
  let spectator: SpectatorHost<AutocompleteSuggestionsComponent>;
  const createHost = createHostFactory({
    component: AutocompleteSuggestionsComponent,
    imports: [AutocompleteSuggestionDirective],
    template: `
      <autocomplete-suggestions #autocomplete>
        <ul *ngIf="autocomplete.shouldDisplaySuggestions$ | async">
          <li
            *ngFor="let suggestion of autocomplete.suggestions$ | async; index as suggestionIndex"
            [class.focused]="suggestionIndex === (autocomplete.focusedSuggestionIndex$ | async)"
            [autocompleteSuggestion]="suggestion"
          >
            {{ suggestion }}
          </li>
        </ul>
      </autocomplete-suggestions>
    `,
  });

  beforeEach(() => {
    // Given
    spectator = createHost(undefined, {
      props: {
        datalist: ['ab', 'abc', 'abcd', 'bcd', 'cd', 'd', 'ef'],
        inputMinLength: 0,
      },
      detectChanges: false,
    });
  });

  it('should not display available suggestions before an event like .onFocus() occured', () => {
    // When
    spectator.component.inputValue = 'a';
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should display available suggestions, after an event like .onFocus() occured', () => {
    // When
    spectator.component.inputValue = 'a';
    spectator.component.onFocus();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).not.toBeNull();
  });

  it('should hide suggestions after .onEscape() occured', () => {
    // Given
    spectator.component.inputValue = 'a';
    spectator.component.onFocus();
    spectator.detectChanges();

    // When
    spectator.component.onEscape();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should hide suggestions programatically', () => {
    // Given
    spectator.component.inputValue = 'a';
    spectator.component.onFocus();
    spectator.detectChanges();

    // When
    spectator.component.hideSuggestions();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should not display available suggestions when the event .onFocus() occured, if inputValue already matches a datalist item', () => {
    // When
    spectator.component.inputValue = 'ab';
    spectator.component.onFocus();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should display available suggestions when .onArrowDown() occured, even if inputValue already matches a datalist item', async () => {
    // When
    spectator.component.inputValue = 'ab';
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).not.toBeNull();
  });

  it('should display available suggestions when .onArrowUp() occured, even if inputValue already matches a datalist item', async () => {
    // When
    spectator.component.inputValue = 'ab';
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).not.toBeNull();
  });

  it('should not display available suggestions when an event like .onFocus() occured, if inputValue does not matches any datalist item', () => {
    // When
    spectator.component.inputValue = 'x';
    spectator.component.onFocus();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should display suggestions when .onInput() occured', () => {
    // When
    spectator.component.onInput('a');
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('ul')).not.toBeNull();
  });

  it('should display the right suggestions when .onInput() occured', () => {
    // When
    spectator.component.onInput('a');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['ab', 'abc', 'abcd']);

    // When
    spectator.component.onInput('bc');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);

    // When
    spectator.component.onInput('bcd');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abcd', 'bcd']);

    // When
    spectator.component.onInput('abcd');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abcd']);

    // When
    spectator.component.onInput('x');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual([]);
  });

  it('should not display suggestions until inputMinLength is reached', () => {
    // When
    spectator.component.inputMinLength = 2;
    spectator.component.onInput('b');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual([]);

    // When
    spectator.component.onInput('bc');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);

    // When
    spectator.component.inputMinLength = 3;
    spectator.component.onInput('bc');
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual([]);
  });

  it('should focus suggestion when .onArrowDown() occured', async () => {
    // Given
    spectator.component.inputValue = 'bc';

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);
    expect(spectator.element.querySelector('.focused')).toBeNull();

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abc');

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abcd');

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('bcd');

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abc'); // Back to the first one.
  });

  it('should focus suggestion when .onArrowUp() occured', async () => {
    // Given
    spectator.component.inputValue = 'bc';

    // When
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);
    expect(spectator.element.querySelector('.focused')).toBeNull();

    // When
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('bcd');

    // When
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abcd');

    // When
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abc');

    // When
    await spectator.component.onArrowUp();
    spectator.detectChanges();

    // Then
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('bcd'); // Back to the last one.
  });

  it('should do nothing when .onEnter() occured but there is no suggestions available', () => {
    // Given
    spectator.component.inputValue = 'x';

    spectator.component.onFocus();
    spectator.component.onEnter();
    spectator.detectChanges();

    // Then
    expect(true).toBeTruthy(); // We just to verify that no error occured.
  });

  it('should select focused suggestion when .onEnter() occured', async () => {
    // Given
    spectator.component.inputValue = 'bc';

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    await spectator.component.onArrowDown();
    spectator.detectChanges();

    expect(spectator.component.inputValue).toBe('bc');
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('abc');

    spectator.component.onEnter();
    spectator.detectChanges();

    // Then
    expect(spectator.component.inputValue).toBe('abc');
  });

  it('should do nothing when .onEnter() occured but there is no focused suggestion', () => {
    // Given
    spectator.component.inputValue = 'bc';

    // When
    spectator.component.onFocus();
    spectator.detectChanges();

    expect(spectator.element.querySelector('.focused')).toBeNull();

    spectator.component.onEnter();
    spectator.detectChanges();

    // Then
    expect(spectator.component.inputValue).toBe('bc');
  });

  it('should hide suggestions when .onEnter() occured, if one suggestion matches the inputValue (even if no suggestion is focused)', async () => {
    // Given
    spectator.component.inputValue = 'abc';

    // When
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd']);
    expect(spectator.element.querySelector('.focused')).toBeNull();

    spectator.component.onEnter();
    spectator.detectChanges();

    expect(spectator.element.querySelector('ul')).toBeNull();
  });

  it('should select the unique available suggestion when .onEnter() occured, even if not focused', () => {
    // Given
    spectator.component.inputValue = 'e';

    // When
    spectator.component.onFocus();
    spectator.detectChanges();

    expect(spectator.element.querySelector('.focused')).toBeNull();

    spectator.component.onEnter();
    spectator.detectChanges();

    // Then
    expect(spectator.component.inputValue).toBe('ef');
  });

  it('should select suggestion when clicking on suggestion', () => {
    // Given
    spectator.component.inputValue = 'bc';

    // When
    spectator.component.onFocus();
    spectator.detectChanges();

    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);
    expect(spectator.element.querySelector('.focused')).toBeNull();

    spectator.dispatchMouseEvent('li + li', 'click'); // Let's click on the second suggestion

    // Then
    expect(spectator.component.inputValue).toBe('abcd');
  });

  it('should reset focused suggestion when focused suggestion index no longer exists', async () => {
    // Given
    spectator.component.inputValue = 'bc';

    spectator.component.onFocus();
    spectator.detectChanges();

    expect(getTextContents(spectator.element.querySelectorAll('li'))).toEqual(['abc', 'abcd', 'bcd']);
    expect(spectator.element.querySelector('.focused')).toBeNull();

    await spectator.component.onArrowDown();
    await spectator.component.onArrowDown();
    await spectator.component.onArrowDown();
    spectator.detectChanges();

    expect(await firstValueFrom(spectator.component.focusedSuggestionIndex$)).toBe(2);
    expect(spectator.element.querySelector('.focused')?.textContent?.trim()).toBe('bcd');

    spectator.component.onInput('bcd');
    spectator.detectChanges();

    expect(await firstValueFrom(spectator.component.focusedSuggestionIndex$)).toBe(-1);
    expect(spectator.element.querySelector('.focused')).toBeNull();
  });
});

const getTextContents = (nodes: NodeListOf<HTMLLIElement>) => Array.from(nodes).map((node) => node.textContent?.trim());
