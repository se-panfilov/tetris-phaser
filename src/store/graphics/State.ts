import { Texture } from 'pixi.js';

export interface TexturesState {
  textures: Record<string, Texture>;
}

export const initialState: TexturesState = {
  textures: {}
};
