import { Scene } from 'phaser';

let score: number = 0;
let scoreText: any;

export function getScoreText() {
  return 'Score: ' + score;
}

export function getScore(): number {
  return score;
}

export function setScore(value: number) {
  score = value;
}

export function setScoreText(value: any) {
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
) {
  console.log(111, text);
  return scene.add.text(16, 16, text, { fontSize: `${fontSize}px`, fill: color } as any);
}

export function updateScores(value: number) {
  setScore(value);
  scoreText.setText(getScoreText());
}
