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
 * Jump to the previous step on click event (for `<a>`).
 */
@Directive({
  selector: '[formStepperPrevAnchor]',
})
export class FormStepperPrevAnchorDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.form-stepper-prev-anchor') hasClass = true;

  @HostBinding('class.form-stepper-prev-anchor--disabled') get isDisabled() {
    return !this.service.useRouting && !this.service.state.hasPrevStep;
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    this.service.prevStep();
  }

  /**
   * CSS class to add when the anchor should be mark as inactive.
   */
  @Input() formStepperInactive!: string;

  private subscription!: Subscription;

  constructor(private service: FormStepperService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.subscription = this.service.state$.subscribe(({ hasPrevStep }) => {
      if (!this.formStepperInactive) {
        return;
      }
      this.renderer[!this.service.useRouting && !hasPrevStep ? 'addClass' : 'removeClass'](
        this.elementRef.nativeElement,
        this.formStepperInactive
      );
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
