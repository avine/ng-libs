import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfNonNullishContext, IfNullish } from './if-non-nullish.types';

@Directive({
  selector: '[ifNonNullish]',
})
export class IfNonNullishDirective<T = string> {
  @Input()
  set ifNonNullish(regularValue: T) {
    this.hasNoRegularValue = this.isNullish(regularValue);
    this.render(regularValue ?? this.defaultValue);
  }

  @Input()
  set ifNonNullishDefault(defaultValue: T) {
    this.defaultValue = defaultValue;
    if (this.hasNoRegularValue) {
      this.render(this.defaultValue);
    }
  }

  @Input()
  set ifNonNullishFallback(fallbackTemplate: TemplateRef<any>) {
    this.fallbackTemplate = fallbackTemplate;
    if (this.hasNoRegularValue && this.isNullish(this.defaultValue)) {
      this.createFallbackView();
    }
  }

  $implicit!: T;

  private context!: IfNonNullishContext<T>;

  private defaultValue!: T;

  private fallbackTemplate!: TemplateRef<any>;

  private hasNoRegularValue = true;

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

  private render(value: T) {
    if (!this.isNullish(value)) {
      this.renderRegularView(value);
    } else if (this.fallbackTemplate) {
      this.renderFallbackView();
    } else {
      this.clearViewIfNeeded();
    }
  }

  private renderRegularView(value: T) {
    this.upsertContext(value);
    if (this.viewState === 'regular') {
      return;
    }
    this.createRegularView();
  }

  private renderFallbackView() {
    if (this.viewState === 'fallback') {
      return;
    }
    this.createFallbackView();
  }

  private upsertContext(value: T) {
    this.$implicit = value;
    if (this.context) {
      this.context.$implicit = this.context.ifNonNullish = value;
    } else {
      this.context = { $implicit: value, ifNonNullish: value };
    }
  }

  private createRegularView() {
    this.clearViewIfNeeded();
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    this.viewState = 'regular';
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

  private isNullish(value: T): boolean {
    return value === null || value === undefined;
  }
}
