import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfNonNullishContext, IfNullish } from './if-non-nullish.types';

@Directive({
  selector: '[ifNonNullish]',
})
export class IfNonNullishDirective<T = unknown> {
  @Input()
  set ifNonNullish(data: T) {
    this.hasNoData = this.isNullish(data);
    this.render(data ?? this.default);
  }

  @Input()
  set ifNonNullishDefault(data: T) {
    this.default = data;
    if (this.hasNoData) {
      this.render(this.default);
    }
  }

  @Input()
  set ifNonNullishFallback(fallbackTemplate: TemplateRef<any> | any) {
    if (!(fallbackTemplate instanceof TemplateRef)) {
      return;
    }
    this.fallbackTemplate = fallbackTemplate;
    if (this.hasNoData && this.isNullish(this.default)) {
      this.createFallbackView();
    }
  }

  $implicit!: T;

  private context!: IfNonNullishContext<T>;

  private hasNoData = true;

  private default!: T;

  private fallbackTemplate!: TemplateRef<any>;

  private viewState: 'regular' | 'fallback' | 'clear' = 'clear';

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   *
   * @see https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
   */
  static ngTemplateContextGuard<T>(
    directive: IfNonNullishDirective<T>,
    context: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): context is IfNonNullishContext<Exclude<T, IfNullish>> {
    return true;
  }

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<IfNonNullishContext<T>>) {}

  private render(data: T) {
    if (!this.isNullish(data)) {
      this.renderRegularView(data);
    } else if (this.fallbackTemplate) {
      this.renderFallbackView();
    } else {
      this.clearViewIfNeeded();
    }
  }

  private renderRegularView(data: T) {
    this.upsertContext(data);
    if (this.viewState === 'regular') {
      return;
    }
    this.createRegularView();
  }

  private upsertContext(data: T) {
    this.$implicit = data;
    if (this.context) {
      this.context.$implicit = this.context.ifNonNullish = data;
    } else {
      this.context = { $implicit: data, ifNonNullish: data };
    }
  }

  private createRegularView() {
    this.clearViewIfNeeded();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    this.viewState = 'regular';
  }

  private renderFallbackView() {
    if (this.viewState === 'fallback') {
      return;
    }
    this.createFallbackView();
  }

  private createFallbackView() {
    this.clearViewIfNeeded();
    this.viewContainerRef.createEmbeddedView(this.fallbackTemplate);
    this.viewState = 'fallback';
  }

  private clearViewIfNeeded() {
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
