import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { faCoffee, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    contact: this.formBuilder.group({
      email: ['', Validators.required],
    }),
    consent: this.formBuilder.group({
      cgu: ['', Validators.requiredTrue],
    }),
  });

  fullName = this.formGroup.get('fullName') as FormGroup;
  firstName = this.formGroup.get('fullName')?.get('firstName') as FormControl;
  lastName = this.formGroup.get('fullName')?.get('lastName') as FormControl;

  contact = this.formGroup.get('contact') as FormGroup;
  email = this.formGroup.get('contact')?.get('email') as FormControl;

  consent = this.formGroup.get('consent') as FormGroup;
  cgu = this.formGroup.get('consent')?.get('cgu') as FormControl;

  submitInProgress = false;

  faCoffee = faCoffee;
  faAddressCard = faAddressCard;
  faUser = faUser;

  constructor(private formBuilder: FormBuilder) {}

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitInProgress = true;
    console.log('Submitting', JSON.stringify(this.formGroup.value, undefined, 2));
    setTimeout(() => {
      this.submitInProgress = false;
    }, 1000);
  }
}
