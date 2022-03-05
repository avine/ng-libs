import { Subscription } from 'rxjs';

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperExtraPage } from '../form-stepper.types';

@Component({
  selector: 'form-stepper-container',
  templateUrl: './form-stepper-container.component.html',
  styleUrls: ['./form-stepper-container.component.scss'],
  providers: [FormStepperService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @HostBinding('class.form-stepper-container') hasClass = true;

  @Input() formStepperRoot!: FormGroup;

  @Input() formStepperValidSectionIcon!: TemplateRef<any>;

  @Input() formStepperDisabled!: boolean;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  private sectionsSubscription!: Subscription;

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.service.validSectionIcon = this.formStepperValidSectionIcon;

    if (this.onboardingDirective) {
      this.service.onboarding = this.getExtraPage(this.onboardingDirective);
    }
    if (this.summaryDirective) {
      this.service.summary = this.getExtraPage(this.summaryDirective);
    }

    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.sectionsSubscription = this.sectionDirectiveQueryList.changes.subscribe(() => this.updateSections());
  }

  ngAfterViewInit() {
    this.service.init();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.sectionsSubscription?.unsubscribe();
  }

  private getExtraPage({
    formStepperTitle: title,
    formStepperIcon: icon,
    formStepperPath: path,
    template,
  }: FormStepperOnboardingDirective | FormStepperSummaryDirective): FormStepperExtraPage {
    return { title, icon, path, template };
  }

  private updateSections() {
    this.service.resetIndexes();
    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.service.refreshCurrentStep();
  }
}
