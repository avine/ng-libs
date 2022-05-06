import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatQuicknavValueFromListToHtml, FormStepperContainerComponent } from '@avine/ng-form-stepper';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, OnDestroy {
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

  haveCompanyCtrl = this.formGroup.controls.haveCompany;

  // You can customize the values displayed in the `<form-stepper-quicknav>`
  quicknavFormatter = (path: string, value: any): string | void => {
    if (path === 'hobbies') {
      return formatQuicknavValueFromListToHtml(value as string[], undefined, false);
    }
    if (path === 'message') {
      return value || 'None';
    }
    return undefined;
  };

  isBeingSubmitted = false;

  private subscription!: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.handleHaveCompanyChange();
    this.subscription = this.formGroup.controls.haveCompany.valueChanges.subscribe(() => {
      this.handleHaveCompanyChange();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleHaveCompanyChange(): void {
    if (this.formGroup.controls.haveCompany.value) {
      this.formGroup.addControl('company', this.companyCtrl);
      this.formGroup.removeControl('contact');
      this.formGroup.removeControl('hobbies');
      this.formGroup.updateValueAndValidity();
    } else {
      this.formGroup.removeControl('company');
      this.formGroup.addControl('contact', this.contactCtrl);
      this.formGroup.addControl('hobbies', this.hobbiesCtrl);
      this.formGroup.updateValueAndValidity();
    }
  }

  addHobbyCtrl(): void {
    this.hobbiesCtrl.push(new FormControl(''));
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    // This is optional but ensure that valid form can be submitted only when the user is on the last step.
    const { stepIndex, lastStepIndex } = this.formStepper.stateSnapshot();
    if (stepIndex !== lastStepIndex) {
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
