export enum PlayerActions {
  MOVE_UP = 'MOVE_UP',
  MOVE_DOWN = 'MOVE_UP',
  MOVE_LEFT = 'MOVE_LEFT',
  MOVE_RIGHT = 'MOVE_RIGHT'
}

export interface PlayerActionState {
  readonly value: PlayerActions;
  readonly isActive: boolean;
}
