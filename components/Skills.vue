<template>
    <div class="skills__inner">
        <h2 class="skills__title title font1">{{ t('title') }}</h2>
        <div class="skills__content">
            <ul class="skills__row">
                <li class="skills__row-item font2">
                    <p class="skills__row-item-text">{js}</p>
                </li>
                <li class="skills__row-item font2">
                    <p class="skills__row-item-text">{vue}</p>
                </li>
                <li class="skills__row-item font2">
                    <p class="skills__row-item-text">{git}</p>
                </li>
            </ul>
            <img src="../assets/images/stickers.webp" alt="gulp, wordpress, photoshop, php, sass, tilda, figma, b2 english"
                class="skills__img">
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "title": "Skills"
    },
    "ru": {
        "title": "Навыки"
    }
}
</i18n>

<script setup>
const { t } = useI18n({
    useScope: 'local'
})
</script>

<style lang="scss" scoped>
.skills {
    &__inner {
        padding: 100px 0;
    }

    &__title {
        color: var(--text-color-2);
        white-space: nowrap;
        overflow: hidden;
        width: 6ch;
    }

    &__content {
        display: flex;
        justify-content: space-between;
        margin-top: 50px;
    }

    &__row-item {
        font-weight: 400;
        font-size: 36px;
        line-height: 46px;
        color: var(--text-color-2);
        border: 1px solid var(--text-color-2);
        border-radius: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 77px 75px;

        &:nth-child(2) {
            margin: 20px 0;
        }
    }
}

@media (max-width: 1200px) {
    .skills {
        &__inner {
            padding: 80px 0;
        }

        &__content {
            margin-top: 40px;
            flex-direction: column;
        }

        &__row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 80px;
        }

        &__row-item {
            font-size: 34px;
            padding: 47px 56px;

            &:nth-child(2) {
                margin: 0 0;
            }
        }
    }
}

@media (max-width: 700px) {
    .skills {
        &__inner {
            padding: 80px 0;
        }

        &__content {
            margin-top: 40px;
            flex-direction: column;
        }

        &__row {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 80px;
        }

        &__row-item {
            font-size: 32px;
            line-height: 41px;
            padding: 47px 56px;

            &:nth-child(2) {
                margin: 40px 0;
            }
        }
    }
}

@media (max-width: 500px) {
    .skills {
        &__inner {
            padding: 60px 0;
        }

        &__row {
            margin-bottom: 40px;
            flex-direction: column;
        }

        &__row-item {
            font-size: 28px;
            line-height: 36px;
            padding: 37px 56px;
            width: 100%;

            &:nth-child(2) {
                margin: 20px 0;
            }
        }
    }
}</style>