import { trigger, transition, style, animate } from '@angular/animations';

export const navAnimations = [
  trigger('smoothHeight', [
    transition('void => *', [style({ height: '0px', paddingTop: '0px', opacity: 0 }), animate('250ms ease-in-out')]),
    transition('* => void', [animate('250ms ease-in-out'), style({ height: '0px', paddingTop: '0px', opacity: 0 })]),
  ]),
  trigger('smoothWidth', [
    transition('void => show', [style({ width: '0px', marginLeft: '0px', marginRight: '0px' }), animate('250ms ease')]),
    transition('show => void', [animate('250ms ease'), style({ width: '0px', marginLeft: '0px', marginRight: '0px' })]),
  ]),
];
