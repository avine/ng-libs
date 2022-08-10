import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocompleteDemoComponent } from './autocomplete-demo.component';

const routes: Routes = [
  {
    path: '',
    component: AutocompleteDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutocompleteDemoRoutingModule {}
