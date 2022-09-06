import { AutocompleteHighlightConfig } from './autocomplete-highlight.types';

export const AUTOCOMPLETE_DEFAULT_HIGHLIGHT_CONFIG: Required<AutocompleteHighlightConfig> = {
  tag: 'strong',
  css: '',
};

export const AUTOCOMPLETE_BASE_HIGHLIGHT_CONFIG: Required<AutocompleteHighlightConfig> = {
  tag: 'span',
  css: '',
};
