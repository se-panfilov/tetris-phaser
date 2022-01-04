import { Application } from 'pixi.js';

export interface CounterState {
  value: Application | undefined;
}

export const initialState: CounterState = {
  value: undefined
};
