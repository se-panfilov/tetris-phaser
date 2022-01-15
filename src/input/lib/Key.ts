import { BehaviorSubject, filter, finalize, takeUntil } from 'rxjs';
import { KeyCode, KeyState } from '@/input/lib/model';
import { keyboard$ } from '@/input/lib/Keyboard';

export function Key$(code: KeyCode): BehaviorSubject<KeyState> {
  const subject$ = new BehaviorSubject<KeyState>({ isDown: false, code });

  keyboard$
    .pipe(
      filter((state: KeyState) => state.code === code),
      finalize(() => {
        subject$.complete();
        keyboard$.unsubscribe();
      })
      // takeUntil(keyboard$)
    )
    .subscribe((state: KeyState) => subject$.next(state));

  return subject$;
}
