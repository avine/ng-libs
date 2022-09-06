import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-view-code',
  template: '<a class="link link--external" [href]="linkHref" target="_blank">view source code</a>',
  styles: [
    `
      :host {
        display: block;
        margin-top: 36px;
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCodeComponent {
  @Input() linkHref!: string;
}
