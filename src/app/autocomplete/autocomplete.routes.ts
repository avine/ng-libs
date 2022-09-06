import { Routes } from '@angular/router';

import { CascadeComponent } from './cascade/cascade.component';
import { DemoComponent } from './demo/demo.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { TemplateFormComponent } from './template-form/template-form.component';

export const AUTOCOMPLETE_ROUTES: Routes = [
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
  {
    path: 'cascade',
    component: CascadeComponent,
  },
];
