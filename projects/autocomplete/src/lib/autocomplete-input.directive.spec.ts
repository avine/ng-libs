import { Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';

import { AutocompleteInputDirective } from './autocomplete-input.directive';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions.component';

describe('AutocompleteInputDirective', () => {
  let spectator: SpectatorDirective<AutocompleteInputDirective>;
  const createDirective = createDirectiveFactory(AutocompleteInputDirective);

  it('should call "hideSuggestions" when clicking outside of the directive host element', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'hideSuggestions').mockReturnValue();

    spectator.dispatchMouseEvent(spectator.element, 'click');
    expect(spy).not.toHaveBeenCalled();

    spectator.dispatchMouseEvent(document, 'click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onFocus"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onFocus').mockReturnValue();
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchMouseEvent(spectator.element, 'focus');
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onInput"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onInput').mockReturnValue();
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchMouseEvent(spectator.element, 'input');
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onArrowUp"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onArrowUp').mockReturnValue(Promise.resolve());
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchKeyboardEvent(spectator.element, 'keydown', { key: 'ArrowUp', keyCode: 38 });
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onArrowDown"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onArrowDown').mockReturnValue(Promise.resolve());
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchKeyboardEvent(spectator.element, 'keydown', { key: 'ArrowDown', keyCode: 40 });
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onEnter"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onEnter').mockReturnValue();
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Enter');
    expect(spy).toHaveBeenCalled();
  });

  it('should call "onEscape"', () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    const spy = jest.spyOn(spectator.directive.autocompleteInput, 'onEscape').mockReturnValue();
    expect(spy).not.toHaveBeenCalled();
    spectator.dispatchKeyboardEvent(spectator.element, 'keydown', 'Escape');
    expect(spy).toHaveBeenCalled();
  });

  it('should validate any value against empty datalist when isEmptyDatalistAllowed is true', async () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    spectator.directive.autocompleteInput.datalist = [];

    expect(await spectator.directive.validate({ value: 'a' } as AbstractControl)).toEqual({ datalist: [] });

    spectator.directive.isEmptyDatalistAllowed = true;
    expect(await spectator.directive.validate({ value: 'a' } as AbstractControl)).toBeNull();
  });

  it('should validate against datalist', async () => {
    spectator = createDirective('<input autocompleteInput />', {
      props: {
        autocompleteInput: new AutocompleteSuggestionsComponent({ listen: jest.fn() as any } as Renderer2),
      },
    });

    spectator.directive.autocompleteInput.datalist = ['a', 'b'];

    expect(await spectator.directive.validate({ value: '' } as AbstractControl)).toBeNull();
    expect(await spectator.directive.validate({ value: 'a' } as AbstractControl)).toBeNull();
    expect(await spectator.directive.validate({ value: 'b' } as AbstractControl)).toBeNull();
    expect(await spectator.directive.validate({ value: 'oops' } as AbstractControl)).toEqual({ datalist: ['a', 'b'] });
  });
});
