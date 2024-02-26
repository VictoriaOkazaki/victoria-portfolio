<template>
    <div class="container">
        <button v-show="canPrev" class="slider-arrow" id="arrow-1" @click="prevReview">
            <img src="../assets/images/slider.svg" alt="left" class="slider-arrow__img">
        </button>
        <div class="review__inner">
            <h2 class="review__title title font1">{{ t('title') }}</h2>
            <ul class="review__list" ref="scroller" @scroll="onScroll">
                <li class="review__item" v-for="review in reviews">
                    <span class="review__name text font1">{{ locale === 'ru' ? review.ru_name : review.name }}</span>
                    <a :href="review.link" target="_blank" class="review__site text font1">{{ review.link }}</a>
                    <div class="review__text font2" v-html="locale === 'ru' ? review.ru_text : review.text"></div>
                    <a :href="review.contact" target="_blank" class="review__link review__contact font2">{{ t('contact')
                    }}</a>
                    <a @click="openPopup(review.photo)" class="review__link review__look font2">{{ t('view') }}</a>
                </li>
            </ul>
        </div>
        <button v-show="canNext" class="slider-arrow" id="arrow-2" @click="nextReview">
            <img src="../assets/images/slider.svg" id="slider-2" alt="right" class="slider-arrow__img">
        </button>
    </div>

    <div class="popup" v-show="popupSrc" @click="closePopup">
        <div class="popup__inner" @click.stop>
            <button class="popup__close" @click="closePopup">
                <img src="../assets/images/close.svg" alt="close" class="popup__close-img">
            </button>
            <img :src="popupSrc" alt="screenshot" class="popup__img">
        </div>
    </div>
</template>
<i18n lang="json">
{
    "en": {
        "title": "Reviews from my clients",
        "contact": "Contact",
        "view": "View original"
    },
    "ru": {
        "title": "Отзывы моих клиентов",
        "contact": "Связаться",
        "view": "Посмотреть оригинал"
    }
}
</i18n>
<script setup>
import reviews from 'assets/portfolio-reviews'
import disableScroll from 'disable-scroll';

const popupSrc = ref(null)

const openPopup = (src) => {
    disableScroll.on()
    popupSrc.value = src
}

const closePopup = () => {
    disableScroll.off()
    popupSrc.value = null
}

const scroller = ref(null)
const canPrev = ref(false)
const canNext = ref(false)

const checkCanNextAndPrev = () => {
    const element = scroller.value
    const maxScrollLeft = element.scrollWidth - element.clientWidth
    canPrev.value = element.scrollLeft !== 0
    canNext.value = element.scrollLeft < maxScrollLeft
    // console.log('Check cam next and prev', element.scrollLeft, '/', maxScrollLeft,
    //     'canPrev', canPrev.value, 'canNext', canNext.value)
}

onMounted(() => {
    checkCanNextAndPrev()
})

const onScroll = () => {
    checkCanNextAndPrev()
}

const prevReview = () => {
    // console.log('Prev card')
    const element = scroller.value
    const cardWidth = element.firstElementChild.clientWidth
    element.scrollTo({ left: element.scrollLeft - cardWidth, behavior: 'smooth' })
}

const nextReview = () => {
    // console.log('Next card')
    const element = scroller.value
    const cardWidth = element.firstElementChild.clientWidth
    element.scrollTo({ left: element.scrollLeft + cardWidth, behavior: 'smooth' })
}

const { locale } = useI18n()
const { t } = useI18n({
    useScope: 'local'
})
</script>

<style lang="scss" scoped>
.slider-arrow {
    color: var(--text-color-1);
    opacity: 0.4;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    z-index: 40;
    border: none;
}

#arrow-1 {
    left: 10px;
}

#arrow-2 {
    right: 10px;
}

#slider-2 {
    rotate: 180deg;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 7, 21, 0.9);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;

    &__inner {
        width: fit-content;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__img {
        max-height: 98%;
    }

    &__close {
        color: var(--border-color);
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: .5;
        position: absolute;
        top: 30px;
        right: 30px;
    }
}

.review {
    display: flex;
    position: relative;

    &__inner {
        padding: 60px 0;
    }

    &__title {
        color: var(--text-color-1);
        margin-bottom: 50px;
        white-space: nowrap;
        overflow: hidden;
        width: 23ch;
    }

    &__list {
        display: flex;
        gap: 30px;
        width: 100%;
        scroll-snap-type: x mandatory;
        overflow-x: scroll;
        padding-bottom: 25px;

        &::-webkit-scrollbar {
            width: 12px;
        }

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(105, 120, 209, 0.3);
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(105, 120, 209, 0.5);
        }
    }

    &__item {
        border: 2px solid var(--border-color);
        box-shadow: 1px 1px 1px 1px var(--second-color);
        border-radius: 40px 40px 40px 40px;
        padding: 25px 25px 45px 25px;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
        position: relative;
        scroll-snap-align: start;
        width: calc(50% - 15px);
        flex-grow: 0;
        flex-shrink: 0;
    }

    &__name {
        color: var(--second-color);
    }

    &__site {
        color: var(--border-color);
        margin: 16px 0;

        &:hover {
            color: var(--text-glow-2);
        }
    }

    &__text {
        color: var(--text-color-1);
        font-size: 18px;
        line-height: 25px;
    }

    &__link {
        color: var(--second-color);
        cursor: pointer;
    }

    &__look {
        transition: color .5s ease;

        &:hover {
            color: var(--border-color);
        }
    }

    &__contact {
        margin: 25px 0;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        color: var(--btn-text);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        width: 225px;
        border-radius: 40px;
        border: 1px var(--border-color) solid;
        cursor: pointer;
        transition: background-color .5s ease;

        &:hover {
            background-color: var(--border-color);
        }
    }
}

@media (max-width: 1200px) {
    .review {
        &__item {
            width: 100%;
        }

        &__site {
            color: var(--border-color);
            font-size: 16px;
            margin: 12px 0;
        }

        &__text {
            color: var(--text-color-1);
            font-size: 14px;
            line-height: 20px;
        }

        &__look {
            font-size: 14px;
        }
    }
}

@media (max-width: 1000px) {
    .review {
        &__contact {
            width: 160px;
        }
    }
}

@media (max-width: 500px) {
    #arrow-1 {
        left: 5px;
    }

    #arrow-2 {
        right: 5px;
    }

    .slider-arrow {
        width: 30px;
        height: 30px;
    }

    .slider-arrow__img {
        height: 15px;
    }

    .popup {
        &__inner {
            width: 90%;
            max-height: 80%;
            height: fit-content;
        }

        &__close {
            width: 30px;
            height: 30px;
            top: 10px;
            right: 10px;
        }

        &__close-img {
            height: 12px;
        }
    }

    .review {
        &__item {
            padding: 15px 15px 25px 15px;
        }
    }
}
</style>