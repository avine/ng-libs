import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [CommonModule, OverlayModule, ...AUTOCOMPLETE_DIRECTIVES],
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  inputMinLength = 0;

  countries = getCountries();

  country = 'France';

  changeInputMinLength() {
    this.inputMinLength = (this.inputMinLength + 1) % 4;
  }
}
