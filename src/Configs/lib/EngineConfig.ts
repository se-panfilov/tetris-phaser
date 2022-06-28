import { WrappedEngineConfig } from '@/models';

export type EngineConfig = Record<string, any>;

export const engineConfig: WrappedEngineConfig = {
  width: 800,
  height: 500,
  antialias: true,
  backgroundAlpha: 1,
  resolution: 1
};
