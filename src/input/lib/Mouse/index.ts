import { Application, InteractionEvent } from 'pixi.js';
import { Subject } from 'rxjs';
import { MouseCoords } from '@/input';

export const mousePosition$ = new Subject<MouseCoords>();

export function initMouse(app: Application): void {
  // TODO (S.Panfilov) wtf is interactive = true?
  app.stage.interactive = true;
  app.stage.on('touchmove', touchHandler);
  app.stage.on('mousemove', touchHandler);
}

// TODO (S.Panfilov)  any
function touchHandler(event: InteractionEvent): void {
  const x = event.data.global.x;
  const y = event.data.global.y;

  mousePosition$.next({ x, y });
}
