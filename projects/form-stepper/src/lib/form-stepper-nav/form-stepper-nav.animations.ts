import { trigger, transition, style, animate } from '@angular/animations';

export const navAnimations = [
  trigger('smoothHeight', [
    transition('void => *', [style({ height: '0px', paddingTop: '0px', opacity: 0 }), animate('250ms ease-in-out')]),
    transition('* => void', [animate('250ms ease-in-out'), style({ height: '0px', paddingTop: '0px', opacity: 0 })]),
  ]),
];
