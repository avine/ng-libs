import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faCoffee, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';

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
    cgu: ['', Validators.requiredTrue],
  });

  submitInProgress = false;

  faCoffee = faCoffee;
  faAddressCard = faAddressCard;
  faUser = faUser;

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
