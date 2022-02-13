import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, QueryList } from '@angular/core';

import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperService } from './form-stepper.service';

@Component({
  selector: 'form-stepper',
  templateUrl: 'form-stepper.component.html',
  styleUrls: ['form-stepper.component.scss'],
  providers: [FormStepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperComponent implements AfterViewInit {
  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    console.log(this.sectionDirectiveQueryList);
  }
}
