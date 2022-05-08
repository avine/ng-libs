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
 * Jump to the previous step on click event (for `<button>`).
 */
@Directive({
  selector: '[formStepperPrev]',
})
export class FormStepperPrevDirective implements AfterViewInit, OnDestroy {
  @HostBinding('disabled') get isDisabled() {
    return !this.service.state.hasPrevStep;
  }

  @HostListener('click') onClick() {
    this.service.prevStep();
  }

  /**
   * CSS class to add when the button should be mark as inactive.
   */
  @Input() formStepperInactive!: string;

  private subscription!: Subscription;

  constructor(private service: FormStepperService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.subscription = this.service.state$.subscribe(({ hasPrevStep }) => {
      if (!this.formStepperInactive) {
        return;
      }
      this.renderer[hasPrevStep ? 'removeClass' : 'addClass'](this.elementRef.nativeElement, this.formStepperInactive);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
