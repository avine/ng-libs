import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-if-non-nullish',
  templateUrl: './if-non-nullish.component.html',
  styleUrls: ['./if-non-nullish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfNonNullishComponent {
  data$ = interval(1000);

  data2$ = interval(1000).pipe(map((n) => !!(n % 2)));

  data3$: Observable<boolean | null> = interval(1000).pipe(map((n) => (n % 2 ? false : null)));

  choupi: string | null | undefined = 'choupi';

  default = true;
}
