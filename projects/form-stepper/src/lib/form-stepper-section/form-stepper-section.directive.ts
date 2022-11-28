import { Subscription } from 'rxjs';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';
import { getUniqueId } from '../form-stepper.utils';

@Directive({
  standalone: true,
  selector: '[formStepperSection]',
})
export class FormStepperSectionDirective implements AfterContentInit, OnDestroy {
  readonly id = getUniqueId();

  /**
   * The `AbstractControl` of the section (tracks the validity state of the section).
   */
  @Input() formStepperSection!: AbstractControl | string;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroupName!: string;

  /** The value of `formStepperSection` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formArrayName!: string;

  private _fsTitle!: string;

  /**
   * The title of the section.
   */
  @Input() set fsTitle(title: string) {
    this._fsTitle = title;
    this.service.updateSectionTitle(this.id, this._fsTitle);
  }

  get fsTitle(): string {
    return this._fsTitle;
  }

  /**
   * The icon template of the section to use in the the "nav" and the "quicknav".
   */
  @Input() fsIcon!: TemplateRef<any>;

  /**
   * Determines wheter to exclude the section from the "quicknav".
   *
   * It is usefull if the "quicknav" itself is dispayed in one of the steps (and not in the summary directive).
   */
  @Input() fsNoQuicknav: BooleanInput = false;

  /**
   * Determines whether to hide the steps in the "nav" for this section.
   */
  @Input() fsNoStepsNav?: BooleanInput;

  @ContentChildren(FormStepperStepDirective) stepDirectiveQueryList!: QueryList<FormStepperStepDirective>;

  getSection = (): AbstractControl | string =>
    this.formStepperSection || this.formGroup || this.formGroupName || this.formArrayName;

  getNoQuicknav = (): boolean => coerceBooleanProperty(this.fsNoQuicknav);

  getNoStepsNav = (): boolean | undefined => {
    if (this.fsNoStepsNav !== undefined) {
      return coerceBooleanProperty(this.fsNoStepsNav);
    }
    return undefined;
  };

  private stepsSubscription!: Subscription;

  constructor(private service: FormStepperService) {}

  register() {
    const { sectionIndex, stepIndexOffset } = this.service.getNewIndexes();
    const steps = this.getSteps(sectionIndex, stepIndexOffset);

    this.service.addSteps(steps);

    this.service.addNavSection({
      id: this.id,
      title: this.fsTitle,
      icon: this.fsIcon,
      control: this.service.getControl(this.getSection()),
      stepIndexOffset,
      steps,
      hasQuicknav: !this.getNoQuicknav(),
      noStepsNav: this.getNoStepsNav(),
    });
  }

  ngAfterContentInit() {
    this.stepsSubscription = this.stepDirectiveQueryList.changes.subscribe(() => this.updateSteps());
  }

  ngOnDestroy() {
    this.stepsSubscription?.unsubscribe();
  }

  private updateSteps() {
    const { sectionIndex, stepIndexOffset } = this.service.findExistingIndexes(this.id);
    const newSteps = this.getSteps(sectionIndex, stepIndexOffset);
    this.service.replaceSteps(sectionIndex, newSteps);
    this.service.refreshCurrentStep();
  }

  private getSteps(sectionIndex: number, stepIndexOffset: number) {
    return this.stepDirectiveQueryList.map(
      ({ id, fsTitle, fsPath, getAutoNextOnValueChange, getStep, template }, relativeStepIndex) => {
        const step: FormStepperStep = {
          id,
          title: fsTitle || this.fsTitle,
          path: fsPath,
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
}
