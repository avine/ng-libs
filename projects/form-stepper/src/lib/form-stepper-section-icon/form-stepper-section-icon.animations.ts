import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const sectionIconAnimations = [
  trigger('fadeInOut', [
    transition('void => enabled', [
      animate(
        '250ms ease-in-out',
        keyframes([
          style({ offset: 0, opacity: 0, position: 'absolute' }),
          style({ offset: 0.5, position: 'relative', transform: 'scaleX(0)' }),
          style({ offset: 1, opacity: 1, transform: 'scaleX(1)' }),
        ])
      ),
    ]),
    transition('enabled => void', [
      animate(
        '250ms ease-in-out',
        keyframes([
          style({ offset: 0, opacity: 1, transform: 'scaleX(1)' }),
          style({ offset: 0.49, opacity: 0, transform: 'scaleX(0)' }),
          style({ offset: 0.5, position: 'absolute' }),
        ])
      ),
    ]),
  ]),
];
