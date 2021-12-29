import { Scene } from 'phaser';
import Text = Phaser.GameObjects.Text;

let score: number = 0;
let scoreText: Text;

export function getScoreText() {
  return 'Score: ' + score;
}

export function getScore(): number {
  return score;
}

export function setScore(value: number) {
  score = value;
}

export function setScoreText(value: Text) {
  scoreText = value;
}

const TEXT_PARAMS = {
  fontSize: 32,
  color: '#000'
};

export function initScoreText(
  scene: Scene,
  text: string,
  fontSize: number = TEXT_PARAMS.fontSize,
  color: string = TEXT_PARAMS.color
): Text {
  return scene.add.text(16, 16, text, { fontSize: `${fontSize}px`, color });
}

export function updateScores(value: number) {
  setScore(value);
  scoreText.setText(getScoreText());
}
