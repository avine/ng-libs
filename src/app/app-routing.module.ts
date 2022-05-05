import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/home/home.module').then((module) => module.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'if-non-nullish',
    loadChildren: () => import('./if-non-nullish/if-non-nullish.module').then((module) => module.IfNonNullishModule),
  },
  {
    path: 'form-stepper',
    loadChildren: () => import('./form-stepper/form-stepper.module').then((module) => module.FormStepperModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
