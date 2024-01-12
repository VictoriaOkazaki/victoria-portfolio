// import { subscribeDisableScroll } from "./my-disable-scroll";
import { createCheckLocked } from "./check-locked";
import { createElementScrollFuns } from "./element-scroll";
import { createScrollDeltaYFuns } from "./scroll-delta";
import {
  createSubscribeBeforeScroll,
  createSubscribeScroll,
} from "./scroll-events";

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
  const {
    scrollTop,
    scrollBottom,
    scrollBottomThrottling,
    scrollTopThrottling,
    getNeedLockScrollTop,
    getNeedLockScrollBottom,
  } = createElementScrollFuns({
    getActiveIndex,
    getSlidesLength,
    setActiveIndex,
  });

  onMounted(() => {
    const checkLocked = createCheckLocked({
      getElement,
      getNeedLockScrollBottom,
      getNeedLockScrollTop,
    });
    const { getScrollDeltaY, subscribeTouchStart } = createScrollDeltaYFuns();
    const { subscribeBeforeScroll } = createSubscribeBeforeScroll({
      checkLocked,
      getScrollDeltaY,
      onPreventedScrollBottom: scrollBottomThrottling,
      onPreventedScrollTop: scrollTopThrottling,
    });
    const { subscribeScroll } = createSubscribeScroll({ checkLocked });

    const unsubscribeScroll = subscribeScroll();
    const unsubscribeTouchStart = subscribeTouchStart();
    const unsubscribeBeforeScroll = subscribeBeforeScroll();

    // const unsubscribeDisableScroll = subscribeDisableScroll({
    //   lockScrollY: 1200,
    //   onScrollTop: onPreventedScrollTop,
    //   onScrollDown: onPreventedScrollBottom,
    //   getNeedLockScrollTop,
    //   getNeedLockScrollBottom,
    // });

    return () => {
      // unsubscribeDisableScroll();
      unsubscribeScroll();
      unsubscribeTouchStart();
      unsubscribeBeforeScroll();
    };
  });

  return {
    scrollTop,
    scrollBottom,
  };
}
