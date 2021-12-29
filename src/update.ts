import { playerAnimation } from '@/PlayerControls';
import { isGameOver } from '@/entities/GameState';
import { getCursors, getPlayer } from '@/entities';

export function update() {
  if (isGameOver()) return;
  playerAnimation(getCursors(), getPlayer());
}
