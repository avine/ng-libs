# IfNonNullish

Nullish coalescing operator as Angular structural directive and more...

## Installation

Import `IfNonNullishModule` in your `app.module.ts`:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IfNonNullishModule } from '@avine/ng-if-non-nullish';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IfNonNullishModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Use `ifNonNullish` directive in your `app.component.ts`:

```ts
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ifNonNullish="data$ | async as value">{{ value }}</div>
  `,
})
export class AppComponent {
  data$: Observable<false | null> = interval(1000).pipe(
    map((i) => i % 2 ? false : null)
  );
}
```

Unlike `ngIf` directive, falsy values like `false`, `""` or `0` are rendered.
Only nullish values like `null` or `undefined` are not rendered.

So, in the example above, `false` will be rendered while `null` will not.

## Usage

### Rendering data

Render data using "as" syntax or "implicit" syntax.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ifNonNullish="data as value">{{ value }}</div>
    <div *ifNonNullish="data; let value">{{ value }}</div>
  `,
})
export class AppComponent {
  data = 'Data';
}
```

### Rendering default value

Use `default:` input to provide a default value when data is nullish.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ifNonNullish="data as value; default: defaultValue">
      {{ value }}
    </div>
  `,
})
export class AppComponent {
  data = undefined;
  defaultValue = 'Default';
}
```

### Rendering fallback template

Use `fallback:` input to provide a `templateRef` when data and default value are nullish.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ifNonNullish="data as value; fallback: fallbackTemplate">
      {{ value }}
    </div>
    <ng-template #fallbackTemplate>
      <i>Fallback</i>
    </ng-template>
  `,
})
export class AppComponent {
  data = undefined;
}
```

## Demo

Check out [demo here](https://avine.github.io/ng-libs/if-non-nullish).

## License

[MIT](https://github.com/avine/ng-libs/blob/main/LICENSE)
