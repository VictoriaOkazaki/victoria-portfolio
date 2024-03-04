<template>
  <div class="wrapper" :class="{ 'ru': isRu, 'light': isLight }">
    <div class="burger__window" :class="{ 'burger__window-active': isBurgerOpen }">
      <ul class="burger__window-list">
        <li class="burger__window-item font2">{whatsapp}</li>
        <li class="burger__window-item font2">{telegram}</li>
        <li class="burger__window-item font2">{github}</li>
        <li class="burger__window-item font2">{linkedin}</li>
      </ul>
    </div>
    <div class="container container-hero" :style="heroStyle">
      <div class="container-65">
        <Header />
        <Hero />
      </div>
    </div>
    <main class="main">
      <section class="about" id="about">
        <div class="container">
          <About />
        </div>
      </section>
      <section class="works" id="works">
        <div class="container">
          <Works />
        </div>
      </section>
      <section class="skills" id="skills">
        <div class="container">
          <Skills />
        </div>
      </section>
      <section class="reviews" id="reviews">
        <Reviews />
      </section>
      <section class="contacts" id="contacts" :style="contactStyle">
        <div class="container">
          <Contacts />
        </div>
      </section>
    </main>
    <footer class="footer">
      <Mark class="footer__mark" />
      <div class="container">
        <Footer />
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container-hero {
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

@supports (min-height: 100dvh) {
  .container-65 {
    min-height: 100dvh;
  }
}

@supports not (min-height: 100dvh) {
  .container-65 {
    min-height: 100vh;
  }
}

.container-65 {
  width: 65%;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.about,
.skills {
  background-color: var(--second-color);
}

.works,
.reviews,
.footer {
  background-color: var(--main-color);
  position: relative;
}

.footer__mark {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* burger */
.burger__window {
  display: none;

  &-list {
    position: absolute;
    bottom: 40px;
    left: 40px;
    display: flex;
    opacity: 0.8;
  }

  &-item {
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: var(--text-color-2);
    margin: 0 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.burger__window-active {
  display: block;
  width: 100vw;
  height: 100vh;
  background-color: var(--second-color);
  position: absolute;
  top: 0;
  left: 0;
  top: 0;
  left: 0;
  z-index: 1;
  animation: 2s alternate slidein;
}

@media (max-width: 1400px) {

  .container-65 {
    width: 75%;
  }
}

@media (max-width: 1200px) {
  .container-65 {
    width: 100%;
  }
}

@media (max-width: 1000px) {
  .contacts {
    background-position: right;
  }
}

@media (max-width: 800px) {

  .container-hero {
    background-position: top;
  }
}


@media (max-width: 500px) {

  .burger__window-list {
    left: 30px;
  }

  .burger__window-item {
    margin: 0 1px;
  }
}
</style>
<script setup>
import { useTheme } from './hooks/useTheme';
import homeBgDark from 'assets/images/home-bg-d.webp';
import homeBgLight from 'assets/images/home-bg-l.webp';
import contactsBgDark from 'assets/images/contacts-bg.webp';
import contactsBgLight from 'assets/images/contacts-bg-l.webp';
import { useBurger } from '~~/hooks/useBurger';

useHead({
  link: [
    {
      href: 'https://fonts.googleapis.com',
      rel: 'preconnect'
    },
    {
      href: 'https://fonts.gstatic.com',
      rel: 'preconnect',
      crossorigin: ''
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500&family=Exo+2:wght@300;400&family=Jura&family=Sofia+Sans&family=Space+Grotesk:wght@300;400&family=Syne+Mono&display=swap',
      rel: 'stylesheet'
    },
  ],
  meta: [
  {property: "og:type", content: "website"},
  { property: "og:url", content: "https://victoria-kazakova-portfolio.vercel.app/" },
        { property: "og:site_name", content: "Сайт-портфолио Виктории Казаковой" },
        {
            property: "og:title",
            content: "Портфолио сайтолога: кейсы, отзывы, стек технологий, навыки",
        },
        {property: "og:image", content: "/soc-3.jpg"},
        {property: "og:description", content: "Создаю сайты под ключ. Делаю все этапы работ: разработка структуры, написание текстов, дизайн и верстка, подключение сервисов и оплаты, первичная SEO-оптимизация. Работаю как с конструкторами (Тильда, Флексби, Тинькофф), так и верстаю кодом."},
    ],
})

const { locale } = useI18n()
const isRu = computed(() => locale.value === 'ru')

const { isBurgerOpen } = useBurger()

const { isLight } = useTheme()

const heroStyle = computed(() => {
  if (isLight.value) {
    return {
      'background-image': `url(${homeBgLight})`
    }
  }
  return {
    'background-image': `url(${homeBgDark})`
  }
})
const contactStyle = computed(() => {
  if (isLight.value) {
    return {
      'background-image': `url(${contactsBgLight})`
    }
  }
  return {
    'background-image': `url(${contactsBgDark})`
  }
})
</script>
