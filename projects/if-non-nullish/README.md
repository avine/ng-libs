# IfNonNullish

Nullish coalescing operator (`??`) as Angular structural directive (and more...).

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
  template: ` <div *ifNonNullish="data$ | async as value">{{ value }}</div> `,
})
export class AppComponent {
  data$: Observable<null | false> = interval(1000).pipe(
    map((i) => i % 2 ? null : false)
  );
}
```

Unlike `ngIf` directive, falsy values like `false`, `""` or `0` are rendered.
Only nullish values like `null` or `undefined` are not rendered.

## Usage

### With value

Render value using "as" syntax or "implicit" syntax.

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

### With default value

Use `default:` input to provide a default value when data is nullish.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div *ifNonNullish="data as value; default: defaultValue">{{ value }}</div> `,
})
export class AppComponent {
  data = undefined;
  defaultValue = 'Default';
}
```

### With fallback template

Use `fallback:` input to provide a `templateRef` when data and default values are nullish.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div *ifNonNullish="data as value; fallback: fallbackTemplate">{{ value }}</div>
    <ng-template #fallbackTemplate><i>Fallback</i></ng-template>
  `,
})
export class AppComponent {
  data = undefined;
}
```
