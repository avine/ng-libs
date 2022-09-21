import { JsonPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FORM_STEPPER_DIRECTIVES } from '@avine/ng-form-stepper';

import { ViewSourceComponent } from '../../shared/view-source/view-source.component';

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    NgFor,
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatIconModule,
    ViewSourceComponent,
    ...FORM_STEPPER_DIRECTIVES,
  ],
  selector: 'app-one-level',
  templateUrl: './one-level.component.html',
  styleUrls: ['./one-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneLevelComponent {
  formGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    hobbies: this.formBuilder.array([
      ['', Validators.required],
      ['', Validators.required],
    ]),
    cgu: ['', Validators.requiredTrue],
  });

  hobbies = this.formGroup.get('hobbies') as FormArray;

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  onSubmit() {
    this.isBeingSubmitted = true;

    console.log('FormStepper -> onSubmit', this.formGroup.value);

    // Simulate that we are submitting the form to the backend during 1 sec.
    setTimeout(() => {
      this.isBeingSubmitted = false;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }
}
