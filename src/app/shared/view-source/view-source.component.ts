import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-view-source',
  templateUrl: './view-source.component.html',
  styleUrls: ['./view-source.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSourceComponent {
  @Input() linkHref!: string;
}
