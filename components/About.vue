<template>
    <div class="about__inner">
        <div class="about__top">
            <h2 class="about__top-title title font1">{{ t('title') }}</h2>
            <div class="about__top-container">
                <p class="about__top-text text font2">{{ t('text') }}</p>
            </div>
        </div>
        <div class="about__bottom">
            <h3 class="about__bottom-title font1">{{ t('subtitle') }}</h3>
            <ul class="about__jobs">
                <li class="about__jobs-item">
                    <img :src="job1Path" alt="" class="about__jobs-img">
                    <ul class="about__job">
                        <li class="about__job-item text font2">{{ t('job-1-1') }}</li>
                        <li class="about__job-item text font2">{{ t('job-1-2') }}</li>
                    </ul>
                </li>
                <li class="about__jobs-item">
                    <img :src="job2Path" alt="" class="about__jobs-img">
                    <ul class="about__job">
                        <li class="about__job-item text font2">{{ t('job-2-1') }}</li>
                        <li class="about__job-item text font2">{{ t('job-2-2') }}</li>
                        <li class="about__job-item text font2">{{ t('job-2-3') }}</li>
                        <li class="about__job-item text font2">{{ t('job-2-4') }}</li>
                    </ul>
                </li>
                <li class="about__jobs-item">
                    <img :src="job3Path" alt="" class="about__jobs-img">
                    <ul class="about__job">
                        <li class="about__job-item text font2">{{ t('job-3-1') }}</li>
                        <li class="about__job-item text font2">{{ t('job-3-2') }}</li>
                    </ul>
                </li>
                <li class="about__jobs-item">
                    <img :src="job4Path" alt="" class="about__jobs-img">
                    <ul class="about__job">
                        <li class="about__job-item text font2">{{ t('job-4-1') }}</li>
                        <li class="about__job-item text font2">{{ t('job-4-2') }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "title": "About me",
        "text": "My name is Victoria and i live in Baku city. I graduated from Moscow State Univercity at 2020. I started creating sites from Tilda and Webflow constructors. I continued my work on websites development after i got my hand in programming and markup languages.",
        "subtitle": "My job is in:",
        "job-1-1": "site layout preparation in Figma;",
        "job-1-2": "logo development;",
        "job-2-1": "making a website with HTML, CSS (or SASS) and Javascript;",
        "job-2-2": "connecting animations;",
        "job-2-3": "making adaptation of websites for various devices;",
        "job-2-4": "building layouts on Tilda using Zero blocks;",
        "job-3-1": "organizing CMS systems on Wordpress and database connect;",
        "job-3-2": "building sites using Wordpress themes and Elementor templates;",
        "job-4-1": "site transfer to hosting, domain connection;",
        "job-4-2": "website development and problem solving."
    },
    "ru": {
        "title": "Обо мне",
        "text": "Меня зовут Виктория, и я живу в Баку. Окончила в 2020 году Московский Государственный Университет. Изучение веб-разработки начала с конструкторов Tilda и Webflow. Я продолжила работу над созданием сайтов после освоения языков верстки и программирования.",
        "subtitle": "Моя работа состоит в:",
        "job-1-1": "создании макета сайта на Figma;",
        "job-1-2": "разработке логотипа;",
        "job-2-1": "верстке сайта с помощью HTML, CSS (или SASS) и Javascript;",
        "job-2-2": "подключении анимаций;",
        "job-2-3": "адаптации сайта под различные устройства;",
        "job-2-4": "построении макета на Tilda с использованием зеро-блоков;",
        "job-3-1": "организации CMS систем на Wordpress и подключении базы данных;",
        "job-3-2": "построении сайта с использованием тем Wordpress и шаблонов Elementor;",
        "job-4-1": "переносе сайта на хостинг, подключении домена;",
        "job-4-2": "доработке сайта и решении различных проблем."
    }
}
</i18n>

<script setup>
import { useTheme } from '~~/hooks/useTheme';
import job1 from '../assets/images/jobs/job-1.svg'
import job1Light from '../assets/images/jobs/job-1-l.svg'
import job2 from '../assets/images/jobs/job-2.svg'
import job2Light from '../assets/images/jobs/job-2-l.svg'
import job3 from '../assets/images/jobs/job-3.svg'
import job3Light from '../assets/images/jobs/job-3-l.svg'
import job4 from '../assets/images/jobs/job-4.svg'
import job4Light from '../assets/images/jobs/job-4-l.svg'

const { t } = useI18n({
    useScope: 'local'
})

const { isLight } = useTheme()
const job1Path = computed(() => {
    if (isLight.value) {
        return job1Light
    }
    return job1
})
const job2Path = computed(() => {
    if (isLight.value) {
        return job2Light
    }
    return job2
})
const job3Path = computed(() => {
    if (isLight.value) {
        return job3Light
    }
    return job3
})
const job4Path = computed(() => {
    if (isLight.value) {
        return job4Light
    }
    return job4
})
</script>

<style lang="scss" scoped>
.about {
    &__inner {
        padding: 100px 0;
    }

    &__top {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: relative;
    }

    &__top-title {
        width: 8ch;
        white-space: nowrap;
        overflow: hidden;
        position: absolute;
        left: 0;
        color: var(--text-color-2);
    }

    &__top-text {
        color: var(--text-color-2);
    }

    &__top-container {
        width: 65.6%;
        margin-top: 100px;
        border: 2px var(--border-color) solid;
        border-radius: 40px 0px;
        padding: 40px 70px 30px;
    }

    &__bottom-title {
        width: 13ch;
        white-space: nowrap;
        overflow: hidden;
        margin: 70px 0 50px;
        font-weight: 400;
        font-size: 30px;
        line-height: 39px;
        color: var(--text-color-2);
    }

    &__jobs {
        width: 74%;
        border: 2px var(--border-color) solid;
        border-radius: 40px 0px;
        padding: 40px 10px 40px 70px;
    }

    &__jobs-item {
        display: flex;
        align-items: flex-start;
        margin: 30px 0;

        &:first-child {
            margin-top: 0;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__jobs-img {
        width: 42px;
        height: 42px;
        margin-right: 20px;
    }

    &__job {
        display: flex;
        flex-direction: column;
    }

    &__job-item {
        color: var(--text-color-2);

        &::before {
            content: "•";
            color: var(--text-color-2);
            display: inline-block;
            margin-right: 15px;
        }
    }
}

@media (max-width: 1200px) {
    .about {
        &__inner {
            padding: 80px 0;
        }

        &__top-container {
            width: 85.6%;
            margin-top: 80px;
            padding: 30px 50px 20px;
        }

        &__bottom-title {
            margin: 70px 0 40px;
            font-weight: 400;
            font-size: 28px;
            line-height: 37px;
        }

        &__jobs {
            width: 84%;
            padding: 30px 10px 30px 50px;
        }

        &__jobs-img {
            width: 41px;
            height: 41px;
        }
    }
}

@media (max-width: 700px) {
    .about {

        &__top-container {
            width: 100%;
        }

        &__bottom-title {
            font-size: 26px;
            line-height: 34px;
        }

        &__jobs {
            width: 100%;
        }

        &__jobs-img {
            width: 36px;
            height: 36px;
        }
    }
}

@media (max-width: 500px) {
    .about {
        &__inner {
            padding: 60px 0;
        }
        &__top-container {
            padding-left: 20px;
            padding-right: 20px;
        }
        &__bottom-title {
            font-size: 20px;
            line-height: 26px;
            margin: 50px 0 30px;
        }

        &__jobs {
            padding-right: 20px;
            padding-left: 20px;
        }

        &__jobs-img {
            width: 28px;
            height: 28px;
            margin-right: 10px;
        }
    }
}</style>