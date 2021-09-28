<template>
  <div class="app" ref="app">
    <div class="logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <div class="projectTitles" ref="projectTitles">
      <ProjectTitle direction="left" />
      <ProjectTitle direction="right" />
      <ProjectTitle direction="left" />
      <ProjectTitle direction="right" />
    </div>
    <nuxt/>
  </div>
</template>

<script>
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTitle from "@/components/Homepage/ProjectTitle";
export default {
  name: "home",
  components: {ProjectTitle},
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

    gsap.to(this.$refs.projectTitles, {
      opacity: 1,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.app,
        start: '100% top',
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

  .projectTitles {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    opacity: 0;

    &__projectTitle {
      & > div:not(:last-child) {
        margin-bottom: 5rem;
      }
    }
  }

</style>
