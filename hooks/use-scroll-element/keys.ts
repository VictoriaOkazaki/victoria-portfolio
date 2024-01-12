// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
export const KEY_UP_CODE = 38;

export const KEY_DOWN_CODE = 40;

export const MOVE_KEYS: Record<number, number> = {
  37: 1,
  [KEY_UP_CODE]: 1,
  39: 1,
  [KEY_DOWN_CODE]: 1,
};
