import sky from '@/assets/sky.png';
import platform from '@/assets/platform.png';
import star from '@/assets/star.png';
import bomb from '@/assets/bomb.png';
import dude from '@/assets/dude.png';

export const SKY: Sprite = { id: 'sky', img: sky };
export const PLATFORM: Sprite = { id: 'ground', img: platform };
export const STAR: Sprite = { id: 'star', img: star };
export const BOMB: Sprite = { id: 'bomb', img: bomb };
export const DUDE: Sprite = { id: 'dude', img: dude, frameConfig: { frameWidth: 32, frameHeight: 48 } };

export interface Sprite {
  readonly id: string;
  readonly img: any; // TODO (S.Panfilov) what type is it?
  readonly frameConfig?: {
    readonly frameWidth: number;
    readonly frameHeight: number;
  };
}
