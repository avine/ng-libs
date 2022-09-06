import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormStepperModule } from '@avine/ng-form-stepper';

import { ViewCodeComponent } from '../../shared/view-code/view-code.component';
import { MaterialComponent } from './material.component';

const materialModules = [MatButtonModule, MatCheckboxModule, MatInputModule] as const;

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...materialModules, ViewCodeComponent, FormStepperModule],
  declarations: [MaterialComponent],
  exports: [MaterialComponent],
})
export class MaterialModule {}
