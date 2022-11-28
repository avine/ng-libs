import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { HistoryService } from './shared/history/history.service';

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
export class AppComponent {
  constructor(historyService: HistoryService) {
    historyService.init(2);
    historyService.history$.subscribe(console.log);
    historyService.navigation$.subscribe(console.log);
  }
}
