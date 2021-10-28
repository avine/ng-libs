export interface IfNonNullishContext<T = unknown> {
  $implicit: T;
  ifNonNullish: T;
}

export type IfNullish = null | undefined;
