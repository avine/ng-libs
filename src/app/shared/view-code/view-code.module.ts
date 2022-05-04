import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ViewCodeComponent } from './view-code.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ViewCodeComponent],
  exports: [ViewCodeComponent],
})
export class ViewCodeModule {}
