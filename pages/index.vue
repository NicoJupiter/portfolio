<template>
  <div class="homepage" ref="homepage">
    <div class="homepage__nav">
      <NavSections/>
    </div>
    <DistortionImage/>
    <div class="homepage__logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <div class="projectTitlesUp" ref="projectTitlesUp">
      <ProjectTitle direction="up" label="Project-" />
    </div>

    <div v-for="i in 1">
      <div class="homepage__section homepage__section--1" ref="sections">
       <TopTitle/>
      </div>
      <div class="homepage__section" ref="sections">
        <div v-for="i in 2">
          <div class="homepage__interSection"></div>
          <ProjectItem/>
        </div>
      </div>
      <div class="homepage__section homepage__section--2" ref="sections">
        <About ref="aboutSection"/>
      </div>
      <!--
      <div class="homepage__section" ref="sections">
        <ProjectItem/>
      </div>-->
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

export default {
  components: {About, NavSections, TopTitle, DistortionImage, ProjectItem, ProjectTitle},
  data() {
    return {
      height: 0,
      scrollTween: false,
      currentSection: null,
      sectionsScroll: []
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger, ScrollTo, SplitText)

    let aboutRefs = this.$refs.aboutSection[0].$refs
    let splitAboutText = new SplitText(aboutRefs.text, {type: "words"})
    gsap.to(this.$refs.logo, {
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

    this.$refs.sections.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        onEnter: () => {
          console.log('test')
          this.$nuxt.$emit('homepage::updateDistortion', i)
        },
        onEnterBack: () => {
          console.log('enter back')
          this.$nuxt.$emit('homepage::updateDistortion', i)
        }
      });
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
      y: 100,
      skewX: -10
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

    ScrollTrigger.create({
      trigger: this.$refs.aboutSection[0].$el,
      start: '-10px top',
      animation: tlAbout,
      toggleActions: 'play none none none'
    })


    //smooth scroll
    /*ScrollTrigger.addEventListener("refreshInit", this.setHeight);

    gsap.to(this.$refs.homepage, {
      y: () => -(this.$refs.homepage.clientHeight - document.documentElement.clientHeight),
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });*/

    //section scroll
    /*this.$refs.sections.forEach((el, i) => {
    let st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      onToggle: self => self.isActive && !this.$data.scrollTween && this.goToSection(i)
    });
    this.$data.sectionsScroll.push(st)
  });*/

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

  }
}
</script>

<style scoped lang="scss">

  .projectTitlesUp {
    position: fixed;
    top: 0;
    left: 0;
    transform: rotate(90deg) translate(-1%, -50%);
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
    &__section {
      position: relative;

      &--2 {
        height: 102vh;
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

</style>
