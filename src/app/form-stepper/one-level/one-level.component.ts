import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
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

  hobbies = this.formGroup.get('hobbies') as UntypedFormArray;

  isBeingSubmitted = false;

  constructor(private formBuilder: UntypedFormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

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
