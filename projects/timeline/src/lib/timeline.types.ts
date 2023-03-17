import { TemplateRef } from '@angular/core';

export interface TimelineItem {
  content?: string;
  contentTemplate?: TemplateRef<void>;
  iconTemplate?: TemplateRef<void>;
}

export interface TimelineLineSize {
  horizontal?: number;
  vertical?: number;
}
