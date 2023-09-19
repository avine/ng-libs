import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfNonNullishContext, IfNullish } from './if-non-nullish.types';

@Directive({
  standalone: true,
  selector: '[ifNonNullish]',
})
export class IfNonNullishDirective<T = unknown> {
  @Input()
  set ifNonNullish(data: T) {
    this.hasData = data !== null && data !== undefined;
    this.updateView(data);
  }

  @Input()
  set ifNonNullishFallback(fallbackTemplate: TemplateRef<unknown> | IfNullish) {
    this.fallbackTemplate = fallbackTemplate ?? null;
    if (!this.hasData) {
      this.createFallbackView();
    }
  }

  private context!: IfNonNullishContext<T>;

  private hasData = true;

  private fallbackTemplate: TemplateRef<unknown> | null = null;

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
    context: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): context is IfNonNullishContext<Exclude<T, IfNullish>> {
    return true;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<IfNonNullishContext<T>>,
  ) {}

  private updateView(data: T) {
    if (this.hasData) {
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
}
