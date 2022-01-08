let _delta: number = 0;

export function setDelta(delta: number): void {
  _delta = delta;
}

export const getDelta = (): number => _delta;
