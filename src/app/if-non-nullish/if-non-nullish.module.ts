import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IfNonNullishModule as IfNonNullishLibModule } from '@avine/ng-if-non-nullish';

import { ViewCodeModule } from '../shared/view-code/view-code.module';
import { IfNonNullishRoutingModule } from './if-non-nullish-routing.module';
import { IfNonNullishComponent } from './if-non-nullish.component';

const materialModules = [MatSlideToggleModule];

@NgModule({
  imports: [CommonModule, IfNonNullishRoutingModule, IfNonNullishLibModule, materialModules, ViewCodeModule],
  declarations: [IfNonNullishComponent],
})
export class IfNonNullishModule {}
