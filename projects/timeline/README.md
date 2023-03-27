# Timeline

Angular component that displays a list of events in chronological order.

## Demo

Check out [demo here](https://avine.github.io/ng-libs/timeline).

## Usage

### Component

```ts
import { Component } from '@angular/core';
import { TIMELINE_DIRECTIVES, provideTimelineBreakpoint } from '@avine/ng-timeline';

@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  imports: [TIMELINE_DIRECTIVES],
  providers: [provideTimelineBreakpoint('1280px')], // This is optional
  templateUrl: './timeline.component.html',
})
export class TimelineDemoComponent {
  items = ['Step 1', 'Step 2', 'Step 3'];
}
```

### Template

```html
<!-- Using items input -->
<timeline-container [items]="items" />

<!-- Using timeline-item components  -->
<timeline-container>
  <timeline-item>Step 1</timeline-item>

  <timeline-item>Step 2</timeline-item>

  <timeline-item>
    <ng-template timelineIcon>
      <!-- your SVG icon comes here -->
    </ng-template>

    Step 3
  </timeline-item>
</timeline-container>
```

## API

The different sizes should be entered as numbers (you should not specify units such as `em` or `rem`).

These sizes will be treated as `em` relative to the font-size of the root element of the timeline.

| Input               | Type                      | Default   | Description                                                            |
| ------------------- | ------------------------- | --------- | ---------------------------------------------------------------------- |
| items               | string[]                  | []        | The list of items to display.                                          |
| pendingFromIndex    | NumberInput               | undefined | Display the items as pending from the specified index.                 |
| bgColor             | string \| undefined       | undefined | Indicates the background color of the timeline.                        |
| lineSize            | TimelineLineSize          | {}        | Determines the size of the line between bullets.                       |
| bulletPoints        | BooleanInput              | false     | Display bullet points instead of bullet content.                       |
| reverse             | BooleanInput              | false     | Reverse the bullet and content positions.                              |
| vertical            | BooleanInput              | false     | Display timeline in horizontal or vertical direction.                  |
| verticalContentSize | NumberInput               | false     | Limit the size (width) of the content when the timeline is vertical.   |
| breakpoint          | string \| boolean \| null | false     | Switch between vertical and horizontal timeline based on a breakpoint. |

### TimelineLineSize

Determines the size of the line between bullets.

```ts
interface TimelineLineSize {
  horizontal?: number;
  vertical?: number;
}
```

### Breakpoint

Switch between vertical and horizontal timeline based on a breakpoint.

If `breakpoint` is set to `true` then the default value is used (`1024px`).

You can provide a different default value using the `provideTimelineBreakpoint` function:

```ts
import { provideTimelineBreakpoint } from '@avine/ng-timeline';

@Component({
  providers: [provideTimelineBreakpoint('1280px')],
})
export class TimelineDemoComponent {}
```

Or by providing the `TIMELINE_BREAKPOINT` injection token:

```ts
import { TIMELINE_BREAKPOINT } from '@avine/ng-timeline';

@Component({
  providers: [{ provide: TIMELINE_BREAKPOINT, useValue: '1280px' }],
})
export class TimelineDemoComponent {}
```

## Sass customization

You can fully customize the Timeline CSS using Sass.

Below the [list of Sass variables](https://github.com/avine/ng-libs/blob/main/projects/timeline/src/lib/scss/_variables.scss):

```scss
@use 'node_modules/@avine/ng-timeline/src/lib/scss/timeline.scss' with (
  $timeline-background-color: #fff,

  $timeline-line-thickness: 3px,
  $timeline-line-color: #ced4da,

  $timeline-line-size-horizontal: 10,
  $timeline-line-size-vertical: 2,

  $timeline-bullet-font-size: 1.5,
  $timeline-bullet-outline-size: 0.5,
  $timeline-bullet-border-size: 2px,
  $timeline-bullet-size: 3,

  $timeline-bullet-border-color: #6ea8fe,
  $timeline-bullet-background-color: #0d6efd,
  $timeline-bullet-color: #fff,

  $timeline-pending-bullet-scale: 0.875,
  $timeline-pending-bullet-border-color: #dee2e6,
  $timeline-pending-bullet-background-color: #adb5bd,
  $timeline-pending-bullet-color: #e9ecef,
  $timeline-pending-content-color: #999,

  $timeline-vertical-content-size: auto
);
```

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
