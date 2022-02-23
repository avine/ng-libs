import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-nav',
  templateUrl: './form-stepper-nav.component.html',
  styleUrls: ['./form-stepper-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('smoothHeight', [
      transition('void => *', [style({ height: '0px', paddingTop: '0px', opacity: 0 }), animate('250ms ease-in-out')]),
      transition('* => void', [animate('250ms ease-in-out'), style({ height: '0px', paddingTop: '0px', opacity: 0 })]),
    ]),
  ],
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
