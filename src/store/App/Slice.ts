import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '@/store/App/State';
import { setApp } from '@/store/App/Reducers';

// TODO (S.Panfilov) any
export const appSlice: any = createSlice({
  name: 'app',
  initialState,
  reducers: { setApp }
});
