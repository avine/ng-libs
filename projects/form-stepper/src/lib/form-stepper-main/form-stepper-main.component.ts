import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-main',
  templateUrl: './form-stepper-main.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperMainComponent implements OnInit {
  @HostBinding('class.form-stepper-main') hasClass = true;

  /**
   * Determine whether navigation to the previous step is triggered by a `<button>` or a `<a>`.
   */
  @Input() formStepperUsePrevAnchor = true;

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
