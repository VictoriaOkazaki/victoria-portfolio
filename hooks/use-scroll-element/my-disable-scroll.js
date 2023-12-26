import { LiteEvent } from "@/hooks/shared/lite-event";

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const KEY_UP_CODE = 38;
const KEY_DOWN_CODE = 40;
var keys = { 37: 1, [KEY_UP_CODE]: 1, 39: 1, [KEY_DOWN_CODE]: 1 };

const scrollEndedEvent = new LiteEvent();

let prevTouchPos = null;
const ontouchstart = (e) => {
  // console.log('update touch pos', prevTouchPos)
  prevTouchPos = e.changedTouches[0].clientY;
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

// let touchDeltaYList = [];
let touchDeltaYTime = Date.now();
let touchBatchSum = 0;

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

    isTouch = true;
    needSpeedTimeDiff = 500;
  }

  const curSpeedSign = getNumberSign(scrollDeltaY);
  const nowTime = Date.now();
  const isSpeedTime = nowTime - lastDeltaYTime < needSpeedTimeDiff;

  if (isSpeedTime) {
    const passedSec =
      startSpeedTime !== null ? (nowTime - startSpeedTime) / 1000 : 0;

    if (isTouch) {
      const SCROLL_SPEED_DELTA = 35;
      if (Math.abs(scrollDeltaY) > SCROLL_SPEED_DELTA) {
        speedDeltaYValue = Math.abs(scrollDeltaY * 1.5);
      } else {
        speedDeltaYValue = 0;
      }
      // console.log(
      //   "speed for scroll scrollDeltaY",
      //   scrollDeltaY,
      //   "speedDeltaYValue",
      //   speedDeltaYValue
      // );
    }

    if (!isTouch) {
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

  let scrollBehavior = "instant";

  if (scrollDeltaY !== 0) {
    if (scrollDeltaY > 0) {
      scrollDeltaY += speedDeltaYValue;
    }
    if (scrollDeltaY < 0) {
      scrollDeltaY -= speedDeltaYValue;
    }
  }

  if (isTouch) {
    const diffTime = Date.now() - touchDeltaYTime;
    touchDeltaYTime = Date.now();
    touchBatchSum = diffTime < 100 ? touchBatchSum + scrollDeltaY : 0;
    if (Math.abs(touchBatchSum) > 500) {
      scrollDeltaY = scrollDeltaY + touchBatchSum;
      scrollBehavior = "smooth";
      console.log("Touch smooth scroll worked", scrollDeltaY);
      touchBatchSum = 0;
      // const curTime = Date.now();
      // const prevTouchDeltaYTime = touchDeltaYTime;
      // touchDeltaYList.push(scrollDeltaY);
      // if (curTime - prevTouchDeltaYTime > 100) {
      //   touchDeltaYTime = curTime;
      //   scrollDeltaY = touchDeltaYList.reduce((acc, cur) => acc + cur, 0);
      //   console.log(
      //     "Calc touch scrollDeltaY",
      //     scrollDeltaY,
      //     "from",
      //     touchDeltaYList.length,
      //     "elements"
      //   );
      //   scrollBehavior = "smooth";
      //   touchDeltaYList = [];
      // } else {
      //   scrollDeltaY = 0;
      // }
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

  const doScrollWithLock = (scrollDeltaY, behavior) => {
    const isScrollTop = getIsScrollTop(scrollDeltaY);
    const isScrollBottom = getIsScrollBottom(scrollDeltaY);
    let nextScrollY = getNextScrollY(scrollDeltaY);
    const EPS = 20;
    console.log("isScrollTop", isScrollTop, "isScrollBottom", isScrollBottom);
    const needLockScrollTop =
      getNeedLockScrollTop() && isScrollTop && lockScrollY + EPS > nextScrollY;
    const needLockScrollBottom =
      getNeedLockScrollBottom() &&
      isScrollBottom &&
      nextScrollY > lockScrollY - EPS;
    console.log(
      "needLockScrollTop",
      needLockScrollTop,
      "needLockScrollBottom",
      needLockScrollBottom
    );

    const locked = needLockScrollTop || needLockScrollBottom;
    // locked = false;
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

  function preventDefault(e) {
    e.preventDefault();

    const nowTime = Date.now();
    if (nowTime - lockTime < 500) return;

    const { scrollDeltaY, scrollBehavior } = getScrollDeltaY(e);
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
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  window.addEventListener("scroll", onScroll);
  scrollEndedEvent.on(onSmoothScrollEnded);

  return () => {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("touchstart", ontouchstart, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    window.removeEventListener("scroll", onScroll);
    scrollEndedEvent.off(onSmoothScrollEnded);
  };
}
