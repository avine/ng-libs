import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    address: this.formBuilder.group({
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
    })
  });

  fullName = this.formGroup.get('fullName') as FormGroup;
  firstName = this.formGroup.get('fullName')?.get('firstName') as FormControl;
  lastName = this.formGroup.get('fullName')?.get('lastName') as FormControl;

  address = this.formGroup.get('address') as FormGroup;
  street = this.formGroup.get('address')?.get('street') as FormControl;
  zipCode = this.formGroup.get('address')?.get('zipCode') as FormControl;
  city = this.formGroup.get('address')?.get('city') as FormControl;

  constructor(private formBuilder: FormBuilder) {}
}
