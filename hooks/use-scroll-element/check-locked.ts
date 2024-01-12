import { getIsElementVisible } from "./webapi";

export function createCheckLocked({
  getElement,
  getNeedLockScrollTop,
  getNeedLockScrollBottom,
}: {
  getElement: () => HTMLElement;
  getNeedLockScrollTop: () => boolean;
  getNeedLockScrollBottom: () => boolean;
}) {
  let locked = false;
  let lockTime = 0;

  const needLock = (scrollDeltaY: number) => {
    const element = getElement();
    const inViewPort = getIsElementVisible(element);

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

  return (scrollDeltaY: number) => {
    locked = needLock(scrollDeltaY);
    return locked;
  };
}
