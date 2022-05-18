export type IconAlias = 'edit' | 'check' | 'checkCircle' | 'arrowDown';

export interface IconConfig {
  viewBox: string;
  d: string;
}

export type IconsMap = Record<IconAlias, IconConfig>;
