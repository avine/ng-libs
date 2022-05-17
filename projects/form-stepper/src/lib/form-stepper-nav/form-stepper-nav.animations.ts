import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const navAnimations = [
  trigger('delayedFadeIn', [
    transition('1 <=> 2', [
      animate(
        '500ms',
        keyframes([
          style({ opacity: 0, offset: 0 }), // 0ms
          style({ opacity: 0, offset: 0.6 }), // 300ms (wait a bit longer than 250ms)
          style({ opacity: 1, offset: 1 }), // 500ms
        ])
      ),
    ]),
  ]),
  trigger('fadeOut', [transition('* => void', [animate('250ms ease-in-out'), style({ opacity: 0 })])]),
  trigger('smoothHeight', [
    transition('void => show', [style({ height: '0px', paddingTop: '0px', opacity: 0 }), animate('250ms ease-in-out')]),
    transition('show => void', [animate('250ms ease-in-out'), style({ height: '0px', paddingTop: '0px', opacity: 0 })]),
  ]),
  trigger('smoothWidth', [
    transition('void => show', [style({ width: '0px', marginLeft: '0px', marginRight: '0px' }), animate('250ms ease')]),
    transition('show => void', [animate('250ms ease'), style({ width: '0px', marginLeft: '0px', marginRight: '0px' })]),
  ]),
];
