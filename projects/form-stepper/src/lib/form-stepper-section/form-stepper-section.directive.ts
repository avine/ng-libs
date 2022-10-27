import { Subscription } from 'rxjs';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepDirective } from '../form-stepper-step/form-stepper-step.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperStep } from '../form-stepper.types';
import { getUniqueId } from '../form-stepper.utils';
import { FormStepperSectionOptions } from './form-stepper-section.types';

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

  /**
   * Configure section options.
   *
   * When defined, `fsTitle`, `fsIcon` and `fsNoQuicknav` inputs are ignored.
   */
  @Input() fsOptions?: FormStepperSectionOptions;

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

  getTitle = (): string => this.fsOptions?.title ?? this.fsTitle;

  getIcon = (): TemplateRef<any> => this.fsOptions?.icon ?? this.fsIcon;

  getNoQuicknav = (): boolean => this.fsOptions?.noQuicknav ?? coerceBooleanProperty(this.fsNoQuicknav);

  getNoStepsNav = (): boolean | undefined => {
    if (this.fsOptions?.noStepsNav !== undefined) {
      return this.fsOptions.noStepsNav;
    }
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
      title: this.getTitle(),
      icon: this.getIcon(),
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
      ({ id, getTitle, getPath, getAutoNextOnValueChange, getStep, template }, relativeStepIndex) => {
        const step: FormStepperStep = {
          id,
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
}
