import { KeyCode } from '@/input/lib/model/KeyCode';

export interface KeyState {
  readonly isDown: boolean;
  readonly code: KeyCode;
}
