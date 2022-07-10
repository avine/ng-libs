import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-code',
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCodeComponent {
  @Input() linkHref!: string;
}
