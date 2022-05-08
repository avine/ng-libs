import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormStepperModule as FormStepperLibModule } from '@avine/ng-form-stepper';

import { ViewCodeModule } from '../shared/view-code/view-code.module';
import { MaterialModule } from './material/material.module';
import { DemoComponent } from './demo/demo.component';
import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { OneLevelComponent } from './one-level/one-level.component';

const materialModules = [MatIconModule];

@NgModule({
  imports: [
    CommonModule,
    FormStepperRoutingModule,
    ReactiveFormsModule,
    materialModules,
    ViewCodeModule,
    FormStepperLibModule.config({ breakpoint: '960px' }),
    MaterialModule,
  ],
  declarations: [DemoComponent, OneLevelComponent],
})
export class FormStepperModule {}
