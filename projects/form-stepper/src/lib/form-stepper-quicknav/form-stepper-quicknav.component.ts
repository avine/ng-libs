import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  styleUrls: ['./form-stepper-quicknav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  @Input() formStepperHideSections = false;

  nav$ = this.service.state$.pipe(map(({ nav }) => nav));

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}

  getValue(control: AbstractControl) {
    if (control instanceof FormGroup) {
      return Object.values(control.value)
        .map((value) => this.format(value))
        .join(', ');
    } else if (control instanceof FormArray) {
      return control.value.map((value: any) => this.format(value)).join(', ');
    }
    return this.format(control.value);
  }

  private format(value: any): string {
    const { yes, no } = this.service.translations;
    switch (value) {
      case true:
        return yes;
      case false:
        return no;
      default:
        return value;
    }
  }
}
