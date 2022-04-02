import { createSlice, Slice } from '@reduxjs/toolkit';
import { GlobalState, initialState } from './State';
import { setApp } from './Reducers';

// TODO (S.Panfilov) any
export const appSlice: Slice<GlobalState> = createSlice({
  name: 'global',
  initialState,
  reducers: { setApp }
});
