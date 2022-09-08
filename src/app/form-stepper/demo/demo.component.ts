import { shareReplay, startWith, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  formatQuicknavValueFromListToHtml,
  FormStepperContainerComponent,
  FormStepperModule,
} from '@avine/ng-form-stepper';

import { ViewCodeComponent } from '../../shared/view-code/view-code.component';
import { DemoForm } from './demo.types';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, ViewCodeComponent, FormStepperModule],
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

  formGroup: FormGroup<DemoForm> = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    haveCompany: [null as null | boolean, Validators.required],
    message: [''],
  });

  haveCompany$ = this.formGroup.controls.haveCompany.valueChanges.pipe(
    startWith(this.formGroup.controls.haveCompany.value),
    tap((haveCompany: boolean | null) => {
      if (haveCompany === null) {
        return;
      }
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

  constructor(private formBuilder: NonNullableFormBuilder) {}

  addHobbyCtrl() {
    this.hobbiesCtrl.push(new FormControl('', { nonNullable: true }));
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    // Ensure that a valid form can only be submitted when the user is in the last step (this is optional).
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
