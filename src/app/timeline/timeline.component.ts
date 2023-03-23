import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimelineLineSize, TIMELINE_DIRECTIVES } from '@avine/ng-timeline';

import { demoProp, DemoStateComponent } from '../shared/demo-state';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgIf, DemoStateComponent, TIMELINE_DIRECTIVES],
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  demoState = {
    pendingFromIndex: demoProp([undefined, 0, 1, 2]),
    bulletPoints: demoProp([false, true]),
    lineSize: demoProp<TimelineLineSize>([{}, { horizontal: 15, vertical: 3 }]),
    reverse: demoProp([false, true]),
    vertical: demoProp([false, true]),
    verticalContentSize: demoProp([undefined, 20]),
    breakpoint: demoProp([false, true, '768px']),
    fontSize: demoProp([undefined, '1.5rem', '2rem']),
  };

  items = [
    'Lorem ipsum dolor sit amet',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit',
  ];

  updateHtml = false;
}
