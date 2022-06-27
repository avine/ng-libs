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
 * Jump to the previous step on click event.
 *
 * Use this directive on `<button>` elements (for `<a>` elements, use `formStepperPrevAnchor` directive instead).
 */
@Directive({
  selector: '[formStepperPrev]',
})
export class FormStepperPrevDirective implements AfterViewInit, OnDestroy {
  @HostBinding('disabled') get isDisabled() {
    return !this.service.useRouting && !this.service.state.hasPrevStep;
  }

  @HostListener('click') onClick() {
    this.service.prevStep();
  }

  /**
   * CSS class to add when the button should be mark as inactive.
   */
  @Input() fsInactive!: string;

  private subscription!: Subscription;

  constructor(private service: FormStepperService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.subscription = this.service.state$.subscribe(({ hasPrevStep }) => {
      if (!this.fsInactive) {
        return;
      }
      this.renderer[!this.service.useRouting && !hasPrevStep ? 'addClass' : 'removeClass'](
        this.elementRef.nativeElement,
        this.fsInactive
      );
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
