import { Subscription } from 'rxjs';

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

import { TimelineItemComponent } from './timeline-item.component';
import { TIMELINE_BREAKPOINT_DEFAULT } from './timeline.config';
import { TimelineItem, TimelineLineSize } from './timeline.types';

@Component({
  selector: 'timeline-container',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgTemplateOutlet, LayoutModule],
  templateUrl: './timeline-container.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineContainerComponent implements AfterContentInit, OnDestroy {
  protected _items: TimelineItem[] = [];

  @Input() set items(items: string[]) {
    this._items = items.map((content) => ({ content } as TimelineItem));
  }

  protected _pendingFromIndex?: number;

  @Input() set pendingFromIndex(value: NumberInput) {
    this._pendingFromIndex = coerceNumberProperty(value, null) ?? undefined;
  }

  @Input() reverse: BooleanInput = false;

  @Input() vertical: BooleanInput = false;

  protected _verticalContentSize?: string;

  @Input() set verticalContentSize(value: NumberInput) {
    const number = coerceNumberProperty(value, null);
    this._verticalContentSize = number !== null ? `${number}em` : undefined;
  }

  @Input() lineSize: TimelineLineSize = {};

  @Input() bgColor?: string;

  @HostBinding('class.av-timeline') hasCss = true;

  @HostBinding('class.av-timeline--reverse') get hasReverseCss() {
    return coerceBooleanProperty(this.reverse);
  }

  @HostBinding('class.av-timeline--horizontal') get hasHorizontalCss() {
    return !coerceBooleanProperty(this.vertical);
  }

  @HostBinding('class.av-timeline--vertical') get hasVerticalCss() {
    return coerceBooleanProperty(this.vertical);
  }

  @HostBinding('style.--av-timeline-vertical-content-size') get hasVerticalContentSizeStyle() {
    return this._verticalContentSize;
  }

  @HostBinding('style.--av-timeline-line-size-horizontal') get hasLineSizeHorizontalStyle() {
    return this.lineSize.horizontal;
  }

  @HostBinding('style.--av-timeline-line-size-vertical') get hasLineSizeVerticalStyle() {
    return this.lineSize.vertical;
  }

  @HostBinding('style.--av-timeline-background-color') get hasBgColorStyle() {
    return this.bgColor;
  }

  protected trackByItem(_: number, item: TimelineItem) {
    return item.contentTemplate ?? item.content;
  }

  private itemsQueryListSubscription?: Subscription;

  @ContentChildren(TimelineItemComponent) itemsQueryList!: QueryList<TimelineItemComponent>;

  ngAfterContentInit() {
    // Items from the `QueryList` have priority over those from the `@Input`.
    // Therefore, always subscribe to changes...
    this.itemsQueryListSubscription = this.itemsQueryList?.changes.subscribe(() => this.setItemsFromQueryList());

    // ...but initially, the `QueryList` is taken into account only if it is not empty.
    if (this.itemsQueryList?.length) {
      this.setItemsFromQueryList();
    }
  }

  private setItemsFromQueryList() {
    this._items =
      this.itemsQueryList?.map(({ contentTemplate, iconTemplate }) => ({ contentTemplate, iconTemplate })) ?? [];
    this.changeDetectorRef.markForCheck();
  }

  private breakpointObserver = inject(BreakpointObserver);

  private changeDetectorRef = inject(ChangeDetectorRef);

  private breakpointSubscription?: Subscription;

  /**
   * Enables responsive timeline.
   * On mobile, the timeline automatically switches to "vertical" mode.
   *
   * @example
   * true // use the default breakpoint `TIMELINE_BREAKPOINT_DEFAULT`
   * '768px'
   */
  @Input() set breakpoint(value: string | boolean | null) {
    this.breakpointSubscription?.unsubscribe();
    if (!value) {
      return;
    }
    const minWidth = value === true ? TIMELINE_BREAKPOINT_DEFAULT : value;
    this.breakpointSubscription = this.breakpointObserver
      .observe(`(min-width: ${minWidth})`)
      .subscribe(({ matches: isDesktop }) => {
        this.vertical = !isDesktop;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.itemsQueryListSubscription?.unsubscribe();
    this.breakpointSubscription?.unsubscribe();
  }
}
