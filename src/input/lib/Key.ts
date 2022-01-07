import { BehaviorSubject, filter, finalize } from 'rxjs';
import { KeyCode, KeyState } from '@/input/lib/model';
import { getKeyboard } from '@/input/lib/Keyboard';

export function Key$(code: KeyCode): BehaviorSubject<KeyState> {
  const subject$ = new BehaviorSubject<KeyState>({ isDown: false, code });
  const keyboard$ = getKeyboard();

  keyboard$
    .pipe(
      filter((state: KeyState) => state.code === code),
      finalize(() => {
        subject$.complete();
        keyboard$.unsubscribe();
      })
    )
    .subscribe((state: KeyState) => subject$.next(state));

  return subject$;
}
