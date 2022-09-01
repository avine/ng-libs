import { Component, ViewEncapsulation } from '@angular/core';
import { AUTOCOMPLETE_HIGHLIGHT_CONFIG, AutocompleteHighlightConfig } from '@avine/ng-autocomplete';

import { getCountries } from '../countries';

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AUTOCOMPLETE_HIGHLIGHT_CONFIG,
      useValue: { css: 'autocomplete-input__suggestion-highlight' } as AutocompleteHighlightConfig,
    },
  ],
})
export class StandaloneComponent {
  inputMinLength = 0;

  countries = getCountries();

  country = 'France';
}
