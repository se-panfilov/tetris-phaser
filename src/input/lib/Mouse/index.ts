import { Subject } from 'rxjs';
import { MouseCoords } from '@/input';
import { Engine } from '@/globals';
import { enableMouseMove, enableTouchMove, setInteractiveStage } from '@/services/lib/EngineService';
import { WrappedInteractionEvent } from '@/models/lib/WrappedEngineTypes';

export const mousePosition$ = new Subject<MouseCoords>();

function touchHandler(event: WrappedInteractionEvent): void {
  const x = event.data.global.x;
  const y = event.data.global.y;

  mousePosition$.next({ x, y });
}

export function initMouse(engine: Engine): void {
  setInteractiveStage(engine, true);
  enableTouchMove(engine, touchHandler);
  enableMouseMove(engine, touchHandler);
}
