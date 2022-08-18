import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutocompleteDemoComponent } from './autocomplete-demo.component';
import { DemoComponent } from './demo/demo.component';
import { Demo2Component } from './demo2/demo2.component';

const routes: Routes = [
  {
    path: '',
    component: AutocompleteDemoComponent,
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'demo2',
    component: Demo2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutocompleteDemoRoutingModule {}
