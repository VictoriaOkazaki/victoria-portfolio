<template>
    <div class="works__inner">
        <h2 class="works__title title font1">{{ t('title') }}</h2>
        <ul class="works__list">
            <li class="works__item" v-for="project in curProjects">
                <a class="works__item-inner-link" :href="project.link" target="_blank">
                    <div class="">
                        <img class="works__item-img" :src="project.photo" alt="website cover">
                        <h4 class="works__item-title font1">{{ project.name }}</h4>
                    </div>
                    <p class="works__item-text text font2">{{ locale === 'ru' ? project.ru_description : project.description
                    }}
                    </p>
                    <a class="works__item-link btn-d font2" :href="project.link" target="_blank">{{ t('btn-1') }}</a>
                    <!-- <div class="mark" v-show="project.is_my_design">
                    <div class="mark-text font2">{{ t('mark') }}</div>
                </div> -->
                    <Mark v-show="project.is_my_design" />
                </a>
            </li>
        </ul>
        <button @click="addNextProjects" v-show="showMoreVisibility" class="works__btn btn-d font2" type="button">{{
            t('btn-2') }}</button>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "btn-1": "View the site",
        "btn-2": "View more",
        "title": "Works"
    },
    "ru": {
        "btn-1": "Показать сайт",
        "btn-2": "Показать еще",
        "title": "Работы"
    }
}
</i18n>

<script setup>
import projects from 'assets/portfolio-projects'

const { locale } = useI18n()

const curProjects = ref([])

let projectsCount = 0
const addNextProjects = () => {
    projectsCount += 6
    if (projectsCount > projects.length) {
        projectsCount = projects.length
    }
    curProjects.value = projects.slice(0, projectsCount)
}

const showMoreVisibility = computed(() => {
    return curProjects.value.length !== projects.length
})

addNextProjects()
const { t } = useI18n({
    useScope: 'local'
})
</script>

<style lang="scss" scoped>
.works {
    background-color: var(--main-color);

    &__inner {
        padding: 60px 0;
    }

    &__title {
        color: var(--text-color-1);
        margin-bottom: 50px;
        white-space: nowrap;
        overflow: hidden;
        width: 6ch;
    }

    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        width: 100%;
    }

    &__item {
        border: 2px solid var(--border-color);
        box-shadow: 1px 1px 1px 1px var(--second-color);
        border-radius: 40px 0 40px 0;
        padding: 25px 25px 45px 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    &__item-inner-link {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__item-img {
        margin-bottom: 25px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    &__item-title {
        font-size: 24px;
        line-height: 27px;
        color: var(--text-color-1);
        margin-bottom: 50px;
        text-align: center;
        position: relative;

        &::before {
            position: absolute;
            content: "";
            bottom: -50%;
            right: 0;
            left: 0;
            height: 2px;
            background-image: var(--btn-grad);
            border-radius: 8px;
        }
    }

    &__item-text {
        margin-bottom: 70px;
        color: var(--text-color-1);
    }



    &__btn {
        margin-top: 70px;
    }
}

@media (max-width: 1200px) {
    .works {
        &__inner {
            padding: 80px 0;
        }
    }
}

@media (max-width: 1000px) {
    .works__list {
        grid-template-columns: repeat(2, 1fr);
    }

    .works__item-text {
        margin-bottom: 40px;
    }

    .works__item-link,
    .works__btn {
        width: 160px;
    }
}

@media (max-width: 800px) {
    .works__title {
        margin-bottom: 40px;
    }

    .works__list {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media (max-width: 600px) {
    .works {
        &__inner {
            padding: 60px 0;
        }
    }

    .works__item-title {
        font-size: 22px;
        margin-bottom: 30px;
    }

    .works__item-text {
        font-size: 16px;
        margin-top: 8px;
    }

    .works__item-link,
    .works-btn {
        font-size: 16px;
    }
}

@media (max-width: 440px) {

    .works__item-link,
    .works__btn {
        padding: 8px 0;
    }
}
</style>