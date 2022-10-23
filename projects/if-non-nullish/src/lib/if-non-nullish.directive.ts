import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfNonNullishContext, IfNullish } from './if-non-nullish.types';

@Directive({
  selector: '[ifNonNullish]',
})
export class IfNonNullishDirective<T = unknown> {
  @Input()
  set ifNonNullish(data: T) {
    this.hasNoData = this.isNullish(data);
    this.updateView(data ?? this.default);
  }

  // NOTE:
  // Ideally, this function signature should have been `data: T` and not `data: any`.
  // But if we do so, TypeScript is not able to determine the actual value of `T`
  // when `default: ` is not provided in the template:
  // Here's a code example:
  //
  // @Component({
  //   template: `
  //     <!-- When default input is defined, value has the expected type (string or number in this example) -->
  //     <ng-container *ifNonNullish="data as value; default: defaultValue">{{ value }}</ng-container>
  //
  //     <!-- But when default input is not defined, value becomes of type any -->
  //     <ng-container *ifNonNullish="data as value">{{ value }}</ng-container>
  //   `
  // })
  // class AppComponent {
  //   data!: null | string;
  //   defaultValue!: null | string | number; // Note that `defaultValue` type extends the `data` type
  // }
  @Input()
  set ifNonNullishDefault(data: any) {
    this.default = data;
    if (this.hasNoData) {
      this.updateView(this.default);
    }
  }

  @Input()
  set ifNonNullishFallback(fallbackTemplate: TemplateRef<any> | IfNullish) {
    this.fallbackTemplate = fallbackTemplate ?? null;
    if (this.hasNoData && this.isNullish(this.default)) {
      this.createFallbackView();
    }
  }

  private context!: IfNonNullishContext<T>;

  private hasNoData = true;

  private default!: T;

  private fallbackTemplate: TemplateRef<any> | null = null;

  private viewState: 'regular' | 'fallback' | 'clear' = 'clear';

  /**
   * Assert the correct type of the expression bound to the `ifNonNullish` input within the template.
   *
   * @see https://angular.io/guide/structural-directives#improving-template-type-checking-for-custom-directives
   */
  static ngTemplateGuard_ifNonNullish<T>(_directive: IfNonNullishDirective<T>, data: T): data is Exclude<T, IfNullish> {
    return true;
  }

  /**
   * Asserts the correct type of the context for the template that `IfNonNullish` will render.
   *
   * @see https://angular.io/guide/structural-directives#improving-template-type-checking-for-custom-directives
   */
  static ngTemplateContextGuard<T>(
    _directive: IfNonNullishDirective<T>,
    context: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): context is IfNonNullishContext<Exclude<T, IfNullish>> {
    return true;
  }

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<IfNonNullishContext<T>>) {}

  private updateView(data: T) {
    if (!this.isNullish(data)) {
      this.switchToRegularView(data);
    } else {
      this.switchToFallbackView();
    }
  }

  private switchToRegularView(data: T) {
    this.upsertContext(data);
    if (this.viewState === 'regular') {
      return;
    }
    this.createRegularView();
  }

  private switchToFallbackView() {
    if (this.viewState === 'fallback') {
      return;
    }
    this.createFallbackView();
  }

  private upsertContext(data: T) {
    if (this.context) {
      this.context.$implicit = this.context.ifNonNullish = data;
    } else {
      this.context = { $implicit: data, ifNonNullish: data };
    }
  }

  private createRegularView() {
    this.clearView();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    this.viewState = 'regular';
  }

  private createFallbackView() {
    this.clearView();
    if (!this.fallbackTemplate) {
      return;
    }
    this.viewContainerRef.createEmbeddedView(this.fallbackTemplate);
    this.viewState = 'fallback';
  }

  private clearView() {
    if (this.viewState === 'clear') {
      return;
    }
    this.viewContainerRef.clear();
    this.viewState = 'clear';
  }

  private isNullish(data: T): boolean {
    return data === null || data === undefined;
  }
}
