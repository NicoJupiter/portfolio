<template>
  <div class="app" ref="app">
    <div class="logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <div class="projectTitlesUp" ref="projectTitlesUp">
      <ProjectTitle direction="up" label="Project-" />
    </div>
    <div class="projectTitleDown" ref="projectTitleDown">
      <ProjectTitle direction="down" label="Project-" />
    </div>
    <div class="contactWrapper" ref="contact">
      <CircleLink label="CV" />
      <div class="contactWrapper__mail">
        nicolas24.j@gmail.com
      </div>
    </div>
    <nuxt/>
  </div>
</template>

<script>
import {gsap} from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTitle from "@/components/Homepage/ProjectTitle";
import CircleLink from "@/components/CircleLink";
export default {
  name: "home",
  components: {CircleLink, ProjectTitle},
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

    gsap.to(this.$refs.projectTitlesUp, {
      opacity: 1,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.app,
        start: '75% top',
        end: '280% top',
        toggleActions: 'play none none reverse',
        markers: true
      }
    })

    gsap.to(this.$refs.projectTitleDown, {
      opacity: 1,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.app,
        start: '75% top',
        end: '300% top',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(this.$refs.contact, {
      opacity: 1,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.app,
        start: '300% top',
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

  .projectTitlesUp {
    position: fixed;
    top: 0;
    left: 0;
    transform: rotate(90deg) translate(-1%, -50%);
    transform-origin: left;
    z-index: 5;
    opacity: 0;
  }

  .projectTitleDown {
    position: fixed;
    right: 0;
    left: 0;
    transform: rotate(-90deg) translate(-1%, -50%);
    transform-origin: right;
    z-index: 5;
    opacity: 0;
  }

  .contactWrapper {
    @include absCenter;
    position: fixed;
    opacity: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__mail {
      font-size: 2.4rem;
      font-family: $F-Lato;
      color: $C-white;
      margin-top: 1.5rem;
    }
  }

</style>
