import { Subscription } from 'rxjs';

import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';
import { FormStepperSectionConfig, FormStepperSectionControl } from './form-stepper-section.types';

@Directive({
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterContentInit, OnDestroy {
  /**
   * The `AbstractControl` of the section (tracks the validity state of the section).
   *
   * @example
   * // When using the config object signature, `formStepperTitle` and `formStepperIcon` inputs are ignored.
   * interface FormStepperSectionConfig { control?: AbstractControl | string; title?: string; icon?: TemplateRef<any> }
   *
   * // When using the control signature, `formStepperTitle` and `formStepperIcon` inputs can be used to complete the section configuration.
   * type FormStepperSectionControl = string | AbstractControl
   */
  @Input() formStepperSection!: FormStepperSectionConfig | FormStepperSectionControl;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroupName!: string;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formArrayName!: string;

  /**
   * The title of the step.
   */
  @Input() formStepperTitle!: string;

  /**
   * The icon template of the section to use in the the "nav" and the "quicknav".
   */
  @Input() formStepperIcon!: TemplateRef<any>;

  /**
   * Determines wheter to exclude the section from the "quicknav".
   *
   * It is usefull if the "quicknav" itself is dispayed in one of the steps (and not in the summary directive).
   */
  @Input() formStepperNoQuicknav!: boolean;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  getSection = (): AbstractControl | string =>
    this.sectionConfig?.control ||
    (this.formStepperSection as FormStepperSectionControl) ||
    this.formGroup ||
    this.formGroupName ||
    this.formArrayName;

  getTitle = (): string => this.sectionConfig?.title || this.formStepperTitle;

  getIcon = (): TemplateRef<any> => this.sectionConfig?.icon || this.formStepperIcon;

  private stepsSubscription!: Subscription;

  constructor(private service: FormStepperService) {}

  register() {
    const { sectionIndex, stepIndexOffset } = this.service.getNewIndexes();
    const steps = this.getSteps(sectionIndex, stepIndexOffset);

    this.service.addSteps(steps);

    this.service.addNavSection({
      title: this.getTitle(),
      icon: this.getIcon(),
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
      ({ getTitle, getPath, getAutoNextOnValueChange, getStep, template }, relativeStepIndex) => {
        const step: FormStepperStep = {
          title: getTitle() || this.getTitle(),
          path: getPath(),
          autoNextOnValueChange: getAutoNextOnValueChange(),
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

  private get sectionConfig(): FormStepperSectionConfig | void {
    if (this.formStepperSection instanceof AbstractControl || typeof this.formStepperSection === 'string') {
      return;
    }
    return this.formStepperSection;
  }
}
