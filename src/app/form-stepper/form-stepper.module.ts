import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStepperModule as FormStepperLibModule } from '@avine/ng-form-stepper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CustomMainComponent } from './custom/custom-main/custom-main.component';
import { CustomComponent } from './custom/custom.component';
import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { OneLevelBisComponent } from './one-level-bis/one-level-bis.component';
import { OneLevelComponent } from './one-level/one-level.component';
import { SimpleComponent } from './simple/simple.component';
import { TwoLevelsComponent } from './two-levels/two-levels.component';
import { Demo1Component } from './demo1/demo1.component';

@NgModule({
  imports: [
    CommonModule,
    FormStepperRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormStepperLibModule.forRoot({
      translations: {
        prev: 'Précédent',
        next: 'Suivant',
        submit: 'Valider',
        yes: 'Oui',
        no: 'Non',
      },
      css: {
        sectionTitle: 'custom-section-title',
        prev: 'custom-prev',
        next: 'custom-next',
        submit: 'custom-submit',
      },
    }),
  ],
  declarations: [
    CustomMainComponent,
    CustomComponent,
    OneLevelBisComponent,
    OneLevelComponent,
    SimpleComponent,
    TwoLevelsComponent,
    Demo1Component,
  ],
})
export class FormStepperModule {}
