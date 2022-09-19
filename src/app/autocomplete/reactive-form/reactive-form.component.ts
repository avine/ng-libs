import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

import { ViewCodeComponent } from '../../shared/view-code/view-code.component';
import { getCountries } from '../countries';

@Component({
  standalone: true,
  imports: [CommonModule, OverlayModule, ReactiveFormsModule, ViewCodeComponent, ...AUTOCOMPLETE_DIRECTIVES],
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
