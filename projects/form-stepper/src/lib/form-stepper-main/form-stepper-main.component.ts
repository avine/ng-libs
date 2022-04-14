import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

/**
 * Render the current step and the "previous" and "next" (or "submit") buttons.
 */
@Component({
  selector: 'form-stepper-main',
  templateUrl: './form-stepper-main.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperMainComponent implements OnInit {
  @HostBinding('class.form-stepper-main') hasClass = true;

  /**
   * Determines whether navigation to the previous step is triggered by a `<button>` or a `<a>`.
   */
  @Input() formStepperUsePrevAnchor = true;

  /**
   * Determines whether the submit button in the last step is disabled
   * (should be set to `true` while the form is being submitted).
   */
  @Input() formStepperDisabled!: boolean;

  main$ = this.service.main$;

  config = this.service.config;

  isFormInvalid$!: Observable<boolean>;

  constructor(private service: FormStepperService) {}

  ngOnInit() {
    this.isFormInvalid$ = this.service.formGroupRoot.statusChanges.pipe(
      map((status) => status !== 'VALID'),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }
}
