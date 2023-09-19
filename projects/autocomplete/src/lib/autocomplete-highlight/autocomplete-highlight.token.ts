import { InjectionToken } from '@angular/core';

import { AutocompleteHighlightConfig } from './autocomplete-highlight.types';

export const AUTOCOMPLETE_HIGHLIGHT_CONFIG = new InjectionToken<AutocompleteHighlightConfig>(
  'AUTOCOMPLETE_HIGHLIGHT_CONFIG',
);
