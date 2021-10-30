import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { IfNonNullishContext, IfNullish } from './if-non-nullish.types';

@Directive({
  selector: '[ifNonNullish]',
})
export class IfNonNullishDirective<T = string> {
  @Input()
  set ifNonNullish(value: T) {
    this.hasValue = value !== null && value !== undefined;
    this.handle(value ?? this.default);
  }

  @Input()
  set ifNonNullishDefault(value: T) {
    this.default = value;
    if (!this.hasValue) {
      this.handle(this.default);
    }
  }

  $implicit!: T;

  private context!: IfNonNullishContext<T>;

  private default!: T;

  private hasValue = false;

  private hasView = false;

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

  private handle(value: T) {
    if (value === null || value === undefined) {
      if (this.hasView) {
        this.clearView();
      }
    } else {
      this.upsertContext(value);
      if (!this.hasView) {
        this.createView();
      }
    }
  }

  private upsertContext(value: T) {
    this.$implicit = value;
    if (this.context) {
      this.context.$implicit = this.context.ifNonNullish = value;
    } else {
      this.context = { $implicit: value, ifNonNullish: value };
    }
  }

  private createView() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    this.hasView = true;
  }

  private clearView() {
    this.viewContainerRef.clear();
    this.hasView = false;
  }
}
