import { AutocompleteDataListItem } from './autocomplete.types';

export const getAutocompleteDataListItem = (data: string | AutocompleteDataListItem): AutocompleteDataListItem =>
  typeof data === 'string' ? ({ value: data } as AutocompleteDataListItem) : data;

export const escapeRegExp = (value: string) => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
