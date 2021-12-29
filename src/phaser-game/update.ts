import { playerAnimation } from '@/phaser-game/PlayerControls';
import { isGameOver } from '@/phaser-game/entities/GameState';
import { getCursors, getPlayer } from '@/phaser-game/entities';

export function update() {
  if (isGameOver()) return;
  playerAnimation(getCursors(), getPlayer());
}
