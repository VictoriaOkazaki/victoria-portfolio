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
.container {
  padding: 0 100px;
}

.container-hero {
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.container-65 {
  width: 65%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.about,
.skills {
  background-color: var(--second-color);
}

.works,
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
  .container {
    padding: 0 80px;
  }

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
  .container {
    padding: 0 60px;
  }

  .container-hero {
    background-position: top;
  }
}

@media (max-width: 500px) {
  .container {
    padding: 0 40px;
  }
}

@media (max-width: 500px) {
  .container {
    padding: 0 30px;
  }

  .burger__window-list {
    left: 30px;
  }

  .burger__window-item {
    margin: 0 1px;
  }
}
@media (max-width: 320px) {
  .container {
    padding: 0 20px;
  }
}
</style>
<script setup>
import { useTheme } from './hooks/useTheme';
import homeBgDark from 'assets/images/home-bg-d.jpg';
import homeBgLight from 'assets/images/home-bg-l.jpg';
import contactsBgDark from 'assets/images/contacts-bg.jpg';
import contactsBgLight from 'assets/images/contacts-bg-l.jpg';
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
  ]
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
