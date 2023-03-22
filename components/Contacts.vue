<template>
    <div class="contacts__inner">
        <h2 class="contacts__title title font1">{{ t('title') }}</h2>
        <p class="contacts__text text font2">{{ t('text') }}</p>
        <div class="contacts__form">
            <input v-model="name" type="text" :placeholder="t('name')" id="input-1" name="name" class="contacts__form-input">
            <input v-model="email" type="text" :placeholder="t('email')" id="input-2" name="email" class="contacts__form-input">
            <input v-model="phone" type="tel" :placeholder="t('phone')" id="input-3" name="phone" class="contacts__form-input">
            <textarea v-model="message" :placeholder="t('message')" id="input-4" name="message" class="contacts__form-input"></textarea>
            <div @click="submit" class="contacts__form-btn btn-d font2">{{ t('btn') }}</div>
        </div>
        <div class="error font2" v-if="error">{{error}}</div>
        <div class="sended font2" v-if="sended">{{sended}}</div>
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

const error = ref('')

const sended = ref('')
let timer
watch(sended, (value) => {
    clearTimeout(timer)
    if (value) {
        timer = setTimeout(() => {
            sended.value = ''
        }, 10000)
    }
})

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

const submit = async (e) => {
    e.preventDefault()
    sended.value = false
    if (!name.value) {
        error.value = 'Empty name'
        return
    }
    if (!email.value) {
        error.value = 'Empty email'
        return
    }
    if (!phone.value) {
        error.value = 'Empty phone'
        return
    }
    if (!message.value) {
        error.value = 'Empty message'
        return
    }
    error.value = ''

    const res = await fetch('/api/submit', {
        method: 'post',
        body: JSON.stringify({
            text: `Name: ${name.value}\n` +
                  `Email: ${email.value}\n` +
                  `Phone: ${phone.value}\n` +
                  `Message: ${message.value}\n`
        })
    })
    const answer  = JSON.parse(await res.text())
    console.log('sended', answer.success)
    if (answer.success) {
        name.value = ''
        email.value = ''
        phone.value = ''
        message.value = ''
        sended.value = 'Message sended'
    } else {
        error.value = 'Message not sended'
    }
}
</script>

<style lang="scss" scoped>
.error {
    margin-top: 10px;
    color: #FF2400;
    font-size: 16px;
}
.sended {
    margin-top: 10px;
    color: #04b791;
    font-size: 16px;
}
.contacts {
    &__inner {
        padding: 50px 0;
    }

    &__title,
    &__text {
        color: var(--text-color-1);
    }

    &__title {
        white-space: nowrap;
        overflow: hidden;
        width: 10ch;
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