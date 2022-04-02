import { Application } from 'pixi.js';

export interface GlobalState {
  app: Application | undefined;
}

export const initialState: GlobalState = {
  app: undefined
};
