import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-two-levels',
  templateUrl: './two-levels.component.html',
  styleUrls: ['./two-levels.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoLevelsComponent {
  show = true;

  formGroup = this.formBuilder.group({
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
    email: ['', Validators.required],
    address: this.formBuilder.group({
      street: [''],
      zipCodeAndCity: this.formBuilder.group({
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
    }),
  });

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
