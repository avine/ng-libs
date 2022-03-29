import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
})
export class Demo1Component {
  formGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    }),
  });

  isBeingSubmitted = false;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {}

  onSubmit() {
    this.isBeingSubmitted = true;

    // Emulate that we are submitting the form to the backend during 2 sec.
    setTimeout(() => {
      this.isBeingSubmitted = false;
    }, 2000);
  }
}
