import { Component, ViewEncapsulation } from '@angular/core';

import { getCountries } from '../countries';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  inputMinLength = 0;

  countries = getCountries();

  country = 'France';
}
