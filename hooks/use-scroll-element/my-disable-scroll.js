import { LiteEvent } from "@/hooks/shared/lite-event";
import { createThrottlingFunction } from "./throttling";

const CAN_LOCK_SCROLL = true;

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const KEY_UP_CODE = 38;
const KEY_DOWN_CODE = 40;
var keys = { 37: 1, [KEY_UP_CODE]: 1, 39: 1, [KEY_DOWN_CODE]: 1 };

const scrollEndedEvent = new LiteEvent();

let touchCountTm = null;
let touchCount = 0;
const clearTouchCount = () => {
  clearTimeout(touchCountTm);
  touchCountTm = setTimeout(() => {
    touchCount = 0;
  }, 500);
};

let deferedTouchPos = null;
const setDeferedTouchPos = createThrottlingFunction((newTouchPos) => {
  deferedTouchPos = newTouchPos;
}, 200);

let prevTouchPos = null;

const ontouchstart = (e) => {
  prevTouchPos = e.changedTouches[0].clientY;
  console.log("Start touch", prevTouchPos);
  deferedTouchPos = prevTouchPos;

  touchCount++;
  clearTouchCount();
};

function getNumberSign(value) {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

const getNextScrollY = (scrollDeltaY) => {
  const { scrollTop: prevScroolTop } = document.scrollingElement;
  return prevScroolTop - scrollDeltaY;
};

let lastDeltaYTime = Date.now();
let speedDeltaYValue = 0;
let startSpeedTime = null;
let lastSpeedSign = 0;
function getScrollDeltaY(e) {
  const { wheelDeltaY, changedTouches, keyCode } = e;

  if (wheelDeltaY !== undefined) {
    return { scrollDeltaY: wheelDeltaY, scrollBehavior: "instant" };
  }

  let scrollDeltaY = 0;

  if (keyCode === KEY_UP_CODE) {
    scrollDeltaY = 10;
  }

  if (keyCode === KEY_DOWN_CODE) {
    scrollDeltaY = -10;
  }

  let speedNumForPower = 0.5;
  let needSpeedTimeDiff = 300;

  let isTouch = false;

  if (
    changedTouches !== undefined &&
    changedTouches[0] &&
    prevTouchPos !== null
  ) {
    let newTouchPos = changedTouches[0].clientY;
    // newTouchPos > touchPos then finger moving down
    scrollDeltaY = newTouchPos - prevTouchPos;
    prevTouchPos = newTouchPos;
    setDeferedTouchPos(newTouchPos);

    isTouch = true;
  }

  const curSpeedSign = getNumberSign(scrollDeltaY);
  const nowTime = Date.now();
  const isSpeedTime = isTouch || nowTime - lastDeltaYTime < needSpeedTimeDiff;

  const curTouchCount = touchCount > 0 ? touchCount - 1 : 0;
  if (isSpeedTime) {
    if (isTouch) {
      speedDeltaYValue = 0;

      const touchCountExtraValue = curTouchCount * 20;

      let endTouchExtraValue = 0;

      speedDeltaYValue += touchCountExtraValue;
      speedDeltaYValue += endTouchExtraValue;

      console.log(
        "\nCALC TOUCH SPEED:",
        "\ncurTouchCount",
        curTouchCount,
        "\ntouchCountExtraValue",
        touchCountExtraValue,
        "\nendTouchExtraValue",
        endTouchExtraValue,
        "\nfinal speedDeltaYValue = ",
        speedDeltaYValue
      );
    }

    if (!isTouch) {
      const passedSec =
        startSpeedTime !== null ? (nowTime - startSpeedTime) / 1000 : 0;
      speedDeltaYValue += Math.pow(speedNumForPower, passedSec);
    }

    if (lastSpeedSign === 0) {
      lastSpeedSign = curSpeedSign;
    }

    if (startSpeedTime === null) {
      startSpeedTime = Date.now();
    }
  }

  if (!isSpeedTime || curSpeedSign !== lastSpeedSign) {
    speedDeltaYValue = 0;
    lastSpeedSign = 0;
    startSpeedTime = null;
  }
  // console.log("speedDeltaYValue", speedDeltaYValue);
  lastDeltaYTime = Date.now();

  let scrollBehavior = isTouch && curTouchCount > 1 ? "smooth" : "instant";

  if (scrollDeltaY !== 0) {
    if (scrollDeltaY > 0) {
      scrollDeltaY += speedDeltaYValue;
    }
    if (scrollDeltaY < 0) {
      scrollDeltaY -= speedDeltaYValue;
    }
  }

  return { scrollDeltaY, scrollBehavior };
}

let scrollingTm;
function startScrollDetection() {
  // Clear any existing timer
  clearTimeout(scrollingTm);

  // Set a timer to run after a short delay
  scrollingTm = setTimeout(function () {
    // The scroll has stopped, perform your actions here
    console.log("Scrolling ended!");
    scrollEndedEvent.emit();
  }, 50); // Adjust the delay as needed
}

function onScroll() {
  startScrollDetection();
}

let isSmoothScrolling = false;
let smoothScrollDeltaY = 0;

const checkSmoothScrolling = (scrollDeltaY) => {
  if (isSmoothScrolling) {
    // if (getNumberSign(scrollDeltaY) !== getNumberSign(smoothScrollDeltaY)) {
    //   console.warn("Smooth scroll direction changed. Set zero.");
    //   smoothScrollDeltaY = 0;
    // }
    smoothScrollDeltaY += scrollDeltaY;
    // console.log("Smooth scroll delta y changed", smoothScrollDeltaY);
    startScrollDetection();
    return true;
  }
  return false;
};

const startSmoothScrolling = () => {
  console.log("Start smooth scroll");
  isSmoothScrolling = true;
};

const getIsScrollTop = (scrollDeltaY) => scrollDeltaY > 0;
const getIsScrollBottom = (scrollDeltaY) => scrollDeltaY < 0;

export function subscribeDisableScroll({
  lockScrollY,
  onScrollTop,
  onScrollDown,
  getNeedLockScrollTop,
  getNeedLockScrollBottom,
}) {
  let isPauseScroll = false;
  let lockTime = Date.now();

  const checkScrollLocked = () => Date.now() - lockTime < 500;

  const doScrollWithLock = (scrollDeltaY, behavior) => {
    const isScrollTop = getIsScrollTop(scrollDeltaY);
    const isScrollBottom = getIsScrollBottom(scrollDeltaY);
    let nextScrollY = getNextScrollY(scrollDeltaY);
    const EPS = 20;
    // console.log("isScrollTop", isScrollTop, "isScrollBottom", isScrollBottom);
    const needLockScrollTop =
      getNeedLockScrollTop() && isScrollTop && lockScrollY + EPS > nextScrollY;
    const needLockScrollBottom =
      getNeedLockScrollBottom() &&
      isScrollBottom &&
      nextScrollY > lockScrollY - EPS;
    // console.log(
    //   "needLockScrollTop",
    //   needLockScrollTop,
    //   "needLockScrollBottom",
    //   needLockScrollBottom
    // );

    const locked =
      CAN_LOCK_SCROLL && (needLockScrollTop || needLockScrollBottom);
    if (locked) {
      console.warn("LOCK SCROLL!!!");
      lockTime = Date.now();
      isPauseScroll = true;
      nextScrollY = lockScrollY;
      behavior = "smooth";
      isSmoothScrolling = false;
    }

    window.scrollTo({
      behavior,
      top: nextScrollY,
    });

    // console.log(
    //   "scrollDeltaY",
    //   scrollDeltaY,
    //   "prevScroolTop",
    //   prevScroolTop,
    //   "nextScrollY",
    //   nextScrollY
    // );

    return locked;
  };

  const onSmoothScrollEnded = () => {
    if (!isSmoothScrolling) {
      // console.warn("Return from on smooth scrolling case not isSmoothScrolling");
      return;
    }
    console.log("On Smooth scroll ended");
    const curSmoothScrollDeltaY = smoothScrollDeltaY;
    smoothScrollDeltaY = 0;
    if (curSmoothScrollDeltaY < 300) {
      isSmoothScrolling = false;
      console.log("Stop smooth scroll", curSmoothScrollDeltaY);
      doScrollWithLock(curSmoothScrollDeltaY, "smooth");
      return;
    }
    console.log("Do next smooth scroll", curSmoothScrollDeltaY);
    doScrollWithLock(curSmoothScrollDeltaY, "smooth");
    // window.scrollTo({
    //   behavior: "smooth",
    //   top: nextScrollY,
    // });
    startScrollDetection();
  };

  const ontouchend = (e) => {
    if (checkScrollLocked()) return;

    const endTouchPos = e.changedTouches[0].clientY;
    const deferedDiffPos = endTouchPos - deferedTouchPos;

    const coeff = Math.abs(deferedDiffPos / 100);
    const scrollValue = getNumberSign(deferedDiffPos) * 750 * coeff;
    const needScroll = coeff >= 1;
    console.log(
      "End touch",
      "deferedDiffPos",
      deferedDiffPos,
      "coeff",
      coeff,
      "scrollValue",
      scrollValue,
      "needScroll",
      needScroll
    );
    if (needScroll) {
      doScrollByDeltaY(scrollValue, "smooth");
    }
  };

  function doScrollByDeltaY(scrollDeltaY, scrollBehavior) {
    if (checkSmoothScrolling(scrollDeltaY)) {
      return;
    }
    if (scrollDeltaY === 0) return;

    if (isPauseScroll) {
      if (scrollDeltaY !== 0) {
        const isScrollTop = getIsScrollTop(scrollDeltaY);
        const handler = isScrollTop ? onScrollTop : onScrollDown;
        const result = handler();
        // console.log("result res", result);
        if (result) {
          console.warn("UNLOCK SCROLL!!!");
          isPauseScroll = false;
        }
        lockTime = Date.now();
      }
      return;
    }

    const locked = doScrollWithLock(scrollDeltaY, scrollBehavior);
    if (!locked && scrollBehavior === "smooth") {
      startSmoothScrolling();
    }
  }

  function preventDefault(e) {
    e.preventDefault();

    if (checkScrollLocked()) return;

    const { scrollDeltaY, scrollBehavior } = getScrollDeltaY(e);
    doScrollByDeltaY(scrollDeltaY, scrollBehavior);
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
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

  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("touchstart", ontouchstart, wheelOpt);
  window.addEventListener("touchend", ontouchend, wheelOpt);
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  window.addEventListener("scroll", onScroll);
  scrollEndedEvent.on(onSmoothScrollEnded);

  return () => {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("touchstart", ontouchstart, wheelOpt);
    window.removeEventListener("touchend", ontouchend, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    window.removeEventListener("scroll", onScroll);
    scrollEndedEvent.off(onSmoothScrollEnded);
  };
}
