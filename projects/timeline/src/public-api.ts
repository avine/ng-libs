export * from './lib/timeline-container.component';
export * from './lib/timeline-icon.directive';
export * from './lib/timeline-item.component';
export * from './lib/timeline.config';
export * from './lib/timeline.token';
export * from './lib/timeline.types';

import { TimelineContainerComponent } from './lib/timeline-container.component';
import { TimelineIconDirective } from './lib/timeline-icon.directive';
import { TimelineItemComponent } from './lib/timeline-item.component';

export const TIMELINE_DIRECTIVES = [TimelineContainerComponent, TimelineIconDirective, TimelineItemComponent] as const;
