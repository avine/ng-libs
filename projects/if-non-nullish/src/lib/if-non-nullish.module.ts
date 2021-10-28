import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfNonNullishDirective } from './if-non-nullish.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfNonNullishDirective],
  exports: [IfNonNullishDirective],
})
export class IfNonNullishModule {}
