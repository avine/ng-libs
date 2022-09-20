import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-view-source',
  template: `
    <a class="link" [href]="linkHref" target="_blank">
      <img src="../../../assets/code-solid.svg" class="icon" />View Source
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: 48px;
      }

      .link {
        display: inline-flex;
        align-items: center;
        position: relative;
        border-radius: 4px;
        padding: 0.6em 0.9em;
        background-color: #eee;
        text-decoration: none;
        color: #000;

        &:hover {
          //text-decoration: none;
        }
      }

      .icon {
        width: 1.25em;
        margin-right: 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSourceComponent {
  @Input() linkHref!: string;
}
