<template>
    <div class="mark">
        <div class="mark-text font2">{{ t('mark') }}</div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "mark": "my design"
    },
    "ru": {
        "mark": "мой дизайн"
    }
}
</i18n>

<script setup>
const { t } = useI18n({
    useScope: 'local'
})
</script>

<style lang="scss" scoped>
.mark {
    border: 1px dashed var(--border-color);
    box-shadow: 0px 0px 20px 4px var(--border-color) inset;
    width: 82px;
    height: 82px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 5px;
    bottom: 5px;
}

.mark-text {
    color: var(--text-color-1);
    text-shadow: 0px 4px 2px var(--text-color-1);
    font-size: 14px;
}
</style>