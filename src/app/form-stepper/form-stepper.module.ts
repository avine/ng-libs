import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStepperModule as FormStepperLibModule } from '@avine/ng-form-stepper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CustomComponent } from './custom/custom.component';
import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { OneLevelBisComponent } from './one-level-bis/one-level-bis.component';
import { OneLevelComponent } from './one-level/one-level.component';
import { SimpleComponent } from './simple/simple.component';
import { TwoLevelsComponent } from './two-levels/two-levels.component';

@NgModule({
  imports: [
    CommonModule,
    FormStepperRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormStepperLibModule.forRoot({
      prev: 'Précédent',
      next: 'Suivant',
      submit: 'Valider',
      yes: 'Oui',
      no: 'Non',
    }),
  ],
  declarations: [CustomComponent, OneLevelComponent, TwoLevelsComponent, SimpleComponent, OneLevelBisComponent],
})
export class FormStepperModule {}
