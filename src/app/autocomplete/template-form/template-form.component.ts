import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [CommonModule, OverlayModule, FormsModule, ...AUTOCOMPLETE_DIRECTIVES],
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
