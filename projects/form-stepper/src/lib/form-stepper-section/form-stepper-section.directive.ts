import { AfterViewInit, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit {
  @Input() formStepperSection!: FormGroup;

  @Input() title!: string;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  constructor(private service: FormStepperService, private el: ElementRef) {}

  ngAfterViewInit() {
    this.stepDirectiveQueryList.forEach(({ formStepperStep: control, templateRef, title }) => {
      this.service.addStep({ control, templateRef, title });
    });

    this.service.nav.push({
      title: this.title,
      steps: this.service.steps.slice(this.service.nav.length + 1),
    });
  }
}
