import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  selector: 'app-root',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class AppComponent {}
