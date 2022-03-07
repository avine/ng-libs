import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { sectionIconAnimations } from './form-stepper-section-icon.animations';

@Component({
  selector: 'form-stepper-section-icon',
  templateUrl: './form-stepper-section-icon.component.html',
  styleUrls: ['./form-stepper-section-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: sectionIconAnimations,
})
export class FormStepperSectionIconComponent {
  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperIsValid!: boolean;

  formStepperValidIcon = this.service.validSectionIcon;

  constructor(private service: FormStepperService) {}
}
