import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormStepperIconComponent } from '../form-stepper-icon/form-stepper-icon.component';
import { FormStepperSectionIconComponent } from '../form-stepper-section-icon/form-stepper-section-icon.component';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperNavSection, FormStepperStep } from '../form-stepper.types';
import { navAnimations } from './form-stepper-nav.animations';

/**
 * Render the FormStepper navigation.
 */
@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    OverlayModule,
    FormStepperIconComponent,
    FormStepperSectionIconComponent,
  ],
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

  noOnboardingNav = false;

  /**
   * Determines whether to remove the link to the Onboarding step from the "nav".
   */
  @Input() set fsNoOnboardingNav(value: BooleanInput) {
    this.noOnboardingNav = coerceBooleanProperty(value);
  }

  noStepsNav = false;

  /**
   * Determines whether to hide the steps in the "nav" for all sections.
   * When set to `true`, only the "sections" are displayed.
   */
  @Input() set fsNoStepsNav(value: BooleanInput) {
    this.noStepsNav = coerceBooleanProperty(value);
  }

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
      this.isMobile = state.matches;
      this.isMobileOverlayOpen = false;
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
    } else if (!this.noStepsNav) {
      this.isMobileOverlayOpen = !this.isMobileOverlayOpen;
    }
  }

  trackByControl(_: number, { control }: FormStepperNavSection | FormStepperStep) {
    return control;
  }
}
