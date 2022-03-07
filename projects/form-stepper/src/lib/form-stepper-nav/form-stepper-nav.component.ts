import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { navAnimations } from './form-stepper-nav.animations';

@Component({
  selector: 'form-stepper-nav',
  templateUrl: './form-stepper-nav.component.html',
  styleUrls: ['./form-stepper-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: navAnimations,
})
export class FormStepperNavComponent {
  @HostBinding('class.form-stepper-nav') hasClass = true;

  state$ = this.service.state$;

  constructor(private service: FormStepperService) {}

  navigateByStepIndex(event: Event, stepIndex: number) {
    event.stopPropagation();
    this.service.navigateByStepIndex(stepIndex);
  }
}
