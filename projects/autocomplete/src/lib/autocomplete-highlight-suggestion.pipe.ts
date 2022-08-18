import { Pipe, PipeTransform } from '@angular/core';

import { escapeRegExp } from './autocomplete.utils';

@Pipe({
  name: 'autocompleteHighlightSuggestion',
})
export class AutocompleteHighlightSuggestionPipe implements PipeTransform {
  transform(suggestionValue: string, inputValue: string, tag = 'span'): string {
    return suggestionValue.replace(
      new RegExp(escapeRegExp(inputValue), 'i'),
      `<${tag} class="autocomplete-input__suggestion-highlight">$&</${tag}>`
    );
  }
}
