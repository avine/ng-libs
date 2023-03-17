import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[timelineIcon]',
  standalone: true,
})
export class TimelineIconDirective {
  template: TemplateRef<void> = inject(TemplateRef);
}
