import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormStepperMain } from '@avine/ng-form-stepper';

@Component({
  selector: 'app-custom-main',
  templateUrl: './custom-main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMainComponent {
  @Input() main!: FormStepperMain;

  @Input() isFormGroupValid!: boolean;

  @Input() submitInProgress!: boolean;
}
