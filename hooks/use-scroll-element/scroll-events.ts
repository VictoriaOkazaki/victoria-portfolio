import { MOVE_KEYS } from "./keys";
import { getScrollTop, getWheelEventName, getWheelOpt } from "./webapi";

export function createSubscribeScroll({
  checkLocked,
}: {
  checkLocked: (scrollDeltaY: number) => boolean;
}) {
  let prevScrollTop = getScrollTop();
  const handleScroll = function () {
    const curScrollTop = getScrollTop();
    const scrollDeltaY = prevScrollTop - curScrollTop;
    prevScrollTop = curScrollTop;
    // console.log("scroll", curScrollTop, "scrollDeltaY", scrollDeltaY);
    checkLocked(scrollDeltaY);
  };

  const subscribeScroll = () => {
    window.addEventListener("scroll", handleScroll, false);

    return () => window.removeEventListener("scroll", handleScroll);
  };

  return {
    subscribeScroll,
  };
}

export function createSubscribeBeforeScroll({
  getScrollDeltaY,
  checkLocked,
  onPreventedScrollTop,
  onPreventedScrollBottom,
}: {
  getScrollDeltaY: (e: any) => number;
  checkLocked: (scrollDeltaY: number) => boolean;
  onPreventedScrollTop: () => void;
  onPreventedScrollBottom: () => void;
}) {
  const handleEvent = function (e: any) {
    const scrollDeltaY = getScrollDeltaY(e);
    const locked = checkLocked(scrollDeltaY);
    // console.log("handleEvent", locked);
    if (!locked) return;
    if (typeof e.cancelable !== "boolean" || e.cancelable) {
      e.preventDefault(); // disables scrolling by mouse wheel and touch move

      if (scrollDeltaY > 0) {
        onPreventedScrollTop();
      }
      if (scrollDeltaY < 0) {
        onPreventedScrollBottom();
      }
    }
  };

  function handleKeys(e: { keyCode: number }) {
    if (MOVE_KEYS[e.keyCode]) {
      handleEvent(e);
      return false;
    }
  }

  const wheelOpt = getWheelOpt();
  const wheelEvent = getWheelEventName();

  const subscribeBeforeScroll = () => {
    window.addEventListener("DOMMouseScroll", handleEvent, false); // older FF
    window.addEventListener(wheelEvent, handleEvent, wheelOpt); // modern desktop
    window.addEventListener("touchmove", handleEvent, wheelOpt); // mobile
    window.addEventListener("keydown", handleKeys, false);

    return () => {
      window.removeEventListener("DOMMouseScroll", handleEvent);
      window.removeEventListener(wheelEvent, handleEvent);
      window.removeEventListener("touchmove", handleEvent);
      window.removeEventListener("keydown", handleKeys);
    };
  };

  return { subscribeBeforeScroll };
}
