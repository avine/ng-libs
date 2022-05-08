import { Subscription } from 'rxjs';

import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

/**
 * Jump to the next step on click event.
 */
@Directive({
  selector: '[formStepperNext]',
})
export class FormStepperNextDirective implements AfterViewInit, OnDestroy {
  @HostBinding('disabled') get isDisabled() {
    return !(this.service.state.hasNextStep && this.service.state.isStepValid);
  }

  @HostListener('click') onClick() {
    this.service.nextStep();
  }

  /**
   * CSS class to add when the button should be mark as inactive.
   */
  @Input() formStepperInactive!: string;

  private subscription!: Subscription;

  constructor(private service: FormStepperService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.subscription = this.service.state$.subscribe(({ hasNextStep, isStepValid }) => {
      if (!this.formStepperInactive) {
        return;
      }
      this.renderer[hasNextStep && isStepValid ? 'removeClass' : 'addClass'](
        this.elementRef.nativeElement,
        this.formStepperInactive
      );
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
