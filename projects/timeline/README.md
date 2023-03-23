# Timeline

The timeline displays a list of events in chronological order.

## Demo

Check out [demo here](https://avine.github.io/ng-libs/timeline).

## Usage

```ts
import { Component } from '@angular/core';
import { TIMELINE_DIRECTIVES } from '@avine/ng-timeline';

@Component({
  selector: 'app-timeline-demo',
  standalone: true,
  imports: [TIMELINE_DIRECTIVES],
  templateUrl: './timeline.component.html',
})
export class TimelineDemoComponent {
  items = ['Step 1', 'Step 2', 'Step 3'];
}
```

```html
<!-- Using items input -->
<timeline-container [items]="items" />

<!-- Using timeline-item components  -->
<timeline-container>
  <timeline-item>Step 1</timeline-item>

  <timeline-item>Step 2</timeline-item>

  <timeline-item>
    <ng-template timelineIcon>
      <!-- your SVG image comes here -->
    </ng-template>

    Step 3
  </timeline-item>
</timeline-container>
```

## API

| Input               | Type                      | Default   | Description                                                      |
| ------------------- | ------------------------- | --------- | ---------------------------------------------------------------- |
| items               | string[]                  | []        | Display the item as pending                                      |
| pendingFromIndex    | NumberInput               | undefined | Display the item as pending                                      |
| bulletPoints        | BooleanInput              | false     | Display bullet points instead of bullet content                  |
| lineSize            | TimelineLineSize          | {}        | Determines the size of the line between bullets                  |
| reverse             | BooleanInput              | false     | Reverse the bullet and content positions                         |
| vertical            | BooleanInput              | false     | Display timeline in horizontal of vertical direction             |
| verticalContentSize | NumberInput               | false     | Limit the content size when the timeline is vertical             |
| breakpoint          | string \| boolean \| null | false     | Switch between vertical and horizontal according to a breakpoint |

### Sass customization

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

  $timeline-vertical-content-size: auto !default
);
```

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
