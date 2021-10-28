import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

import { Component } from '@angular/core';

@Component({
  selector: 'app-if-non-nullish',
  templateUrl: './if-non-nullish.component.html',
  styleUrls: ['./if-non-nullish.component.scss'],
})
export class IfNonNullishComponent {
  data$ = interval(1000);

  data2$ = interval(1000).pipe(map((n) => !!(n % 2)));

  choupi: string | null | undefined = 'choupi';
}
