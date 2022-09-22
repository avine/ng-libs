import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';

import { escapeRegExp } from '../autocomplete.utils';
import {
  AUTOCOMPLETE_BASE_HIGHLIGHT_CONFIG,
  AUTOCOMPLETE_DEFAULT_HIGHLIGHT_CONFIG,
} from './autocomplete-highlight.config';
import { AUTOCOMPLETE_HIGHLIGHT_CONFIG } from './autocomplete-highlight.token';
import { AutocompleteHighlightConfig } from './autocomplete-highlight.types';

@Pipe({
  standalone: true,
  name: 'autocompleteHighlight',
})
export class AutocompleteHighlightPipe implements PipeTransform {
  constructor(@Optional() @Inject(AUTOCOMPLETE_HIGHLIGHT_CONFIG) private config?: AutocompleteHighlightConfig) {}

  /**
   * Highlight the part of the suggestion that matches the input string.
   *
   * the `AutocompleteHighlightConfig` can be set:
   * - locally when applying the pipe
   * - globally by providing the `AUTOCOMPLETE_HIGHLIGHT_CONFIG` injection token.
   */
  transform(suggestionValue: string, inputValue: string, config?: AutocompleteHighlightConfig): string {
    const { tag, css } = {
      ...AUTOCOMPLETE_BASE_HIGHLIGHT_CONFIG,
      ...(config ?? this.config ?? AUTOCOMPLETE_DEFAULT_HIGHLIGHT_CONFIG),
    };
    const attr = css ? ` class="${css}"` : '';
    return suggestionValue.replace(new RegExp(escapeRegExp(inputValue), 'i'), `<${tag}${attr}>$&</${tag}>`);
  }
}
