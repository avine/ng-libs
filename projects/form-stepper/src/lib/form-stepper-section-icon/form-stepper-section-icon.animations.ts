import { trigger, transition, animate, keyframes, style } from '@angular/animations';

export const sectionIconAnimations = [
  trigger('fadeIn', [
    transition('void => *', [
      animate(
        '250ms ease-in',
        keyframes([
          style({ offset: 0, opacity: 0, position: 'absolute' }),
          style({ offset: 0.5, position: 'relative', transform: 'scaleX(0)' }),
          style({ offset: 1, opacity: 1, transform: 'scaleX(1)' }),
        ])
      ),
    ]),
    transition('* => void', [
      animate(
        '250ms ease-out',
        keyframes([
          style({ offset: 0, opacity: 1, transform: 'scaleX(1)' }),
          style({ offset: 0.49, opacity: 0, transform: 'scaleX(0)' }),
          style({ offset: 0.5, position: 'absolute' }),
        ])
      ),
    ]),
  ]),
];
