import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IfNonNullishDirective } from '@avine/ng-if-non-nullish';

import { ViewCodeComponent } from '../shared/view-code/view-code.component';

@Component({
  standalone: true,
  imports: [CommonModule, IfNonNullishDirective, MatSlideToggleModule, ViewCodeComponent],
  selector: 'app-if-non-nullish',
  templateUrl: './if-non-nullish.component.html',
  styleUrls: ['./if-non-nullish.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IfNonNullishComponent {
  @ViewChild('fallbackTemplateA') fallbackTemplateA!: TemplateRef<any>;
  @ViewChild('fallbackTemplateB') fallbackTemplateB!: TemplateRef<any>;

  private interval$ = interval(1000);

  private hasData = false;

  private hasDefaultValue = false;

  private hasFallbackTemplate = false;

  data$: Observable<boolean | number | null> = this.interval$.pipe(
    map((i) => (i % 2 ? true : false)),
    map((data) => (this.hasData ? data : null)),
    distinctUntilChanged()
  );

  defaultValue$: Observable<boolean | number | null> = this.interval$.pipe(
    map((i) => i % 2),
    map((data) => (this.hasDefaultValue ? data : null)),
    distinctUntilChanged()
  );

  fallbackTemplate$: Observable<TemplateRef<any> | null> = this.interval$.pipe(
    map((i) => (i % 2 ? this.fallbackTemplateA : this.fallbackTemplateB)),
    map((data) => (this.hasFallbackTemplate ? data : null)),
    distinctUntilChanged()
  );

  useData(value: boolean) {
    this.hasData = value;
  }

  useDefaultValue(value: boolean) {
    this.hasDefaultValue = value;
  }

  useFallbackTemplate(value: boolean) {
    this.hasFallbackTemplate = value;
  }
}
