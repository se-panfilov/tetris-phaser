import { filter, Subject } from 'rxjs';
import { Keys } from '@/input/lib/Keyboard/Keys';

// Key(Keys.W).subscribe(() => {
//   player.move()
// })

// let Keyboard = new Subject<any>();
//
// Key(Keys.W)
//   .onDown(() => ...)
//   .onUp(() => ...)
//   .whileHeld(() => ...)

export interface IKey {
  readonly value: Subject<any>;
  readonly isDown: boolean;
  readonly isUp: boolean;
  readonly press: Subject<any>;
  readonly release: Subject<any>;
}

// TODO (S.Panfilov) any
// export function Key(value: any): IKey {
//   return {
//     value: value,
//     isDown: false,
//     isUp: true,
//     press: undefined,
//     release: undefined
//   };
// };
//
// key.downHandler = (event) => {
//   if (event.key === key.value) {
//     if (key.isUp && key.press) {
//       key.press();
//     }
//     key.isDown = true;
//     key.isUp = false;
//     event.preventDefault();
//   }
// };

// function Keyboard(value) {
//
//   window.addEventListener('keydown', downListener, false);
//   window.addEventListener('keyup', upListener, false);
//
//   // Detach event listeners
//   key.unsubscribe = () => {
//     window.removeEventListener('keydown', downListener);
//     window.removeEventListener('keyup', upListener);
//   };
//
//   return key;
// }
