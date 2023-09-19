import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IfNonNullishDirective } from '@avine/ng-if-non-nullish';

import { ViewSourceComponent } from '../shared/view-source/view-source.component';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgTemplateOutlet, IfNonNullishDirective, MatSlideToggleModule, ViewSourceComponent],
  selector: 'app-if-non-nullish',
  templateUrl: './if-non-nullish.component.html',
  styleUrls: ['./if-non-nullish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfNonNullishComponent {
  @ViewChild('fallbackTemplateA') fallbackTemplateA!: TemplateRef<unknown>;
  @ViewChild('fallbackTemplateB') fallbackTemplateB!: TemplateRef<unknown>;

  private interval$ = interval(1000);

  private hasData = false;

  private hasFallbackTemplate = false;

  data$: Observable<boolean | number | null> = this.interval$.pipe(
    map((i) => (i % 2 ? true : false)),
    map((data) => (this.hasData ? data : null)),
    distinctUntilChanged(),
  );

  fallbackTemplate$: Observable<TemplateRef<unknown> | null> = this.interval$.pipe(
    map((i) => (i % 2 ? this.fallbackTemplateA : this.fallbackTemplateB)),
    map((data) => (this.hasFallbackTemplate ? data : null)),
    distinctUntilChanged(),
  );

  useData(value: boolean) {
    this.hasData = value;
  }

  useFallbackTemplate(value: boolean) {
    this.hasFallbackTemplate = value;
  }
}
