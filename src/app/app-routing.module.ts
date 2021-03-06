import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/home/home.module').then((module) => module.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'if-non-nullish',
    loadChildren: () => import('./if-non-nullish/if-non-nullish.module').then((module) => module.IfNonNullishModule),
    title: 'If non nullish',
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
