import { PayloadAction } from '@reduxjs/toolkit';
import { Application } from 'pixi.js';

export function setApp(state: any, { payload }: PayloadAction<Application>): void {
  state.app = payload;
}
