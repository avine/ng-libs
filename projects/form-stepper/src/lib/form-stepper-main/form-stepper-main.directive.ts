import { Directive, TemplateRef } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

/**
 * Customize the template of the current step.
 *
 * This is optional. By default, the `formStepperStep` template is displayed as the current step content.
 * In this case, it is your responsability to display the step title, the previous and next buttons in each step template.
 *
 * Example of usage:
 * ```html
 * <form-stepper-container #formStepper>
 *   <ng-template formStepperMain>
 *     <ng-container *ngIf="formStepper.main$ | async as main">
 *       <h2>{{ main.stepTitle }}</h2>
 *
 *       <ng-container [ngTemplateOutlet]="main.stepTemplate"></ng-container>
 *
 *       <p>
 *         <button *ngIf="!main.isFirstStep" formStepperPrev type="button">Previous</button>
 *
 *         <button *ngIf="!main.isLastStep; else submitButton" formStepperNext type="button">Next</button>
 *
 *         <ng-template #submitButton>
 *           <button type="submit">Submit</button>
 *         </ng-template>
 *       </p>
 *     </ng-container>
 *   </ng-template>
 * </form-stepper-container>
 * ```
 */
@Directive({
  selector: '[formStepperMain]',
  exportAs: 'formStepperMain',
})
export class FormStepperMainDirective {
  /**
   * Get an observable of the main infos needed to render the current step.
   */
  main$ = this.service.main$;

  constructor(public template: TemplateRef<any>, private service: FormStepperService) {}
}
