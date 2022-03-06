import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-main',
  templateUrl: './form-stepper-main.component.html',
  styleUrls: ['./form-stepper-main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperMainComponent {
  @HostBinding('class.form-stepper-main') hasClass = true;

  @Input() isFormValid!: boolean;

  @Input() isBeingSubmitted!: boolean;

  main$ = this.service.main$;

  config = this.service.config;

  constructor(private service: FormStepperService) {}
}
