import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-nav',
  templateUrl: './form-stepper-nav.component.html',
  styleUrls: ['./form-stepper-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperNavComponent {
  constructor(private service: FormStepperService) {}
}
