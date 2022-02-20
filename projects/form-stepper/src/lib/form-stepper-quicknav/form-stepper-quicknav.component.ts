import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  styleUrls: ['./form-stepper-quicknav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  nav$ = this.service.state$.pipe(map(({ nav }) => nav));

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}

  getValue(control: AbstractControl) {
    if (control instanceof FormGroup) {
      return Object.values(control.value).join(', ');
    } else if (control instanceof FormArray) {
      return control.value.join(', ');
    }
    return control.value;
  }
}
