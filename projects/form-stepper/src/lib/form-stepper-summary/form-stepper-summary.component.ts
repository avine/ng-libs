import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-summary',
  templateUrl: './form-stepper-summary.component.html',
  styleUrls: ['./form-stepper-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperSummaryComponent {
  state$ = this.service.state$;

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}
}
