import { BehaviorSubject } from 'rxjs';
import { EngineConfig } from '@/Configs';
import { Application as PixiEngine } from 'pixi.js';

export type Engine = PixiEngine;
export const engineConfig$ = new BehaviorSubject<EngineConfig | undefined>(undefined);
