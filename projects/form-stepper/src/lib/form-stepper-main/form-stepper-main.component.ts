import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-main',
  templateUrl: './form-stepper-main.component.html',
  styleUrls: ['./form-stepper-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperMainComponent {
  sectionTitle$ = this.service.state$.pipe(map((state) => state.nav[state.sectionIndex]?.title));

  stepTemplate$ = this.service.stepTemplate$;

  constructor(private service: FormStepperService) {}
}
