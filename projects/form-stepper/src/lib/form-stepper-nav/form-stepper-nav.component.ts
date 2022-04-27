import { Subscription } from 'rxjs';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { FormStepperNavSection, FormStepperStep } from '../form-stepper.types';
import { navAnimations } from './form-stepper-nav.animations';

/**
 * Render the FormStepper navigation.
 */
@Component({
  selector: 'form-stepper-nav',
  templateUrl: './form-stepper-nav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: navAnimations,
})
export class FormStepperNavComponent implements OnInit, OnDestroy {
  @HostBinding('class.form-stepper-nav') hasClass = true;

  @HostBinding('class.form-stepper-nav--mobile') get hasMobileClass() {
    return this.isMobile;
  }

  isMobile = false;

  state$ = this.service.state$;

  private get breakpointQuery() {
    return `(max-width: calc(${this.service.config.breakpoint} - 1px))`;
  }

  private subscription!: Subscription;

  constructor(
    private service: FormStepperService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.breakpointObserver.observe(this.breakpointQuery).subscribe((state: BreakpointState) => {
      this.isMobile = state.matches;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  navigateByStepIndex(event: Event, stepIndex: number) {
    event.stopPropagation();
    this.service.navigateByStepIndex(stepIndex);
  }

  trackByControl(_: number, { control }: FormStepperNavSection | FormStepperStep) {
    return control;
  }
}
