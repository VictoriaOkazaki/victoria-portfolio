import { createThrottlingFunction } from "./throttling";

export function createElementScrollFuns({
  getActiveIndex,
  getSlidesLength,
  setActiveIndex,
}: {
  getActiveIndex: () => number;
  setActiveIndex: (index: number) => void;
  getSlidesLength: () => number;
}) {
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
  const scrollTopThrottling = createThrottlingFunction(
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
  const scrollBottomThrottling = createThrottlingFunction(
    scrollBottom,
    THROTTLING_TIME_MS
  );

  return {
    scrollTop,
    scrollBottom,
    scrollBottomThrottling,
    scrollTopThrottling,
    getNeedLockScrollTop,
    getNeedLockScrollBottom,
  };
}
