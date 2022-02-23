export type IconAlias = 'edit' | 'check' | 'checkCircle';

export interface IconConfig {
  viewBox: string;
  d: string;
}

export type IconsMap = Record<IconAlias, IconConfig>;
