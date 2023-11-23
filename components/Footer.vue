<template>
    <div class="footer__inner">
        <div class="footer__top" @click="scrollOnTopOfPage">
            <img src="../assets/images/to-top.svg" alt="to top button" class="footer__top-img">
            <span class="footer__top-text font3">{{ t('toTop') }}</span>
        </div>
        <div class="footer__content">
            <div class="footer__contacts">
                <ul class="footer__social">
                    <li class="footer__social-item">
                        <a href="https://wa.me/994519980147" target="_blank" class="footer__social-link">
                            <img :src="wpPath" alt="whatsapp" class="footer__social-img">
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://t.me/Ameshiro" target="_blank" class="footer__social-link">
                            <img :src="tgPath" alt="telegram" class="footer__social-img">
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://github.com/VictoriaOkazaki?tab=repositories" target="_blank"
                            class="footer__social-link">
                            <img :src="gitPath" alt="github" class="footer__social-img">
                        </a>
                    </li>
                    <li class="hero__social-item">
                        <a href="https://www.behance.net/kazakovviktori" class="hero__social-link" target="_blank">
                            <img :src="behancePath" alt="behance" class="hero__social-img">
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://www.linkedin.com/in/%D0%B2%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%8F-%D0%BA%D0%B0%D0%B7%D0%B0%D0%BA%D0%BE%D0%B2%D0%B0-156399199/"
                            target="_blank" class="footer__social-link">
                            <img :src="linkedPath" alt="linkedin" class="footer__social-img">
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="mailto:victoria.timein@gmail.com" target="_blank" class="footer__social-link">
                            <img :src="emailPath" alt="email" class="footer__social-img">
                        </a>
                    </li>
                    <li class="footer__social-item">
                        <a href="https://www.instagram.com/okazakivictoria1807" target="_blank" class="footer__social-link">
                            <img :src="instaPath" alt="instagram" class="footer__social-img">
                        </a>
                    </li>
                </ul>
                <a href="tel:994519980147" class="footer__contacts-link font2" id="phone">+994 51 998 01 47</a>
                <a href="mailto:victoria.timein@gmail.com" class="footer__contacts-link font2"
                    id="email">victoria.timein@gmail.com</a>
            </div>
            <span class="footer__copyright font2">@2023 {{ t('copyright') }}</span>
            <NuxtLink to="/" class="footer__logo">
                <img :src="logoPath" alt="logo" class="logo">
            </NuxtLink>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "toTop": "back to top",
        "copyright": "Kazakova Victoria. All Rights Reserved."
    },
    "ru": {
        "toTop": "наверх",
        "copyright": "Казакова Виктория. Все права защищены."
    }
}
</i18n>

<script setup>
import { useTheme } from '~~/hooks/useTheme';
import logo from '../assets/images/logo.svg';
import logoLight from '../assets/images/logo-l.svg';

import wp from '../assets/images/social/whatsapp.svg';
import wpLight from '../assets/images/social/whatsapp-l.svg';
import tg from '../assets/images/social/telegram.svg';
import tgLight from '../assets/images/social/telegram-l.svg';
import git from '../assets/images/social/github.svg';
import gitLight from '../assets/images/social/github-l.svg';
import linked from '../assets/images/social/linkedin.svg';
import linkedLight from '../assets/images/social/linkedin-l.svg';
import email from '../assets/images/social/mail.svg';
import emailLight from '../assets/images/social/mail-l.svg';
import insta from '../assets/images/social/instagram.svg';
import instaLight from '../assets/images/social/instagram-l.svg';
import behance from '../assets/images/social/behance.svg';
import behanceLight from '../assets/images/social/behance-l.svg';

const { t } = useI18n({
    useScope: 'local'
})

const scrollOnTopOfPage = () => {
    const elemToScroll = document.querySelector('.header');

    elemToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

const { isLight } = useTheme()
const logoPath = computed(() => {
    if (isLight.value) {
        return logoLight
    }
    return logo
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
const emailPath = computed(() => {
    if (isLight.value) {
        return emailLight
    }
    return email
})
const instaPath = computed(() => {
    if (isLight.value) {
        return instaLight
    }
    return insta
})
const behancePath = computed(() => {
    if (isLight.value) {
        return behanceLight
    }
    return behance
})
</script>

<style lang="scss" scoped>
.footer {
    &__inner {
        padding: 50px 0;
    }

    &__top {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

    &__top-text {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: var(--text-color-1);
    }

    &__content {
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__contacts {
        display: flex;
        flex-direction: column;
    }

    &__contacts-link {
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;
        color: var(--text-color-1);

        &:hover {
            color: var(--second-color);
        }
    }

    #phone {
        margin: 30px 0;
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

    &__copyright {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: var(--text-color-1);
    }
}

@media (max-width: 1200px) {
    .footer {
        &__inner {
            padding: 40px 0;
        }

        &__content {
            margin-top: 40px;
        }

        &__contacts-link {
            font-size: 16px;
            line-height: 20px;
        }

        &__copyright {
            font-size: 12px;
            line-height: 15px;
        }
    }
}

@media (max-width: 800px) {
    .footer {
        &__content {
            flex-direction: column;
            align-items: flex-start;
        }

        &__logo {
            order: -1;
            margin-bottom: 60px;
        }

        #phone {
            margin: 20px 0;
        }

        #email {
            margin-bottom: 60px;
        }

    }

}

@media (max-width: 500px) {
    .footer {
        &__top-text {
            font-size: 16px;
            line-height: 19px;
        }

        &__content {
            margin-top: 60px;
        }

        &__social-item {
            margin: 0 7.5px;
        }

        &__social-img {
            width: 18px;
            height: 18px;
        }
    }
}

@media (max-width: 340px) {
    .footer {
        &__copyright {
            font-size: 10px;
            line-height: 12.5px;
        }
    }
}
</style>