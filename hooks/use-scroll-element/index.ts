import { subscribeDisableScroll } from "./my-disable-scroll";
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
    console.log("onPreventedScrollTop");

    if (getNeedLockScrollTop()) {
      setActiveIndex(getNextScrollTopIndex());
    }

    if (!getNeedLockScrollTop()) {
      console.log("Enable scroll (onPreventedScrollTop)");
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
    console.log("onPreventedScrollBottom");

    if (getNeedLockScrollBottom()) {
      setActiveIndex(getNextScrollBottomIndex());
    }

    if (!getNeedLockScrollBottom()) {
      console.log("Enable scroll (onPreventedScrollBottom)");
      return true;
    }

    return false;
  };
  const onPreventedScrollBottom = createThrottlingFunction(
    scrollBottom,
    THROTTLING_TIME_MS
  );

  onMounted(() => {
    const unsubscribeDisableScroll = subscribeDisableScroll({
      lockScrollY: 1200,
      onScrollTop: onPreventedScrollTop,
      onScrollDown: onPreventedScrollBottom,
      getNeedLockScrollTop,
      getNeedLockScrollBottom,
    });

    return () => {
      unsubscribeDisableScroll();
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
