import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { IfNonNullishRoutingModule } from './if-non-nullish-routing.module';
import { IfNonNullishComponent } from './if-non-nullish.component';

import { IfNonNullishModule as IfNonNullishLibModule } from '@avine/ng-if-non-nullish';

const materialModules = [MatSlideToggleModule];

@NgModule({
  imports: [CommonModule, IfNonNullishRoutingModule, IfNonNullishLibModule, materialModules],
  declarations: [IfNonNullishComponent],
})
export class IfNonNullishModule {}
