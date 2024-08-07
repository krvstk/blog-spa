import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
} from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('* => isLeft', slideTo('left') ),
    transition('* => isRight', slideTo('right') ),
    transition('isRight => *', slideTo('left') ),
    transition('isLeft => *', slideTo('right') )
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: '140px',
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('450ms 150ms ease-in', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('450ms 150ms ease-in', style({ [direction]: '0%'}))
      ], optional)
    ]),
    query(':leave', animateChild(), optional),
    query(':enter', animateChild(), optional),
  ];
}
