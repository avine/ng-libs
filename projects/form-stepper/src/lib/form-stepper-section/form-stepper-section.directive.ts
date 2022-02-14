import { AfterViewInit, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit {
  @Input() formStepperSection!: FormGroup;

  @Input() title!: string;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  constructor(private service: FormStepperService, private el: ElementRef) {}

  ngAfterViewInit() {
    const offset = this.service.steps.length;
    const steps: FormStepperStep[] = [];
    this.stepDirectiveQueryList.forEach(({ formStepperStep: control, templateRef, title }) => {
      const step: FormStepperStep = { control, templateRef, title };
      steps.push(step);
      this.service.addStep(step);
    });

    this.service.nav.push({
      title: this.title,
      section: this.formStepperSection,
      offset,
      steps: steps,
    });
  }
}
