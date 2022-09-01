import { Component, ViewEncapsulation } from '@angular/core';

import { getCountries } from '../countries';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TemplateFormComponent {
  inputMinLength = 0;

  countries = getCountries();

  country = 'France';
}
