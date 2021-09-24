<template>
  <div class="app" ref="app">
    <div class="logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <nuxt/>
  </div>
</template>

<script>
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default {
  name: "home",

  mounted() {
    gsap.to(this.$refs.logo, {
      opacity: 0,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.app,
        start: '50% top',
        toggleActions: 'play none none reverse'
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .app {
    overflow: hidden;
    position: fixed;
    height: 100%;
    width: 100vw;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .logo {
    @include absCenter;
    position: fixed;
    z-index: 5;
  }

</style>
