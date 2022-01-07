import { distinctUntilChanged, filter, MonoTypeOperatorFunction } from 'rxjs';
import { KeyState } from '@/input';

export const isKeyDown: MonoTypeOperatorFunction<KeyState> = filter((v: KeyState) => v.isDown);
export const isKeyUp: MonoTypeOperatorFunction<KeyState> = filter((v: KeyState) => !v.isDown);
export const distinctKeyEvents: MonoTypeOperatorFunction<KeyState> = distinctUntilChanged(
  (a: KeyState, b: KeyState) => a.isDown == b.isDown
);
