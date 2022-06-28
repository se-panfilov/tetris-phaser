import { InputActions } from '@/input/lib/constants';

export interface ActorActionState {
  readonly value: InputActions;
  readonly isActive: boolean;
}
