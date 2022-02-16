import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit {
  @Input() formStepperSection!: FormGroup;

  @Input() formStepperTitle!: string;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    const offset = this.service.steps.length;
    const steps: FormStepperStep[] = [];

    this.stepDirectiveQueryList.forEach(
      ({ formStepperTitle, formStepperPath, formStepperStep, templateRef }, relativeStepIndex) => {
        const step: FormStepperStep = {
          title: formStepperTitle,
          path: formStepperPath,
          control: formStepperStep,
          templateRef,
          sectionIndex: this.service.nav.length,
          stepIndex: offset + relativeStepIndex,
        };
        if (this.stepDirectiveQueryList.length >= 2) {
          step.sectionProgression = { count: relativeStepIndex + 1, total: this.stepDirectiveQueryList.length };
        }

        this.service.addStep(step);
        steps.push(step);
      }
    );

    this.service.addNavSection({
      title: this.formStepperTitle,
      section: this.formStepperSection,
      offset,
      steps,
    });
  }
}
