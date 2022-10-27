import { TemplateRef } from '@angular/core';

export interface FormStepperSectionOptions {
  title?: string;
  icon?: TemplateRef<any>;
  noQuicknav?: boolean;
  noStepsNav?: boolean;
}
