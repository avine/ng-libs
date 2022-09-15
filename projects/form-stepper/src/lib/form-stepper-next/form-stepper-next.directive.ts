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
  standalone: true,
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
  @Input() fsInactive!: string;

  private subscription!: Subscription;

  constructor(private service: FormStepperService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.subscription = this.service.state$.subscribe(({ hasNextStep, isStepValid }) => {
      if (!this.fsInactive) {
        return;
      }
      this.renderer[hasNextStep && isStepValid ? 'removeClass' : 'addClass'](
        this.elementRef.nativeElement,
        this.fsInactive
      );
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
