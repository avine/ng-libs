import { AfterViewInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';
import { concatUrlPaths } from '../form-stepper.utils';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit {
  @Input() formStepperSection!: FormGroup;

  @Input() title!: string;

  @Input() urlPath!: string;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    const offset = this.service.steps.length;
    const steps: FormStepperStep[] = [];

    this.stepDirectiveQueryList.forEach(({ title, urlPath, formStepperStep: control, templateRef }, index) => {
      const step: FormStepperStep = {
        title,
        urlPath: concatUrlPaths(this.urlPath, urlPath),
        control,
        templateRef,
        sectionIndex: this.service.nav.length,
        stepIndex: offset + index,
        sectionProgression: { count: index + 1, total: this.stepDirectiveQueryList.length },
      };

      this.service.addStep(step);
      steps.push(step);
    });

    this.service.addNavSection({
      title: this.title,
      section: this.formStepperSection,
      offset,
      steps,
    });
  }
}
