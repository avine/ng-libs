import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

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
    email: ['', Validators.required],
    cgu: ['', Validators.requiredTrue],
  });

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.isBeingSubmitted = true;

    // eslint-disable-next-line no-console
    console.log('FormStepper -> onSubmit', this.formGroup.value);

    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 1000);
  }
}
