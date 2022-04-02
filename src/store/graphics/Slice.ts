import { createSlice, Slice } from '@reduxjs/toolkit';
import { initialState, TexturesState } from './State';
import { addTexture } from './Reducers';

// TODO (S.Panfilov) any
export const texturesSlice: Slice<TexturesState> = createSlice({
  name: 'textures',
  initialState,
  reducers: { addTexture }
});
