import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Add a static step as last step (can not contain any `FormControl`).
 *
 * Use it for example to display the "quicknav".
 */
@Directive({
  selector: '[formStepperOnboarding]',
})
export class FormStepperOnboardingDirective {
  /** The title of the static step. */
  @Input() formStepperTitle!: string;

  /** The icon template of the static step. */
  @Input() formStepperIcon!: TemplateRef<any>;

  /**
   * The route parameter to use to navigate to the static step (ie: the value of `FORM_STEPPER_PATH_PARAM`).
   */
  @Input() formStepperPath!: string;

  constructor(public template: TemplateRef<any>) {}
}
