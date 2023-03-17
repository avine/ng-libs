import { ClassProvider, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'autocomplete',
    loadChildren: () => import('./autocomplete/autocomplete.routes').then((m) => m.AUTOCOMPLETE_ROUTES),
    title: 'Autocomplete',
  },
  {
    path: 'form-stepper',
    loadChildren: () => import('./form-stepper/form-stepper.routes').then((m) => m.FORM_STEPPER_ROUTES),
    title: 'Form Stepper',
  },
  {
    path: 'if-non-nullish',
    loadComponent: () => import('./if-non-nullish/if-non-nullish.component').then((m) => m.IfNonNullishComponent),
    title: 'If non nullish',
  },
  {
    path: 'timeline',
    loadComponent: () => import('./timeline/timeline.component').then((m) => m.TimelineComponent),
    title: 'Timeline',
  },
  {
    path: 'rx-data-store',
    loadChildren: () => import('./rx-data-store/rx-data-store.routes').then((m) => m.RX_DATA_STORE_ROUTES),
    title: 'Reactive data store',
  },
  {
    path: '**',
    redirectTo: '/',
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

export const APP_TITLE_STRATEGY: ClassProvider = { provide: TitleStrategy, useClass: AppTitleStrategy };
