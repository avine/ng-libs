import { Component } from '@angular/core';
import { Validators, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    email: ['', [Validators.required, Validators.email]],
    cgu: ['', [Validators.requiredTrue]],
  });

  isBeingSubmitted = false;

  constructor(private formBuilder: UntypedFormBuilder) {}

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.isBeingSubmitted = true;

    console.log('FormStepper -> onSubmit', this.formGroup.value);

    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 1000);
  }
}
