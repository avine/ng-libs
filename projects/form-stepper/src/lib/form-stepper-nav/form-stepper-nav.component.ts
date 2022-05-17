import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ConnectedPosition } from '@angular/cdk/overlay';
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

  delayedFadeInState = -1;

  isMobile = false;

  isMobileOverlayOpen = false;

  mobileOverlayPosition: { left: ConnectedPosition[]; right: ConnectedPosition[] } = {
    left: [
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
      { originX: 'center', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    ],
    right: [
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
      { originX: 'center', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    ],
  };

  state$ = this.service.state$;

  private get breakpointQuery() {
    return `(max-width: calc(${this.service.config.breakpoint} - 1px))`;
  }

  private get breakpointSubscription() {
    return this.breakpointObserver.observe(this.breakpointQuery).subscribe((state: BreakpointState) => {
      this.delayedFadeInState = (this.delayedFadeInState % 2) + 1; // values: 0, 1, 2, 1, 2, 1, 2, ...
      this.isMobile = state.matches;
      this.changeDetectorRef.markForCheck();
    });
  }

  private get mobileOverlaySubscription() {
    return this.service.state$
      .pipe(
        map(({ stepIndex }) => stepIndex),
        distinctUntilChanged()
      )
      .subscribe(() => (this.isMobileOverlayOpen = false));
  }

  private readonly subscriptions = new Subscription();

  constructor(
    private service: FormStepperService,
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.add(this.breakpointSubscription);
    this.subscriptions.add(this.mobileOverlaySubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateByStepIndex(event: Event, stepIndex: number, sectionIndex?: number) {
    event.stopPropagation();
    if (sectionIndex !== this.service.state.sectionIndex) {
      this.service.navigateByStepIndex(stepIndex);
    } else {
      this.isMobileOverlayOpen = !this.isMobileOverlayOpen;
    }
  }

  trackByControl(_: number, { control }: FormStepperNavSection | FormStepperStep) {
    return control;
  }
}
