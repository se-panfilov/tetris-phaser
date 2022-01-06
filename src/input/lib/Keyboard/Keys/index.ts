import { Directions, Letters, Modifiers, Numbers, Numpad, Others, Symbols } from '@/input/lib/Keyboard';

export * from './Directions';
export * from './Letters';
export * from './Modifiers';
export * from './Numbers';
export * from './Numpad';
export * from './Others';
export * from './Symbols';

export type Keys = Directions | Letters | Modifiers | Numbers | Numpad | Others | Symbols;
