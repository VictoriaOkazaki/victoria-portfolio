// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

const KEY_UP_CODE = 38
const KEY_DOWN_CODE = 40
var keys = { 37: 1, [KEY_UP_CODE]: 1, 39: 1, [KEY_DOWN_CODE]: 1 };

let _onScrollTop = () => { }
let _onScrollDown = () => { }

let prevTouchScreenY = null
function preventDefault(e) {
    e.preventDefault();
    const { wheelDeltaY, touches, keyCode } = e
    // console.log('prevent default', e)

    let scrollDeltaY = 0

    if (wheelDeltaY !== undefined) {
        scrollDeltaY = wheelDeltaY
    }

    if (touches !== undefined && touches[0]) {
        const { screenY: touchScreenY } = touches[0]
        // console.log('prevented touch touchScreenY', touchScreenY, 'prevTouchScreenY', prevTouchScreenY)
        if (prevTouchScreenY !== null) {
            scrollDeltaY = touchScreenY - prevTouchScreenY
            prevTouchScreenY = null
        } else {
            prevTouchScreenY = touchScreenY
        }
    }

    if (scrollDeltaY) {
        // console.log('prevented scrollDeltaY', scrollDeltaY)
        if (scrollDeltaY > 0) {
            _onScrollTop()
        }
        if (scrollDeltaY < 0) {
            _onScrollDown()
        }
    }

    if (keyCode === KEY_UP_CODE) {
        _onScrollTop()
    }

    if (keyCode === KEY_DOWN_CODE) {
        _onScrollDown()
    }
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
var wheelOpt = null
var wheelEvent = null
export function prepareForDisableScroll({ onScrollTop, onScrollDown }) {
    _onScrollTop = onScrollTop
    _onScrollDown = onScrollDown

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () { supportsPassive = true; }
        }));
    } catch (e) { }

    wheelOpt = supportsPassive ? { passive: false } : false;
    wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
}

// call this to Disable
export function disableScroll() {
    if (!wheelEvent || !wheelOpt) {
        throw new Error('Call prepareForDisableScroll first')
    }
    // console.log('disable-scroll')
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
export function enableScroll() {
    if (!wheelEvent || !wheelOpt) {
        throw new Error('Call prepareForDisableScroll first')
    }
    // console.log('enable-scroll')
    prevTouchScreenY = null
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}