import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-two-levels',
  templateUrl: './two-levels.component.html',
  styleUrls: ['./two-levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoLevelsComponent {
  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    contact: this.formBuilder.group({
      email: ['', Validators.required],
    }),
    address: this.formBuilder.group({
      street: [''],
      zipCodeAndCity: this.formBuilder.group({
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
    }),
  });

  fullName = this.formGroup.get('fullName') as FormGroup;
  firstName = this.formGroup.get('fullName')?.get('firstName') as FormControl;
  lastName = this.formGroup.get('fullName')?.get('lastName') as FormControl;

  contact = this.formGroup.get('contact') as FormGroup;
  email = this.formGroup.get('contact')?.get('email') as FormControl;

  address = this.formGroup.get('address') as FormGroup;
  street = this.formGroup.get('address')?.get('street') as FormControl;
  zipCodeAndCity = this.formGroup.get('address')?.get('zipCodeAndCity') as FormGroup;
  zipCode = this.formGroup.get('address')?.get('zipCodeAndCity')?.get('zipCode') as FormControl;
  city = this.formGroup.get('address')?.get('zipCodeAndCity')?.get('city') as FormControl;

  submitInProgress = false;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitInProgress = true;
    console.log('Submitting', JSON.stringify(this.formGroup.value, undefined, 2));
    setTimeout(() => {
      this.submitInProgress = false;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }
}
