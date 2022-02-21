import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleComponent {
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
