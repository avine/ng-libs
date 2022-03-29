import { Subscription } from 'rxjs';

import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterContentInit, OnDestroy {
  @Input() formStepperSection!: AbstractControl | string;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroupName!: string;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formArrayName!: string;

  @Input() formStepperTitle!: string;

  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperNoQuicknav!: boolean;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  getSection = (): AbstractControl | string =>
    this.formStepperSection || this.formGroup || this.formGroupName || this.formArrayName;

  private stepsSubscription!: Subscription;

  constructor(private service: FormStepperService) {}

  register() {
    const { sectionIndex, stepIndexOffset } = this.service.getNewIndexes();
    const steps = this.getSteps(sectionIndex, stepIndexOffset);

    this.service.addSteps(steps);

    this.service.addNavSection({
      title: this.formStepperTitle,
      icon: this.formStepperIcon,
      control: this.service.getControl(this.getSection()),
      stepIndexOffset,
      steps,
      hasQuicknav: !this.formStepperNoQuicknav,
    });
  }

  ngAfterContentInit() {
    this.stepsSubscription = this.stepDirectiveQueryList.changes.subscribe(() => this.updateSteps());
  }

  ngOnDestroy() {
    this.stepsSubscription?.unsubscribe();
  }

  private updateSteps() {
    const { sectionIndex, stepIndexOffset } = this.service.findExistingIndexes(
      this.service.getControl(this.getSection())
    );
    const newSteps = this.getSteps(sectionIndex, stepIndexOffset);
    this.service.replaceSteps(sectionIndex, newSteps);
    this.service.refreshCurrentStep();
  }

  private getSteps(sectionIndex: number, stepIndexOffset: number) {
    return this.stepDirectiveQueryList.map(
      ({ formStepperTitle, formStepperPath, getStep, template }, relativeStepIndex) => {
        const step: FormStepperStep = {
          title: formStepperTitle || this.formStepperTitle,
          path: formStepperPath,
          control: this.service.getControl(this.getSection(), getStep()),
          template,
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
