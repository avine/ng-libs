import { OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';
import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgFor,
    NgIf,
    OverlayModule,
    ReactiveFormsModule,
    ViewSourceComponent,
    ...AUTOCOMPLETE_DIRECTIVES,
  ],
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
