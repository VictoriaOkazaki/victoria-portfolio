import { KEY_DOWN_CODE, KEY_UP_CODE } from "./keys";
import { getWheelOpt } from "./webapi";

export function createScrollDeltaYFuns() {
  let prevTouchPos: number | null = null;

  const ontouchstart = (e: any) => {
    prevTouchPos = e.changedTouches[0].clientY;
  };

  const getScrollDeltaY = (e: any) => {
    const { wheelDeltaY, changedTouches, keyCode } = e;
    let scrollDeltaY = 0;

    if (wheelDeltaY !== undefined) {
      scrollDeltaY = wheelDeltaY;
    } else if (keyCode === KEY_UP_CODE) {
      scrollDeltaY = 10;
    } else if (keyCode === KEY_DOWN_CODE) {
      scrollDeltaY = -10;
    } else if (
      changedTouches !== undefined &&
      changedTouches[0] &&
      prevTouchPos !== null
    ) {
      const newTouchPos = changedTouches[0].clientY;
      // newTouchPos > touchPos then finger moving down
      scrollDeltaY = newTouchPos - prevTouchPos;
      prevTouchPos = newTouchPos;
    }

    return scrollDeltaY;
  };

  const subscribeTouchStart = () => {
    const wheelOpt = getWheelOpt();
    window.addEventListener("touchstart", ontouchstart, wheelOpt);
    return () => window.removeEventListener("touchstart", ontouchstart);
  };

  return {
    subscribeTouchStart,
    getScrollDeltaY,
  };
}
