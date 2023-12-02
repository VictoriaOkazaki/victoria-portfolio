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
            <ul class="about__jobs" ref="jobsRef">
                <li class="about__jobs-item" v-for="job, index in jobs"
                    :class="{ 'unvisible': index !== activeIndex, 'active': index === activeIndex }">
                    <div class="about__job-count">
                        <img :src="job.path" alt="" class="about__jobs-img">
                        <div class="font2">{{ activeIndex + 1 }} / {{ jobs.length }}</div>
                    </div>
                    <ul class="about__job">
                        <li class="about__job-item text font2" v-for="jobId in job.ids">{{ t(`job-${jobId}`) }}</li>
                    </ul>
                    <div class="about__bottom-arrow-cont">
                        <img @click="scrollTop" src="../assets/images/arrow.svg" alt="arrow" class="arrow top">
                        <img @click="scrollBottom" src="../assets/images/arrow.svg" alt="arrow" class="arrow">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "title": "About me",
        "text": "My name is Victoria and i live in Baku city. I graduated from Moscow State Univercity at 2020. I started creating sites from Tilda and Webflow constructors. Then I got my hand in HTML, CSS, Javascript and SCSS preprocessor. I worked with the Gulp assembler, then decided to use something more modern and convenient. So I switched to using Vue and Nuxt3 in my work. In 2023, I decided to master web design and now I can create a prototype and website design myself.",
        "subtitle": "What I can offer you:",
        "job-1": "an interview with you (orally, in writing) to draw up technical specifications, competitor analysis",
        "job-2": "site prototype and layout preparation in Figma",
        "job-3": "logo and favicon development",
        "job-4": "content prepare — photos (from stock or neural networks) and writing texts",
        "job-5": "making a website with HTML, CSS (or SASS) and Javascript",
        "job-6": "connecting animations",
        "job-7": "making adaptation of websites for various devices",
        "job-8": "building layouts on Tilda using Zero blocks (i work also with Flexbe and Tinkoff constructors);",
        "job-9": "building a website using Wordpress themes and Elementor constructor",
        "job-10": "development of an admin panel for content management",
        "job-11": "writing the main meta tags (title, description, h1) and adding the site to the results of Google and Yandex browsers;",
        "job-12": "landing a website on CMS Wordpress, creating an online store using WooCommerce",
        "job-13": "site transfer to hosting, domain connection",
        "job-14": "primary SEO optimization",
        "job-15": "connecting statistics collection — Yandex.Metrica and Google Analytics",
        "job-16": "website development and problem solving."
    },
    "ru": {
        "title": "Обо мне",
        "text": "Меня зовут Виктория, и я живу в Баку. Окончила в 2020 году Московский Государственный Университет. Изучение веб-разработки начала с конструкторов Tilda и Webflow. Затем освоила HTML, CSS, Javascript и препроцессор SCSS. Работала со сборщиком Gulp, затем решила использовать что-то более современное и удобное. Так перешла к использованию в работе Vue и Nuxt3. В 2023 году я решила освоить веб-дизайн и теперь сама могу создать прототип и дизайн сайта.",
        "subtitle": "Что я могу вам предложить:",
        "job-1": "интервью с вами (устно, письменно) для составления технического задания, анализ конкурентов",
        "job-2": "разработку прототипа и  макета сайта в Figma",
        "job-3": "разработку логотипа и фавикона",
        "job-4": "подготовку контента — подбор фото (со стоков или нейросети) и написание текстов",
        "job-5": "вёрстку сайта по готовому макету в Figma",
        "job-6": "подключение анимаций",
        "job-7": "адаптацию сайта для различных устройств",
        "job-8": "создание сайта на Tilda с использованием зеро-блоков (также работаю с Flexbe и Тинькоф конструкторами)",
        "job-9": "построениe сайта с использованием тем Wordpress и конструктора Elementor",
        "job-10": "разработку админ-панели для управления контентом",
        "job-11": "прописывание основных мета-тегов (title, description, h1) и добавление сайта в выдачу Google и Яндекс браузеров",
        "job-12": "посадку сайта на CMS Wordpress, создание интернет-магазина с помощью WooCommerce",
        "job-13": "перенос сайта на хостинг, подключение домена",
        "job-14": "первичную Seo-оптимизацию",
        "job-15": "подключение сбора статистики — Яндекс.Метрика и Google Analytics",
        "job-16": "доработку сайта и решение различных проблем."
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
import { useScrollElement } from '~~/hooks/use-scroll-element'

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

const jobs = computed(() => [{
    path: job1Path.value,
    ids: [1, 2, 3, 4]
},
{
    path: job2Path.value,
    ids: [5, 6, 7, 8, 9]
},
{
    path: job3Path.value,
    ids: [10, 11, 12]
},
{
    path: job4Path.value,
    ids: [13, 14, 15, 16]
}])

const activeIndex = ref(0)
const jobsRef = ref(null)

const { scrollBottom, scrollTop } = useScrollElement({
    getActiveIndex: () => activeIndex.value,
    setActiveIndex: (index) => {
        activeIndex.value = index
    },
    getElement: () => jobsRef.value,
    getSlidesLength: () => jobs.value.length
})
</script>

<style lang="scss" scoped>
.arrow {
    width: 45px;
    height: 45px;
    margin-top: 10px;
}

.arrow.top {
    rotate: 180deg;
}

.unvisible {
    opacity: 0;
    display: none !important;
}

.active {
    animation: fadeIn 1s ease;
    opacity: 1;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

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
        width: 25ch;
        white-space: nowrap;
        overflow: hidden;
        margin: 70px 0 50px;
        font-weight: 400;
        font-size: 30px;
        line-height: 39px;
        color: var(--text-color-2);
    }

    &__bottom-arrow-cont {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 10px;
        right: 10px;
        opacity: .5;
    }

    &__jobs {
        position: relative;
        width: 74%;
        border: 2px var(--border-color) solid;
        border-radius: 40px 0px;
        padding: 40px;
        position: relative;
        min-height: 300px;
    }

    &__jobs-item {
        display: flex;
        align-items: flex-start;
    }

    &__jobs-img {
        width: 42px;
        height: 42px;
        margin-bottom: 10px;
    }

    &__job {
        display: flex;
        flex-direction: column;
        width: 75%;
    }

    &__job-count {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        text-wrap: nowrap;
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

.ru .about__bottom-title {
    width: 20ch;
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
            padding: 30px;
            min-height: 350px;
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
            padding: 20px;
        }

        &__job-count {
            margin-right: 10px;
        }

        &__jobs-img {
            width: 28px;
            height: 28px;
        }
    }
}
</style>