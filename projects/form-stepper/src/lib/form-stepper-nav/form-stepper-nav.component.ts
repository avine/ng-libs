import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-nav',
  templateUrl: './form-stepper-nav.component.html',
  styleUrls: ['./form-stepper-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('smoothHeight', [
      transition('void => *', [style({ height: '0px', paddingTop: '0px', opacity: 0 }), animate('.25s ease-out')]),
      transition('* => void', [animate('.25s ease-in'), style({ height: '0px', paddingTop: '0px', opacity: 0 })]),
    ]),
  ],
})
export class FormStepperNavComponent {
  state$ = this.service.state$;

  constructor(private service: FormStepperService) {}

  navigateByStepIndex(event: Event, stepIndex: number) {
    event.stopPropagation();
    this.service.navigateByStepIndex(stepIndex);
  }
}
