import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';

import { escapeRegExp } from '../autocomplete.utils';
import {
  BASE_AUTOCOMPLETE_HIGHLIGHT_CONFIG,
  DEFAULT_AUTOCOMPLETE_HIGHLIGHT_CONFIG,
} from './autocomplete-highlight.config';
import { AUTOCOMPLETE_HIGHLIGHT_CONFIG } from './autocomplete-highlight.token';
import { AutocompleteHighlightConfig } from './autocomplete-highlight.types';

@Pipe({
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
      ...BASE_AUTOCOMPLETE_HIGHLIGHT_CONFIG,
      ...(config ?? this.config ?? DEFAULT_AUTOCOMPLETE_HIGHLIGHT_CONFIG),
    };
    return suggestionValue.replace(new RegExp(escapeRegExp(inputValue), 'i'), `<${tag} class="${css}">$&</${tag}>`);
  }
}
