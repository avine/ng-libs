import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  AUTOCOMPLETE_DIRECTIVES,
  AUTOCOMPLETE_HIGHLIGHT_CONFIG,
  AutocompleteHighlightConfig,
} from '@avine/ng-autocomplete';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';
import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf, ViewSourceComponent, ...AUTOCOMPLETE_DIRECTIVES],
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AUTOCOMPLETE_HIGHLIGHT_CONFIG,
      useValue: { css: 'demo-autocomplete__suggestion-highlight' } as AutocompleteHighlightConfig,
    },
  ],
})
export class StandaloneComponent {
  inputMinLength = 0;

  countries = getCountries();

  country = 'France';
}
