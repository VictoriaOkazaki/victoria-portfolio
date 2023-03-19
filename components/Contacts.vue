<template>
    <div class="contacts__inner">
        <h2 class="contacts__title title font1">{{ t('title') }}</h2>
        <p class="contacts__text text font2">{{ t('text') }}</p>
        <form action="" class="contacts__form">
            <input type="text" :placeholder="t('name')" id="input-1" name="name" class="contacts__form-input">
            <input type="text" :placeholder="t('email')" id="input-2" name="email" class="contacts__form-input">
            <input type="tel" :placeholder="t('phone')" id="input-3" name="phone" class="contacts__form-input">
            <textarea :placeholder="t('message')" id="input-4" name="message" class="contacts__form-input"></textarea>
            <input type="submit" :value="t('btn')" class="contacts__form-btn btn-d font2">
        </form>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "title": "Contact me",
        "text": "Leave your contacts and I will write you within a day",
        "name": "Name",
        "email": "Email / Social media link",
        "phone": "Phone",
        "message": "Message",
        "btn": "Send"
    },
    "ru": {
        "title": "Связаться со мной",
        "text": "Оставьте ваши контакты, и я свяжусь с вами в течение дня",
        "name": "Имя",
        "email": "Email / Ссылка на соцсети",
        "phone": "Телефон",
        "message": "Сообщение",
        "btn": "Отправить"
    }
}
</i18n>

<script setup>
const { t } = useI18n({
    useScope: 'local'
})
</script>

<style lang="scss" scoped>
.contacts {
    &__inner {
        padding: 50px 0;
    }

    &__title,
    &__text {
        color: var(--text-color-1);
    }

    &__text {
        margin: 50px 0;
    }

    &__form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 83px;
        position: relative;
    }

    &__form-input {
        width: 31%;
        padding: 20px 40px 20px 20px;
        border: 2px solid var(--border-color);
        background: none;

        &:focus {
            color: var(--text-color-1);
            outline: none;
        }

        &::-webkit-input-placeholder,
        &::placeholder {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 300;
            font-size: 18px !important;
            line-height: 23px !important;
            color: var(--text-color-1);
        }
    }

    &__form-btn {
        position: absolute;
        bottom: 0;
    }
}

#input-1 {
    border-radius: 40px 0px 0px 40px;
}

#input-3 {
    border-radius: 0px 40px 40px 0px;
}

#input-4 {
    border-radius: 40px 0px 40px 40px;
    height: 152px;
    width: 65.5%;
    margin-top: 40px;
    position: relative;
    resize: none;

    &::placeholder {
        position: absolute;
    }
}

@media (max-width: 1200px) {
    .contacts {
        &__inner {
            padding: 40px 0;
        }

        &__text {
            margin: 40px 0;
        }
    }

    #input-4 {
        margin-top: 30px;
    }
}

@media (max-width: 1000px) {
    .contacts {
        &__form {
            flex-direction: column;
        }

        &__form-input {
            width: 100%;

            &:nth-child(2) {
                margin: 40px 0;
            }
        }
    }

    #input-4 {
        margin-top: 40px;
        width: 100%;
    }
}

@media (max-width: 700px) {
    .contacts {
        &__text {
            margin: 30px 0 60px;
        }
        &__form-input {
            &::placeholder {
                font-size: 16px !important;
                line-height: 19px !important;
            }
            &:nth-child(2) {
                margin: 20px 0;
            }
        }
    }
}

@media (max-width: 500px) {
    .contacts {
        &__inner {
            padding: 30px 0;
        }

        &__form-input {
            &::placeholder {
                font-size: 14px !important;
                line-height: 17px !important;
            }
            &:nth-child(2) {
                margin: 20px 0;
            }
        }
    }
    #input-4 {
        margin-top: 20px;
    }
}</style>