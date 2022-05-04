import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormStepperModule } from '@avine/ng-form-stepper';
import { ViewCodeModule } from 'src/app/shared/view-code/view-code.module';

import { CustomComponent } from './custom.component';

const materialModules = [MatButtonModule, MatCheckboxModule, MatInputModule];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, materialModules, ViewCodeModule, FormStepperModule.forChild()],
  declarations: [CustomComponent],
  exports: [CustomComponent],
})
export class CustomModule {}
