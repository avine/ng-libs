import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';

import { TimelineIconDirective } from './timeline-icon.directive';

@Component({
  selector: 'timeline-item',
  standalone: true,
  template: '<ng-template><div><ng-content></ng-content></div></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineItemComponent {
  @ViewChild(TemplateRef, { static: true }) contentTemplate!: TemplateRef<void>;

  @ContentChild(TimelineIconDirective, { static: true, descendants: true }) iconDirective?: TimelineIconDirective;

  get iconTemplate(): TemplateRef<void> | undefined {
    return this.iconDirective?.template;
  }
}
