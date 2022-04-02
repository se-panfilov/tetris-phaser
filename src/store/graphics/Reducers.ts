import { PayloadAction } from '@reduxjs/toolkit';
import { Texture } from 'pixi.js';

// TODO (S.Panfilov)  any
export function addTexture(state: any, { payload }: PayloadAction<TexturePayload>): void {
  // export function addTexture(state: TexturesState, { payload }: PayloadAction<Record<string, Texture>>): void {
  const { name, value } = payload;
  state.textures = { ...state.textures, [name]: value };
}

interface TexturePayload {
  readonly name: string;
  value: Texture;
}
