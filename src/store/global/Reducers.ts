import { PayloadAction } from '@reduxjs/toolkit';
import { Application } from 'pixi.js';
import { GlobalState } from '@/store/global/State';

// TODO (S.Panfilov) any
// export function setApp(state: GlobalState, { payload }: PayloadAction<Application>): void {
export function setApp(state: any, { payload }: PayloadAction<Application>): void {
  state.app = payload;
}
