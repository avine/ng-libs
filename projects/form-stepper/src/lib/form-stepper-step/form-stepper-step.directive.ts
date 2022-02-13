import { AfterViewInit, Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective implements AfterViewInit {
  @Input() formStepperStep!: FormControl;

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    console.log(this.formStepperStep);
  }
}
