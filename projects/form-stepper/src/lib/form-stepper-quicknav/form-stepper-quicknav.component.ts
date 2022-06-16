import { map } from 'rxjs/operators';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

/**
 * Render the form's value in a nice summary with links to jump to a any step.
 *
 * Use the `formStepperCompact` input to adjust the HTML output.
 */
@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  @HostBinding('class.form-stepper-quicknav') hasClass = true;

  compact = false;

  /**
   * Determines whether to remove the sections from the summary.
   * Should be set to `true` when the FormStepper has only one level (each section has only one step).
   */
  @Input() set formStepperCompact(value: BooleanInput) {
    this.compact = coerceBooleanProperty(value);
  }

  /**
   * Customize the value of any step.
   *
   * @returns Return a `string` to overwrite the default formatting or `void` to bypass.
   */
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
    return (value ?? '').toString();
  }

  private formatArray(values: any[]): string {
    return values
      .map((value) => this.format(value))
      .filter((value) => !!value)
      .join(', ');
  }
}
