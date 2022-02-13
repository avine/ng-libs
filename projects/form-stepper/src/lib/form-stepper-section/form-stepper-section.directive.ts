import { AfterViewInit, ContentChildren, Directive, ElementRef, Input, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit {
  @Input() formStepperSection!: FormGroup;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  constructor(private service: FormStepperService, private el: ElementRef) {}

  ngAfterViewInit() {
    console.log(this.stepDirectiveQueryList);
    console.log(this.el);
  }
}
