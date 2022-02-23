import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

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

  sectionTitle$ = this.service.sectionTitle$;

  stepTemplate$ = this.service.stepTemplate$;

  translations = this.service.translations;

  constructor(private service: FormStepperService) {}
}
