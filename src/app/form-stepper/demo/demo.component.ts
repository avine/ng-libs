import { shareReplay, startWith, tap } from 'rxjs/operators';

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatQuicknavValueFromListToHtml, FormStepperContainerComponent } from '@avine/ng-form-stepper';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  // You can access the public API of the FormStepper
  @ViewChild(FormStepperContainerComponent) formStepper!: FormStepperContainerComponent;

  hobbiesCtrl = this.formBuilder.array([['', Validators.required]]);

  contactCtrl = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
    }),
  });

  companyCtrl = this.formBuilder.group({
    name: ['', Validators.required],
    activity: ['', Validators.required],
  });

  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    haveCompany: [false, Validators.required],
    message: [''],
  });

  haveCompany$ = this.formGroup.controls.haveCompany.valueChanges.pipe(
    startWith(this.formGroup.controls.haveCompany.value),
    tap((haveCompany: boolean) => {
      if (haveCompany) {
        this.formGroup.addControl('company', this.companyCtrl);
        this.formGroup.removeControl('hobbies');
        this.formGroup.removeControl('contact');
        this.formGroup.updateValueAndValidity();
      } else {
        this.formGroup.removeControl('company');
        this.formGroup.addControl('hobbies', this.hobbiesCtrl);
        this.formGroup.addControl('contact', this.contactCtrl);
        this.formGroup.updateValueAndValidity();
      }
    }),
    shareReplay(1) // Execute `tap` once for all subscribers using `shareReplay`.
  );

  // You can customize the values displayed in the `<form-stepper-quicknav>`
  quicknavFormatter = (path: string, value: any): string | void => {
    if (path === 'hobbies') {
      return formatQuicknavValueFromListToHtml(value as string[], undefined, false);
    }
    if (path === 'have-company') {
      return value ? 'Yes' : 'No';
    }
    if (path === 'message') {
      return value || 'None';
    }
    return undefined;
  };

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  addHobbyCtrl() {
    this.hobbiesCtrl.push(new FormControl(''));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    // This is optional but ensure that valid form can be submitted only when the user is on the last step.
    const { isLastStep } = this.formStepper.mainSnapshot();
    if (!isLastStep) {
      return;
    }

    this.isBeingSubmitted = true;

    console.log('FormStepper -> onSubmit', this.formGroup.value);

    // Simulate that we are submitting the form to the backend during 1 sec.
    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 1000);
  }
}
