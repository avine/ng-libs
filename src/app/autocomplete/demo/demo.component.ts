import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';
import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgFor, NgIf, OverlayModule, ViewSourceComponent, ...AUTOCOMPLETE_DIRECTIVES],
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
