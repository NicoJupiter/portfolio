<template>
  <div class="homepage" ref="homepage">
    <CursorPointer/>
    <IndexBtn/>
    <div class="homepage__nav">
      <NavSections/>
    </div>
    <div class="homepage__scroll" ref="scroll">
      <div class="homepage__scroll--label">
        scroll
      </div>
      <div class="homepage__scroll--arrow">
        <img src="~/assets/svg/arrow-down.svg" alt="" ref="logo">
        <img src="~/assets/svg/arrow-down.svg" alt="" ref="logo">
      </div>
    </div>
    <DistortionImage/>
    <div class="homepage__logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <div class="projectTitlesUp" ref="projectTitlesUp">
      <ProjectTitle direction="up" label="Projets-" />
    </div>

    <div v-for="i in 1">
      <div class="homepage__section homepage__section--1" ref="sections">

      </div>
      <div class="homepage__section" ref="sections">

        <div v-for="(loadedProject, index) in loadedProjects" :key="index">
          <ProjectItem :loaded-project="loadedProject" :index="index"/>
        </div>
      </div>
      <div class="homepage__section homepage__section--2" ref="sections">
        <About ref="aboutSection"/>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap, Expo} from 'gsap'
import ScrollTo from '@/assets/js/ScrollToPlugin.min'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTitle from "@/components/Homepage/ProjectTitle";
import ProjectItem from "@/components/Homepage/ProjectItem";
import DistortionImage from "@/components/Homepage/DistortionImage";
import TopTitle from "@/components/Homepage/TopTitle";
import NavSections from "@/components/Homepage/NavSections";
import About from "@/components/Homepage/About";
import SplitText from "assets/js/SplitText";
import { typeA } from '~/mixins/transitions'
import IndexBtn from "@/components/IndexBtn";
import CursorPointer from "@/components/CursorPointer";
import _ from "lodash"

export default {
  components: {CursorPointer, IndexBtn, About, NavSections, TopTitle, DistortionImage, ProjectItem, ProjectTitle},
  data() {
    return {
      stScrolls: []
    }
  },
  mixins: [
    typeA
  ],
  computed: {
    loadedProjects() {
      return _.orderBy(this.$store.getters.loadedProjects, 'order');
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger, ScrollTo, SplitText)

    let aboutRefs = this.$refs.aboutSection[0].$refs
    let splitAboutText = new SplitText(aboutRefs.text, {type: "words"})
     let logoSt = gsap.to(this.$refs.logo, {
      opacity: 0,
      y: 100,
      duration: .5,
      ease: 'none',
      scrollTrigger: {
        trigger: this.$refs.homepage,
        start: '5% top',
        toggleActions: 'play none none reverse',
      }
    })

    let logoScrollSt = gsap.to(this.$refs.scroll, {
      opacity: 0,
      duration: .5,
      ease: 'none',
      scrollTrigger: {
        trigger: this.$refs.homepage,
        start: '15% top',
        toggleActions: 'play none none reverse',
      }
    })

    this.$data.stScrolls.push(logoSt.scrollTrigger)
    this.$data.stScrolls.push(logoScrollSt.scrollTrigger)

    this.$refs.sections.forEach((el, i) => {
      let st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        onEnter: () => {
          this.$nuxt.$emit('homepage::updateDistortion', i)
        },
        onEnterBack: () => {
          this.$nuxt.$emit('homepage::updateDistortion', i)
        }
      });
      this.$data.stScrolls.push(st)
    });

    let tlAbout = gsap.timeline()
    tlAbout.fromTo(aboutRefs.title, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: .25
    })

    tlAbout.fromTo(splitAboutText.words, {
      opacity: 0,
      y: 50,
      skewX: -5
    }, {
      opacity: 1,
      y: 0,
      skewX: 0,
      stagger: 0.02,
    })

    tlAbout.fromTo(aboutRefs.titleSocial, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: .25
    }, .5)

    tlAbout.fromTo(aboutRefs.socials, {
      y: 100,
    },{
      y: 0,
      duration: 1,
      ease: Expo.easeOut,
    },.7)

    let aboutSt = ScrollTrigger.create({
      trigger: this.$refs.aboutSection[0].$el,
      start: '-10px top',
      animation: tlAbout,
      toggleActions: 'play none none none'
    })

    this.$data.stScrolls.push(aboutSt)

  },
  methods: {
    goToSection(i) {
      this.$data.scrollTween = true
      this.$data.scrollTween  = gsap.to(window, {
        scrollTo: {
          y: i * document.documentElement.clientHeight,
          autoKill: false
        },
        duration: 1,
        onStart: () => {
          this.$nuxt.$emit('homepage::scrollEnd')
        },
        onComplete: () => {
          this.$data.scrollTween = false
          this.$nuxt.$emit('homepage::scrollStart')
        },
        overwrite: true
      });
    },
  },
  beforeDestroy() {
    this.$data.stScrolls.forEach(item => {
      item.kill()
    })
  }
}
</script>

<style scoped lang="scss">

  .projectTitlesUp {
    position: fixed;
    top: 0;
    left: 0;
    transform: rotate(90deg) translate(-2%, -50%);
    transform-origin: left;
    z-index: 5;
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

  .homepage {
    overflow: hidden;
    background-color: transparent;
    &__scroll {
      position: fixed;
      bottom: 3.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      &--label {
        font-family: $F-Lato;
        text-transform: uppercase;
        color: $C-primary;
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: .5rem;
        opacity: .5;
        animation: opacity 3s infinite;
      }
      &--arrow {
        width: 2.5rem;
        height: 5rem;
        position: relative;
        margin: auto;
        img {
          position: absolute;
          left: 50%;
          width: 100%;
          transform: translateX(-50%);
          animation: opacity 3s infinite;
          &:last-child {
            bottom: 1rem;
            animation-delay: .25s;
          }
        }
      }
    }
    &__section {
      position: relative;
      &--1 {
        height: 100vh;
      }
      &--2 {
        height: 100.1vh;
        padding: 0 20rem;
      }
    }

    &__logo {
      @include absCenter;
      position: fixed;
      z-index: 5;
      width: 20rem;
      height: 20rem;
      pointer-events: none;
      @include breakpoint(lt-lg) {
        width: 15rem;
        height: 15rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__interSection {
      height: 25vh;
    }

    &__nav {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 5;
    }

  }

  @keyframes opacity{
    0%{
      opacity: .25;
    }
    30%{
      opacity: 1;
    }
    60%{
      opacity: 1;
    }
    100%{
      opacity: .25;
    }
  }

</style>
