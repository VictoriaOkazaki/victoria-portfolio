// import { subscribeDisableScroll } from "./my-disable-scroll";
import { createThrottlingFunction } from "./throttling";

type Params = {
  getElement: () => HTMLElement;
  getActiveIndex: () => number;
  setActiveIndex: (index: number) => void;
  getSlidesLength: () => number;
};

export function useScrollElement({
  getElement,
  getSlidesLength,
  getActiveIndex,
  setActiveIndex,
}: Params) {
  const getNextScrollTopIndex = () => getActiveIndex() - 1;
  const getNeedLockScrollTop = () => getNextScrollTopIndex() >= 0;
  const scrollTop = () => {
    // console.log("onPreventedScrollTop");

    if (getNeedLockScrollTop()) {
      setActiveIndex(getNextScrollTopIndex());
    }

    if (!getNeedLockScrollTop()) {
      // console.log("Enable scroll (onPreventedScrollTop)");
      return true;
    }

    return false;
  };
  const THROTTLING_TIME_MS = 300;
  const onPreventedScrollTop = createThrottlingFunction(
    scrollTop,
    THROTTLING_TIME_MS
  );

  const getNextScrollBottomIndex = () => getActiveIndex() + 1;
  const getNeedLockScrollBottom = () => {
    const newIndex = getNextScrollBottomIndex();
    const slidesLength = getSlidesLength();

    return newIndex < slidesLength;
  };
  const scrollBottom = () => {
    // console.log("onPreventedScrollBottom");

    if (getNeedLockScrollBottom()) {
      setActiveIndex(getNextScrollBottomIndex());
    }

    if (!getNeedLockScrollBottom()) {
      // console.log("Enable scroll (onPreventedScrollBottom)");
      return true;
    }

    return false;
  };
  const onPreventedScrollBottom = createThrottlingFunction(
    scrollBottom,
    THROTTLING_TIME_MS
  );

  onMounted(() => {
    let supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}
    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    let locked = false;
    let lockTime = 0;
    // const lockScroll = { startY: 1000, endY: 1200 };
    const getScrollTop = () => document.scrollingElement.scrollTop;

    const needLock = (scrollDeltaY: number) => {
      // const scrollTop = getScrollTop();

      // const inViewPort =
      //   scrollTop >= lockScroll.startY && scrollTop <= lockScroll.endY;

      const element = getElement();
      const inViewPort = getIsVisible(element);

      // console.log("inViewPort", inViewPort, "scrollTop", scrollTop);
      if (!inViewPort) return false;

      const isScrollTop = scrollDeltaY > 0;
      const needLockTop = isScrollTop && getNeedLockScrollTop();
      const isScrollBottom = scrollDeltaY < 0;
      const needLockBottom = isScrollBottom && getNeedLockScrollBottom();

      if (locked && (needLockBottom || needLockTop)) {
        // console.warn("Lock case inner scroll");
        lockTime = Date.now();
        return true;
      }

      if (Date.now() - lockTime < 500) {
        // console.warn("Lock case 500ms delay");
        return true;
      }

      if (!needLockBottom && !needLockTop) {
        // console.warn("No lock case no need");
        return false;
      }

      return true;
    };

    let prevScrollTop = getScrollTop();
    const handleScroll = function () {
      const curScrollTop = getScrollTop();
      const scrollDeltaY = prevScrollTop - curScrollTop;
      prevScrollTop = curScrollTop;
      // console.log("scroll", curScrollTop, "scrollDeltaY", scrollDeltaY);
      locked = needLock(scrollDeltaY);
    };

    let prevTouchPos = null;

    const ontouchstart = (e) => {
      prevTouchPos = e.changedTouches[0].clientY;
    };

    const getScrollDeltaY = (e) => {
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

    const handleEvent = function (e) {
      const scrollDeltaY = getScrollDeltaY(e);
      locked = needLock(scrollDeltaY);
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

    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const KEY_UP_CODE = 38;
    const KEY_DOWN_CODE = 40;
    const MOVE_KEYS = { 37: 1, [KEY_UP_CODE]: 1, 39: 1, [KEY_DOWN_CODE]: 1 };
    function handleKeys(e) {
      if (MOVE_KEYS[e.keyCode]) {
        handleEvent(e);
        return false;
      }
    }

    window.addEventListener("scroll", handleScroll, false);
    window.addEventListener("DOMMouseScroll", handleEvent, false); // older FF
    window.addEventListener(wheelEvent, handleEvent, wheelOpt); // modern desktop
    window.addEventListener("touchmove", handleEvent, wheelOpt); // mobile
    window.addEventListener("touchstart", ontouchstart, wheelOpt);
    window.addEventListener("keydown", handleKeys, false);

    // const unsubscribeDisableScroll = subscribeDisableScroll({
    //   lockScrollY: 1200,
    //   onScrollTop: onPreventedScrollTop,
    //   onScrollDown: onPreventedScrollBottom,
    //   getNeedLockScrollTop,
    //   getNeedLockScrollBottom,
    // });

    return () => {
      // unsubscribeDisableScroll();
      window.removeEventListener("scroll", handleScroll, false);
      window.removeEventListener("DOMMouseScroll", handleEvent, false);
      window.removeEventListener(wheelEvent, handleEvent, wheelOpt);
      window.removeEventListener("touchmove", handleEvent, wheelOpt);
      window.removeEventListener("touchstart", ontouchstart, wheelOpt);
      window.removeEventListener("keydown", handleKeys, false);
    };
  });

  return {
    scrollTop,
    scrollBottom,
  };
}

function getIsVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const elemToTop = rect.top;
  const elemToBottom = window.innerHeight - rect.bottom;
  const isVisibleTop = elemToTop >= 0;
  const isVisibleBottom = elemToBottom >= 0;
  const isVisible = isVisibleTop && isVisibleBottom;

  return isVisible;
}
