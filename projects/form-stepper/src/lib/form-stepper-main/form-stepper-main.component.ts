import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-main',
  templateUrl: './form-stepper-main.component.html',
  styleUrls: ['./form-stepper-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperMainComponent {
  sectionTitle$ = this.service.sectionTitle$;

  stepTemplate$ = this.service.stepTemplate$;

  translations = this.service.translations;

  constructor(private service: FormStepperService) {}
}
