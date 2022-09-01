import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { getCountries } from '../countries';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactiveFormComponent {
  inputMinLength = 0;

  countries = getCountries();

  formGroup = this.formBuilder.group({ country: ['France'] });

  constructor(private formBuilder: FormBuilder) {}
}
