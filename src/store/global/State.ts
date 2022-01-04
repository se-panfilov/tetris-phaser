import { Application } from 'pixi.js';

export interface CounterState {
  app: Application | undefined;
}

export const initialState: CounterState = {
  app: undefined
};
