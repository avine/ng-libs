import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconAlias, IconsMap } from './form-stepper-icon.types';

@Component({
  selector: 'form-stepper-icon',
  templateUrl: './form-stepper-icon.component.html',
  styleUrls: ['./form-stepper-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperIconComponent {
  @Input() icon!: IconAlias;

  // Copyright Font Awesome Free
  iconsMap: IconsMap = {
    invalid: {
      // pen
      viewBox: '0 0 512 512',
      d: 'M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z',
    },
    valid: {
      // check
      viewBox: '0 0 512 512',
      d: 'M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z',
    },
  };
}
