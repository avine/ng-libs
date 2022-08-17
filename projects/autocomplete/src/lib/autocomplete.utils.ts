import { AutocompleteDatalistItem } from './autocomplete.types';

export const getAutocompleteDatalistItem = (data: string | AutocompleteDatalistItem): AutocompleteDatalistItem =>
  typeof data === 'string' ? ({ value: data } as AutocompleteDatalistItem) : data;

const escapeRegExp = (value: string) => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export const highlightSuggestion = (suggestionValue: string, inputValue: string, tag: string): string =>
  suggestionValue.replace(new RegExp(escapeRegExp(inputValue), 'i'), `<${tag}>$&</${tag}>`);
