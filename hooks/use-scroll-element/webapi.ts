export function getWheelOpt() {
  let supportsPassive = false;
  try {
    (window as any).addEventListener(
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
  return wheelOpt;
}

export function getWheelEventName() {
  return "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
}

export function getIsElementVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const elemToTop = rect.top;
  const elemToBottom = window.innerHeight - rect.bottom;
  const isVisibleTop = elemToTop >= 0;
  const isVisibleBottom = elemToBottom >= 0;
  const isVisible = isVisibleTop && isVisibleBottom;

  return isVisible;
}

export function getScrollTop() {
  return document.scrollingElement?.scrollTop || 0;
}
