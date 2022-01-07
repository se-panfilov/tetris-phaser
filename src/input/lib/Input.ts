import { initKeyboard } from '@/input/lib/Keyboard';

// TODO (S.Panfilov) should come from config
const isKeyboardInput: boolean = true;

if (isKeyboardInput) {
  initKeyboard();
}
