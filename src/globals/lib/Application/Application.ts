import { BehaviorSubject, filter, map } from 'rxjs';
import { Engine, WrappedApplication } from '@/models';
import { EngineConfig } from '@/Configs';
import { Application as PixiEngine } from 'pixi.js';
import { getApplication } from './ApplicationHelper';

export const app$ = new BehaviorSubject<WrappedApplication<Engine> | undefined>(undefined);
export const engineConfig$ = new BehaviorSubject<EngineConfig | undefined>(undefined);

engineConfig$
  .pipe(
    filter((config: EngineConfig | undefined) => config !== undefined),
    // TODO (S.Panfilov) should be just EngineConfig, without undefined
    map((config: EngineConfig | undefined) => getApplication(new PixiEngine(config)))
  )
  .subscribe((v: WrappedApplication<Engine>) => app$.next(v));
