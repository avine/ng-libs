import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

type FormStepperControlConfig = 'noPreventDefault' | '';

@Directive({
  selector: '[formStepperControl]',
})
export class FormStepperControlDirective implements OnInit, OnDestroy {
  @Input() formStepperControl!: FormStepperControlConfig;

  @HostListener('keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    // Do not submit form on "enter"...
    if (this.formStepperControl !== 'noPreventDefault') {
      event.preventDefault();
    }
    // ...simply navigate to next step
    if (this.service.state.isStepValid) {
      this.service.nextStep();
    }
  }

  constructor(private service: FormStepperService, private elementRef: ElementRef) {}

  ngOnInit() {
    this.service.addControlElement(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.service.removeControlElement(this.elementRef.nativeElement);
  }
}
