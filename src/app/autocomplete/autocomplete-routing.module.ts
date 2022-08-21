import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo/demo.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { TemplateFormComponent } from './template-form/template-form.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
  },
  {
    path: 'template-form',
    component: TemplateFormComponent,
  },
  {
    path: 'standalone',
    component: StandaloneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutocompleteRoutingModule {}
