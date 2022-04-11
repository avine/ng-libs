import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  @HostBinding('class.form-stepper-quicknav') hasClass = true;

  @Input() formStepperCompact = false;

  @Input() formStepperFormat!: (path: string, controlValue: any) => string | void;

  nav$ = this.service.state$.pipe(map(({ nav }) => nav));

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}

  getStepValue(step: FormStepperStep): string {
    const { path, control } = step;
    if (typeof this.formStepperFormat === 'function') {
      const result = this.formStepperFormat(path, control.value);
      if (result !== undefined) {
        return result;
      }
    }
    return this.format(control.value);
  }

  private format(value: any): string {
    if (Array.isArray(value)) {
      return this.formatArray(value);
    }
    if (typeof value === 'object' && value !== null) {
      return this.formatArray(Object.values(value));
    }
    const { yes, no } = this.service.config.translations;
    if (value === true) {
      return yes;
    }
    if (value === false) {
      return no;
    }
    return (value ?? '').toString();
  }

  private formatArray(values: any[]): string {
    return values
      .map((value) => this.format(value))
      .filter((value) => !!value)
      .join(', ');
  }
}
