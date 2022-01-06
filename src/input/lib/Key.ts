import { BehaviorSubject, filter, finalize, Subject, takeUntil } from 'rxjs';
import { Keys, Letters } from '@/input/lib/Keyboard';

interface KeyState {
  readonly isHeld: boolean;
  readonly code: Keys;
}

const keyboard = new Subject<KeyState>();

// TODO (S.Panfilov) what is false?
window.addEventListener('keydown', downListener, false);
window.addEventListener('keyup', upListener, false);
window.removeEventListener('keydown', () => keyboard.unsubscribe());
window.removeEventListener('keyup', () => keyboard.unsubscribe());

function downListener(event: KeyboardEvent) {
  // TODO (S.Panfilov) any
  keyboard.next({ isHeld: true, code: event.code as any });
  // TODO (S.Panfilov) do I need "preventDefault"?
  // event.preventDefault();
}

function upListener(event: KeyboardEvent) {
  // TODO (S.Panfilov) any
  keyboard.next({ isHeld: false, code: event.code as any });
  // TODO (S.Panfilov) do I need "preventDefault"?
  // event.preventDefault();
}

// function KeyState({ isHeld, value }) {
//   return { isHeld, value };
// }

function Key(code: Keys) {
  const subject$ = new BehaviorSubject<KeyState>({ isHeld: false, code });
  let res = {};

  keyboard
    .pipe(
      takeUntil(keyboard),
      filter((state: KeyState) => state.code === code),
      finalize(() => unsubscribe())
    )
    .subscribe((state: KeyState) => subject$.next(state));

  function unsubscribe(): void {
    // TODO (S.Panfilov) do I need complete?
    subject$.complete();
    subject$.unsubscribe();
  }

  return { ...res, unsubscribe, subject$ };
}

Key(Letters.W)
  .subject$.pipe(filter((v: KeyState) => v.isHeld))
  .subscribe((v) => {
    console.log(v);
  });
