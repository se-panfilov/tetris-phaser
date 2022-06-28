import { KeyCode } from '@/input/lib/model/lib/KeyCode';

export interface KeyState {
  readonly isDown: boolean;
  readonly code: KeyCode;
}
