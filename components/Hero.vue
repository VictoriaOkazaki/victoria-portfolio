<template>
    <section class="hero">
        <div class="hero__inner">
            <div class="hero__btns">
                <div class="hero__btns-langs">
                    <div v-for="l in locales" class="hero__btns-lang" :class="{ 'active': l.code === locale }"
                        @click="setLocale(l.code)">
                        {{ l.code }}
                    </div>
                </div>
                <div class="hero__btns-light" @click="changeTheme">
                    <img :src="lampPath" alt="" class="hero__btns-img">
                    <label class="switch">
                        <input type="checkbox" :checked="isLight" @click="changeTheme">
                        <div class="slider round" :class="{ 'slider-burger': isBurgerOpen }"></div>
                    </label>
                </div>
            </div>
            <div class="hero__content">
                <ul class="hero__social">
                    <li class="hero__social-item">
                        <a href="https://wa.me/994519980147" class="hero__social-link" target="_blank">
                            <img :src="wpPath" alt="whatsapp" class="hero__social-img">
                        </a>
                    </li>
                    <li class="hero__social-item">
                        <a href="https://t.me/Ameshiro" class="hero__social-link" target="_blank">
                            <img :src="tgPath" alt="telegram" class="hero__social-img">
                        </a>
                    </li>
                    <li class="hero__social-item">
                        <a href="https://github.com/VictoriaOkazaki?tab=repositories" class="hero__social-link"
                            target="_blank">
                            <img :src="gitPath" alt="github" class="hero__social-img">
                        </a>
                    </li>
                    <li class="hero__social-item">
                        <a href="https://www.behance.net/kazakovviktori" class="hero__social-link" target="_blank">
                            <img :src="behancePath" alt="behance" class="hero__social-img">
                        </a>
                    </li>
                    <li class="hero__social-item">
                        <a href="https://www.linkedin.com/in/%D0%B2%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%8F-%D0%BA%D0%B0%D0%B7%D0%B0%D0%BA%D0%BE%D0%B2%D0%B0-156399199/"
                            class="hero__social-link" target="_blank">
                            <img :src="linkedPath" alt="linkedin" class="hero__social-img">
                        </a>
                    </li>
                </ul>
                <h2 class="hero__name font1">{{ t('name') }}</h2>
                <h1 class="hero__title font3">{{ t('prof-1') }} <br> {{ t('prof-2') }}</h1>
            </div>
            <div class="hero__btn-cont">
                <a class="hero__btn font2" href="#contacts" @click.prevent="smoothScrollToSection('contacts')">
                    {{ t('btn') }}
                </a>
            </div>
        </div>
    </section>
</template>

<i18n lang="json">
{
    "en": {
        "name": "Victoria Kazakova",
        "prof-1": "UI/UX Designer",
        "prof-2": "Frontend Developer",
        "btn": "Contact me"
    },
    "ru": {
        "name": "Виктория Казакова",
        "prof-1": "UI/UX дизайнер",
        "prof-2": "Фронтенд разработчик",
        "btn": "Связаться со мной"
    }
}
</i18n>

<script setup>
import { useTheme } from '~~/hooks/useTheme';
import lamp from '../assets/images/lamp.svg';
import lampLight from '../assets/images/lamp-l.svg';
import wp from '../assets/images/social/whatsapp.svg';
import wpLight from '../assets/images/social/whatsapp-l.svg';
import tg from '../assets/images/social/telegram.svg';
import tgLight from '../assets/images/social/telegram-l.svg';
import git from '../assets/images/social/github.svg';
import gitLight from '../assets/images/social/github-l.svg';
import linked from '../assets/images/social/linkedin.svg';
import linkedLight from '../assets/images/social/linkedin-l.svg';
import behance from '../assets/images/social/behance.svg';
import behanceLight from '../assets/images/social/behance-l.svg';

import { useBurger } from '~~/hooks/useBurger';

const { isBurgerOpen } = useBurger()

const { locale, locales, setLocale } = useI18n()
const { t } = useI18n({
    useScope: 'local'
})

const smoothScrollToSection = (elemId) => {
    const elemToScroll = document.getElementById(elemId);

    elemToScroll?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    console.log('smooth')
}

const { isLight } = useTheme()
const changeTheme = async () => {
    isLight.value = !isLight.value
}

const lampPath = computed(() => {
    if (isLight.value) {
        return lampLight
    }
    return lamp
})
const wpPath = computed(() => {
    if (isLight.value) {
        return wpLight
    }
    return wp
})
const tgPath = computed(() => {
    if (isLight.value) {
        return tgLight
    }
    return tg
})
const gitPath = computed(() => {
    if (isLight.value) {
        return gitLight
    }
    return git
})
const linkedPath = computed(() => {
    if (isLight.value) {
        return linkedLight
    }
    return linked
})
const behancePath = computed(() => {
    if (isLight.value) {
        return behanceLight
    }
    return behance
})
</script>

<style lang="scss" scoped>
.hero {
    &__btns {
        margin-bottom: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__btns-langs {
        display: flex;
    }

    &__btns-lang {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 20.4px;
        color: var(--text-color-1);
        text-transform: uppercase;
        border: 1px var(--second-color) solid;
        padding: 1px 6px;
        cursor: pointer;

        &:last-child {
            margin-left: 20px;
        }
    }

    &__btns-light {
        cursor: pointer;
        z-index: 50;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }

    &__btns-lang.active {
        color: var(--special-color);
    }

    &__btns-img {
        width: 52px;
        height: 64px;
    }

    &__content {
        border: 2px var(--border-color) solid;
        border-radius: 40px 0px;
        border-bottom: none;
        padding: 40px 40px 20px;
    }

    &__social {
        display: flex;
    }

    &__social-item {
        margin: 0 10px;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            box-shadow: rgba(18, 243, 216, 0.2) 5px 5px 20px;
        }
    }

    &__name {
        margin: 40px 0 80px;
        font-weight: 500;
        font-size: 48px;
        line-height: 62px;
        color: var(--text-color-1);
    }

    &__title {
        width: 20ch;
        font-weight: 400;
        font-size: 48px;
        line-height: 58px;
        color: var(--text-color-1);
        white-space: nowrap;
        overflow: hidden;
    }

    &__btn-cont {
        position: absolute;
        bottom: 130px;
        right: 100px;
        border: none;
        font-weight: 400;
        font-size: 22px;
        line-height: 28px;
        color: var(--btn-text);
        width: 190px;
        height: 190px;
        border-radius: 100px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-image: var(--btn-grad);

        &:hover {
            background-image: var(--btn-grad-hov);
        }
    }
}

// https://codepen.io/EssSaibot/pen/zZmZbP
.switch {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 2px;
    margin-bottom: 10px;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--second-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider-burger {
    background-color: #f662ac;
}

.slider:before {
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    left: 4px;
    bottom: 0.6px;
    background-color: var(--special-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked+.slider {
    background-color: #200E00;
}

input:focus+.slider {
    box-shadow: 0 0 1px #6978D1;
}

input:checked+.slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

@media (max-width: 1300px) {
    .hero {
        &__btns {
            margin-bottom: 40px;
        }

        &__btns-lang {
            font-size: 14px;
            line-height: 18px;
        }

        &__name {
            margin: 30px 0 60px;
            font-size: 46px;
            line-height: 59px;
        }

        &__title {
            font-size: 46px;
            line-height: 56px;
        }

        &__btn-cont {
            right: 0;
            width: 150px;
            height: 150px;
            bottom: 100px;
            font-size: 20px;
            line-height: 26px;
        }
    }
}

@media (max-width: 700px) {
    .hero {
        &__btns {
            margin-bottom: 30px;
        }

        &__btns-lang {
            font-size: 14px;
            line-height: 18px;
        }

        &__btns-img {
            width: 40px;
            height: 49px;
        }

        &__content {
            padding: 30px 30px 10px;
        }

        &__name {
            margin: 30px 0 60px;
            font-size: 42px;
            line-height: 54px;
        }

        &__title {
            font-size: 42px;
            line-height: 51px;
        }

        &__btn-cont {
            right: 0;
            width: 120px;
            height: 120px;
            bottom: 100px;
            font-size: 18px;
            line-height: 21px;
        }
    }

    .switch {
        width: 30px;
        height: 2px;
        margin-bottom: 10px;
    }

    .slider:before {
        height: 7px;
        width: 7px;
        left: 2px;
    }

    input:checked+.slider:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }
}

@media (max-width: 500px) {
    .hero {
        &__inner {
            display: flex;
            flex-direction: column;
        }

        &__btns {
            order: -2;
        }

        &__btns-lang {
            font-size: 12px;
            line-height: 15px;

            &:last-child {
                margin-left: 10px;
            }
        }

        &__name {
            margin: 20px 0 40px;
            font-size: 30px;
            line-height: 38px;
        }

        &__title {
            font-size: 32px;
            line-height: 38px;
        }

        &__btn-cont {
            order: -1;
            position: unset;
            font-size: 16px;
            line-height: 20px;
            display: flex;
            width: 100%;
            justify-content: flex-end;
            background: none;
        }

        &__btn {
            width: 110px;
            height: 110px;
            border-radius: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background-image: var(--btn-grad);

            &:hover {
                background-image: var(--btn-grad-hov);
            }
        }
    }
}

@media (max-width: 400px) {
    .hero {
        &__social-item {
            margin: 0 8px;
        }

        &__social-img {
            width: 18px;
            height: 18px;
        }

        &__name {
            font-size: 25px;
            line-height: 32px;
        }

        &__title {
            font-size: 22px;
            line-height: 26px;
        }

        &__btn-cont {
            font-size: 14px;
            line-height: 17px;
        }

        &__btn {
            width: 90px;
            height: 90px;
        }
    }
}
</style>