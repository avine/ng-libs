import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { FORM_STEPPER_CONTROL_ON_ENTER_DEFAULT } from './form-stepper-control.config';
import { FormStepperControlOnEnter } from './form-stepper-control.types';

@Directive({
  standalone: true,
  selector: '[formStepperControl]',
})
export class FormStepperControlDirective implements OnInit, OnDestroy {
  /**
   * Add smart behaviors to the `FormControl`:
   * - autofocus the first `FormControl` of the step (when it has no value).
   * - prevent form submission when pressing "Enter" key.
   * - jump to the next step when pressing "Enter" key (if the current step is valid).
   *
   * Note: use `fsOnEnter` input to adjust the directive behavior.
   */
  @Input() formStepperControl!: '';

  /**
   * Adjust the directive behavior.
   *
   * @example
   * For a `<textarea>` you probably want to configure the directive as follows:
   * ```ts
   * { preventDefault: false, nextStep: false }
   * ```
   */
  @Input() fsOnEnter!: Partial<FormStepperControlOnEnter>;

  @HostListener('keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    const { preventDefault, nextStep } = this.onEnterConfig;

    // Do not submit form on "enter" key pressed...
    if (preventDefault) {
      event.preventDefault();
    }

    // ...but navigate to next step instead
    if (nextStep && this.service.state.isStepValid) {
      this.service.nextStep();
    }
  }

  private get onEnterConfig(): FormStepperControlOnEnter {
    return { ...FORM_STEPPER_CONTROL_ON_ENTER_DEFAULT, ...(this.fsOnEnter ?? {}) };
  }

  constructor(
    private service: FormStepperService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.service.addControlElement(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.service.removeControlElement(this.elementRef.nativeElement);
  }
}
