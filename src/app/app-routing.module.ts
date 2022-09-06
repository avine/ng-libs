import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'if-non-nullish',
    loadComponent: () => import('./if-non-nullish/if-non-nullish.component').then((m) => m.IfNonNullishComponent),
    title: 'If non nullish',
  },
  {
    path: 'form-stepper',
    loadChildren: () => import('./form-stepper/form-stepper.module').then((m) => m.FormStepperModule),
    title: 'Form Stepper',
  },
  {
    path: 'autocomplete',
    loadChildren: () => import('./autocomplete/autocomplete.routes').then((m) => m.AUTOCOMPLETE_ROUTES),
    title: 'Autocomplete',
  },
];

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.title.setTitle('ng-libs' + (title ? ` - ${title}` : ''));
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: TitleStrategy, useClass: AppTitleStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
