import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  styleUrls: ['./form-stepper-quicknav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  @HostBinding('class.form-stepper-quicknav') hasClass = true;

  @Input() formStepperCompact = false;

  nav$ = this.service.state$.pipe(map(({ nav }) => nav));

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}

  getValue(control: AbstractControl) {
    if (control instanceof FormControl) {
      return this.format(control.value);
    }
    const values =
      control instanceof FormGroup ? Object.values(control.value) : ((control as FormArray).value as unknown[]);
    return values
      .filter((value) => !!value)
      .map((value) => this.format(value))
      .join(', ');
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
