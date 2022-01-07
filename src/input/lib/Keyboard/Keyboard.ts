import { Subject } from 'rxjs';
import { INPUT_EVENT, KeyState } from '@/input/lib/model';

let keyboard$: Subject<KeyState>;

export function getKeyboard(): Subject<KeyState> {
  return keyboard$;
}

export function initKeyboard(): void {
  keyboard$ = new Subject<KeyState>();
  // TODO (S.Panfilov) what options is false?
  window.addEventListener(INPUT_EVENT.KEYDOWN, (evt: KeyboardEvent) => keyListener(evt, true), false);
  window.addEventListener(INPUT_EVENT.KEYUP, (evt: KeyboardEvent) => keyListener(evt, false), false);
}

export function stopKeyboardSubscription(): void {
  window.removeEventListener(INPUT_EVENT.KEYDOWN, () => keyboard$.unsubscribe());
  window.removeEventListener(INPUT_EVENT.KEYUP, () => keyboard$.unsubscribe());
  keyboard$.complete();
}

function keyListener(event: KeyboardEvent, isDown: boolean): void {
  // TODO (S.Panfilov) any
  keyboard$.next({ isDown, code: event.code as any });
  // TODO (S.Panfilov) do I need "preventDefault"?
  // event.preventDefault();
}
