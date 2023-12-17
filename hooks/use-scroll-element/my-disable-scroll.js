// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const KEY_UP_CODE = 38;
const KEY_DOWN_CODE = 40;
var keys = { 37: 1, [KEY_UP_CODE]: 1, 39: 1, [KEY_DOWN_CODE]: 1 };

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

let lastDeltaYTime = Date.now();
let speedDeltaYValue = 0;
let startSpeedTime = null;
let lastSpeedSign = 0;
function getScrollDeltaY(e) {
  const { wheelDeltaY, changedTouches, keyCode } = e;

  if (wheelDeltaY !== undefined) {
    return wheelDeltaY;
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
      // console.log("speed for scroll scrollDeltaY", scrollDeltaY);
      speedDeltaYValue += Math.abs(scrollDeltaY / 15);
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

  if (scrollDeltaY !== 0) {
    if (scrollDeltaY > 0) {
      scrollDeltaY += speedDeltaYValue;
    }
    if (scrollDeltaY < 0) {
      scrollDeltaY -= speedDeltaYValue;
    }
  }

  return scrollDeltaY;
}

export function subscribeDisableScroll({
  lockScrollY,
  onScrollTop,
  onScrollDown,
  getNeedLockScrollTop,
  getNeedLockScrollBottom,
}) {
  let isPauseScroll = false;
  let lockTime = Date.now();
  function preventDefault(e) {
    e.preventDefault();

    const nowTime = Date.now();
    if (nowTime - lockTime < 500) return;

    const scrollDeltaY = getScrollDeltaY(e);
    const isScrollTop = scrollDeltaY > 0;
    const isScrollBottom = !isScrollTop;

    if (isPauseScroll) {
      if (scrollDeltaY !== 0) {
        const handler = isScrollTop ? onScrollTop : onScrollDown;
        const result = handler();
        // console.log("result res", result);
        if (result) {
          // console.warn("UNLOCK SCROLL!!!");
          isPauseScroll = false;
        }
        lockTime = Date.now();
      }
      return;
    }

    const { scrollTop: prevScroolTop } = document.scrollingElement;
    let curScrollY = prevScroolTop - scrollDeltaY;
    let behavior = "instant";
    const EPS = 20;
    const needLockScrollTop =
      getNeedLockScrollTop() && isScrollTop && lockScrollY + EPS > curScrollY;
    const needLockScrollBottom =
      getNeedLockScrollBottom() &&
      isScrollBottom &&
      curScrollY > lockScrollY - EPS;
    // console.log(
    //   "needLockScrollTop",
    //   needLockScrollTop,
    //   "needLockScrollBottom",
    //   needLockScrollBottom
    // );
    if (needLockScrollTop || needLockScrollBottom) {
      // console.warn("LOCK SCROLL!!!");
      isPauseScroll = true;
      curScrollY = lockScrollY;
      behavior = "smooth";
      lockTime = Date.now();
    }
    window.scrollTo({
      behavior,
      top: curScrollY,
    });
    // console.log(
    //   "scrollDeltaY",
    //   scrollDeltaY,
    //   "prevScroolTop",
    //   prevScroolTop,
    //   "curScrollY",
    //   curScrollY
    // );
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

  return () => {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("touchstart", ontouchstart, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  };
}
