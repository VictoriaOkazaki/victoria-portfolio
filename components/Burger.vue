<template>
  <div id="nav-icon3" @click="burgerClick" :class="{ 'open': isBurgerOpen }">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script setup>
import { useBurger } from '~~/hooks/useBurger';

const { isBurgerOpen } = useBurger()
const burgerClick = () => {
  isBurgerOpen.value = !isBurgerOpen.value
}
</script>

<style lang="scss" scoped>
#nav-icon3{
  display: none;
  width: 25.5px;
  height: 13px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon3 span {
  display: block;
  position: absolute;
  height: 1px;
  width: 100%;
  background: var(--main-color);
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}

#nav-icon3 span:nth-child(1) {
  top: 0px;
}

#nav-icon3 span:nth-child(2),
#nav-icon3 span:nth-child(3) {
  top: 6px;
}

#nav-icon3 span:nth-child(4) {
  top: 12px;
}

#nav-icon3.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#nav-icon3.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
  top: 6px;
  width: 0%;
  left: 50%;
}
@media (max-width: 500px) {
  #nav-icon3 {
    display: block;
  }
}
</style>