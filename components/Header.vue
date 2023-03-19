<template>
    <header class="header">
        <div class="header__inner">
            <NuxtLink to="/">
                <img :src="logoPath" alt="logo" class="logo">
            </NuxtLink>
            <nav class="header__menu">
                <ul class="header__menu-list" :class="{'menu-active': isBurgerOpen}">
                    <li class="header__menu-item font2" v-for="link in links">
                        <a :href="link.href" @click.prevent="clickMenuLink(link)"
                            class="header__menu-link">{{ link.title }}
                        </a>
                    </li>
                </ul>
            </nav>
            <Burger @click="emit('burger-click')" />
        </div>
    </header>
</template>

<i18n lang="json">
{
    "en": {
        "home": "Home",
        "about": "About",
        "works": "Works",
        "skills": "Skills",
        "contacts": "Contacts"
    },
    "ru": {
        "home": "Главная",
        "about": "Обо мне",
        "works": "Работы",
        "skills": "Навыки",
        "contacts": "Контакты"
    }
}
</i18n>

<script setup>
import { useTheme } from '~~/hooks/useTheme';
import logo from '../assets/images/logo.svg';
import logoLight from '../assets/images/logo-l.svg';

const { t } = useI18n({
    useScope: 'local'
})
const links = computed(() => [{
    href: '#',
    title: t('home')
},
{
    href: '#about',
    title: t('about')
},
{
    href: '#works',
    title: t('works')
},
{
    href: '#skills',
    title: t('skills')
},
{
    href: '#contacts',
    title: t('contacts')
}
])

const smoothScrollToSection = (elemId) => {
    const elemToScroll = document.getElementById(elemId);

    elemToScroll?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

const props = defineProps({
    isBurgerOpen: Boolean
})

const emit = defineEmits(['burger-click', 'burger-close'])

const clickMenuLink = (link) => {
    smoothScrollToSection(link.href.substring(1))
    emit('burger-close')
}

const { isLight } = useTheme()
const logoPath = computed(() => {
    if (isLight.value) {
        return logoLight
    }
    return logo
})
</script>

<style lang="scss" scoped>
.header {
    padding-top: 50px;
    z-index: 50;
    &__inner {
        display: flex;
        align-items: center;
    }

    &__menu {
        margin-left: 60px;
    }

    &__menu-list {
        display: flex;
        justify-content: space-between;
    }

    &__menu-item {
        font-weight: 300;
        font-size: 20px;
        line-height: 25px;
        color: var(--text-color-1);
        margin: 0 28px;
        z-index: 100;
        position: relative;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            color: #FF2400;
        }

        &:hover::after {
            content: url(../assets/images/header-hover-effect.svg);
            position: absolute;
            z-index: -5;
            top: -30px;
            left: -20px;
        }
    }
}


@media (max-width: 1600px) {
    .header {
        &__menu-item {
            margin: 0 14px;
        }
    }
}

@media (max-width: 1400px) {
    .header {
        &__menu-item {
            // margin: 0 15px;
            font-size: 18px;
            line-height: 23px;
            &:hover::after {
                content: url(../assets/images/header-hover-effect-small.svg);
                top: -10px;
                left: -10px;
            }
        }
    }
}
@media (max-width: 800px) {
    .header {
        &__menu {
            margin-left: 20px;
        }
        &__menu-item {
            margin: 0 8px;
            font-size: 14px;
            line-height: 17px;
        }
    }
}
@media (max-width: 500px) {
    .header {
        padding-top: 40px;
        position: relative;
        &::before {
            content: url(../assets/images/burger-bg.svg);
            position: absolute;
            bottom: 13%;
            right: -20px;
        }
        &__inner {
            justify-content: space-between;
            
        }
        &__menu-list {
            display: none;
            position: absolute;
            left: 0;
            top: 150%;
        }
        &__menu-item {
            margin: 8px 0;
            font-size: 16px;
            line-height: 21px;
            color: var(--text-color-2);
            &:hover,
            &:active {
                color: #FF2400;
            }
            &:hover::after {
                content: '';
            }
        }
    }
    .menu-active {
        display: flex;
        flex-direction: column;
        animation: 2s alternate slidein;
    }
}
</style>