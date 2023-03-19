// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    telemetry: false,
    css: ["@/assets/styles/main.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_vars.scss" as *;',
                },
            },
        },
    },
    modules: [
        [
            '@nuxtjs/i18n',
            {
                locales: [
                    {
                      code: 'en',
                      name: 'English'
                    },
                    {
                      code: 'ru',
                      name: 'Русский'
                    }
                ],
                vueI18n: {
                    legacy: false,
                    locale: 'en'  
                }
            }
        ]
    ],
})
