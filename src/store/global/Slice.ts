import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './State';
import { setApp } from './Reducers';

// TODO (S.Panfilov) any
export const appSlice: any = createSlice({
  name: 'global',
  initialState,
  reducers: { setApp }
});
