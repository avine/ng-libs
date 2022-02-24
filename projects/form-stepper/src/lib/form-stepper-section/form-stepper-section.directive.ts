import { Subscription } from 'rxjs';

import { AfterViewInit, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterViewInit, OnDestroy {
  @Input() formStepperSection!: FormGroup;

  @Input() formStepperTitle!: string;

  @Input() formStepperNoQuicknav!: boolean;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  private stepsSubscription!: Subscription;

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    const sectionIndex = this.service.nav.length;
    const stepIndexOffset = this.service.steps.length;
    const steps = this.getSteps(sectionIndex, stepIndexOffset);

    this.service.addSteps(steps);

    this.service.addNavSection({
      title: this.formStepperTitle,
      control: this.formStepperSection,
      offset: stepIndexOffset,
      steps,
      hasQuicknav: !this.formStepperNoQuicknav,
    });

    this.stepsSubscription = this.stepDirectiveQueryList.changes.subscribe(() => this.updateSteps());
  }

  ngOnDestroy() {
    this.stepsSubscription?.unsubscribe();
  }

  private updateSteps() {
    const sectionIndex = this.service.nav.findIndex((navSection) => navSection.control === this.formStepperSection);
    const stepIndexOffset = this.service.nav[sectionIndex].offset;
    const newSteps = this.getSteps(sectionIndex, stepIndexOffset);
    this.service.replaceSteps(sectionIndex, newSteps);
    this.service.refreshCurrentStep();
  }

  private getSteps(sectionIndex: number, stepIndexOffset: number) {
    return this.stepDirectiveQueryList.map(
      ({ formStepperTitle, formStepperPath, formStepperStep, templateRef }, relativeStepIndex) => {
        const step: FormStepperStep = {
          title: formStepperTitle,
          path: formStepperPath,
          control: formStepperStep,
          templateRef,
          sectionIndex,
          stepIndex: stepIndexOffset + relativeStepIndex,
        };
        if (this.stepDirectiveQueryList.length >= 2) {
          step.sectionProgression = { count: relativeStepIndex + 1, total: this.stepDirectiveQueryList.length };
        }
        return step;
      }
    );
  }
}
