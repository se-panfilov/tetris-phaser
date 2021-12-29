let gameOver = false;

export function isGameOver(): boolean {
  return Boolean(gameOver);
}

export function setGameOver(): void {
  gameOver = !gameOver;
}
