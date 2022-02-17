import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-quicknav',
  templateUrl: './form-stepper-quicknav.component.html',
  styleUrls: ['./form-stepper-quicknav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperQuicknavComponent {
  state$ = this.service.state$;

  navigateByStepIndex = this.service.navigateByStepIndex.bind(this.service);

  constructor(private service: FormStepperService) {}
}
