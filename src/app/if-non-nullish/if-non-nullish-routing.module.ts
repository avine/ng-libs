import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IfNonNullishComponent } from './if-non-nullish.component';

const routes: Routes = [
  {
    path: '',
    component: IfNonNullishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IfNonNullishRoutingModule {}
