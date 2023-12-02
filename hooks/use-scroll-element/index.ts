import { disableScroll, enableScroll, prepareForDisableScroll } from "./disable-scroll"

type Params = {
    getElement: () => HTMLElement
    getActiveIndex: () => number
    setActiveIndex: (index: number) => void
    getSlidesLength: () => number
}

export function useScrollElement({
    getElement,
    getSlidesLength,
    getActiveIndex,
    setActiveIndex
}: Params) {
    let scrollDisabled = false
    let onScrollDisabled = false
    let interval: any

    const _enableScroll = () => {
        enableScroll()
        scrollDisabled = false
    }

    const _disableScroll = () => {
        disableScroll()
        onScrollDisabled = true
    }

    const checkElementVisible = () => {
        const element = getElement()
        const isVisible = getIsVisible(element)
        if (!isVisible && onScrollDisabled) {
            // console.log('Enable check scroll event (interval)')
            onScrollDisabled = false
        }
        if (scrollDisabled && !isVisible) {
            // console.log('Enable scroll (interval)')
            _enableScroll()
        }
    }

    const onScroll = () => {
        if (onScrollDisabled) return
        const element = getElement()
        const isVisible = getIsVisible(element)

        if (isVisible && !scrollDisabled) {
            // console.log('disable scroll')
            _disableScroll()
        }
    }

    const scrollTop = () => {
        // console.log('onPreventedScrollTop')
        const newIndex = getActiveIndex() - 1

        if (newIndex >= 0) {
            setActiveIndex(newIndex)
        } else {
            // console.log('Enable scroll (onPreventedScrollTop)')
            _enableScroll()
        }
    }
    const onPreventedScrollTop = createThrottlingFunction(scrollTop, 1000)

    const scrollBottom = () => {
        // console.log('onPreventedScrollBottom')
        const newIndex = getActiveIndex() + 1

        const slidesLength = getSlidesLength()
        if (newIndex < slidesLength) {
            setActiveIndex(newIndex)
        } else {
            // console.log('Enable scroll (onPreventedScrollBottom)')
            _enableScroll()
        }
    }
    const onPreventedScrollBottom = createThrottlingFunction(scrollBottom, 1000)

    onMounted(() => {
        prepareForDisableScroll({
            onScrollTop: onPreventedScrollTop,
            onScrollDown: onPreventedScrollBottom
        })
        // window.enableScroll = _enableScroll
        window.addEventListener('scroll', onScroll)
        interval = setInterval(checkElementVisible, 1000)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll)
        clearInterval(interval)
    })

    return {
        scrollTop,
        scrollBottom
    }
}

function getIsVisible(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const elemToTop = rect.top;
    const elemToBottom = window.innerHeight - rect.bottom
    const isVisible = elemToTop >= 0 && elemToBottom >= 0;

    return isVisible
}

function createThrottlingFunction(operation: () => void, throttlingInterval: number): () => void {
    let lastTime = 0
    const func = () => {
        const curTime = Date.now();
        if (curTime - lastTime < throttlingInterval) {
            return
        }

        lastTime = curTime;
        operation()
    };
    return func;
}