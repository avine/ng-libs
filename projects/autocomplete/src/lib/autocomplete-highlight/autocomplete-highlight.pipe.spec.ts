import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';

import { AutocompleteHighlightPipe } from './autocomplete-highlight.pipe';
import { AUTOCOMPLETE_HIGHLIGHT_CONFIG } from './autocomplete-highlight.token';

describe('AutocompleteHighlightPipe ', () => {
  let spectator: SpectatorPipe<AutocompleteHighlightPipe>;
  const createPipe = createPipeFactory(AutocompleteHighlightPipe);

  it.each`
    suggestionValue | inputValue | highlighted
    ${'abcd'}       | ${'x'}     | ${'abcd'}
    ${'abcd'}       | ${'bc'}    | ${'a<strong>bc</strong>d'}
    ${'abcd abcd'}  | ${'bc'}    | ${'a<strong>bc</strong>d a<strong>bc</strong>d'}
    ${'abCd aBcd'}  | ${'BC'}    | ${'a<strong>bC</strong>d a<strong>Bc</strong>d'}
  `(
    'returns "$highlighted" when matching "$suggestionValue" with "$inputValue"',
    ({ suggestionValue, inputValue, highlighted }) => {
      spectator = createPipe(`<div [innerHTML]="'${suggestionValue}' | autocompleteHighlight:'${inputValue}'"></div>`);

      expect(spectator.element.querySelector('div')?.innerHTML).toBe(highlighted);
    }
  );

  it('should use config as parameter', () => {
    spectator = createPipe(`<div [innerHTML]="'a' | autocompleteHighlight:'a':{ tag: 'em', css: 'highlight' }"></div>`);

    expect(spectator.element.querySelector('div')?.innerHTML).toBe('<em class="highlight">a</em>');
  });

  it('should use config as provider', () => {
    spectator = createPipe(`<div [innerHTML]="'a' | autocompleteHighlight:'a'"></div>`, {
      providers: [
        {
          provide: AUTOCOMPLETE_HIGHLIGHT_CONFIG,
          useValue: { tag: 'span', css: 'shiny' },
        },
      ],
    });

    expect(spectator.element.querySelector('div')?.innerHTML).toBe('<span class="shiny">a</span>');
  });

  it('should use config as parameter over as provider', () => {
    spectator = createPipe(
      `<div [innerHTML]="'a' | autocompleteHighlight:'a':{ tag: 'em', css: 'highlight' }"></div>`,
      {
        providers: [
          {
            provide: AUTOCOMPLETE_HIGHLIGHT_CONFIG,
            useValue: { tag: 'span', css: 'shiny' },
          },
        ],
      }
    );

    expect(spectator.element.querySelector('div')?.innerHTML).toBe('<em class="highlight">a</em>');
  });
});
