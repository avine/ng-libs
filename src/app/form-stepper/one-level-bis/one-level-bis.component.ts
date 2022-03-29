import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-one-level-bis',
  templateUrl: './one-level-bis.component.html',
  styleUrls: ['./one-level-bis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneLevelBisComponent {
  formGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    array: this.formBuilder.array([
      ['', Validators.required],
      ['', Validators.required],
    ]),
    arrayGroup: this.formBuilder.group({
      array2: this.formBuilder.array([
        ['', Validators.required],
        ['', Validators.required],
      ]),
      foo: ['', Validators.required],
    }),
  });

  array = this.formGroup.get('array') as FormArray;

  item0 = this.array.at(0) as FormControl;
  item1 = this.array.at(1) as FormControl;

  get array2Indexes() {
    return (this.formGroup.get('arrayGroup.array2') as FormArray).controls.map((_, i) => i);
  }

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  submitForm() {
    console.log('SUBMIT', this.formGroup.value);
  }
}
