<template>
  <div class="homepage" ref="homepage">
    <div class="homepage__1">
      <div class="homepageTitle">
        <div class="homepageTitle__top">
          <div class="homepageTitle__top__name" ref="nameTitle">Jupiter</div>
          <div class="homepageTitle__top__name" ref="subNameTitle">Nicolas</div>
        </div>
        <!--<div class="homepageTitle__center">
          <img src="~/assets/svg/logo.svg" alt="" ref="logo">
        </div>-->
        <div class="homepageTitle__bottom">
          <div class="homepageTitle__top__name" ref="webTitle">Web</div>
          <div class="homepageTitle__top__name" ref="devTitle">Developer</div>
        </div>
      </div>
    </div>
    <div class="homepage__2">
      <div class="homepageProject">
        <div class="homepageProject__image">

        </div>
        <div class="homepageProject__title">
          Male gaze
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap, Power2} from 'gsap'
import SplitText from '@/assets/js/SplitText'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default {

  data() {
    return {
      height: 0
    }
  },
  mounted() {
    gsap.registerPlugin(SplitText, ScrollTrigger)

    ScrollTrigger.addEventListener("refreshInit", this.setHeight);
    let splitName = new SplitText(this.$refs.nameTitle, {type: "chars"})
    let splitSubName = new SplitText(this.$refs.subNameTitle, {type: "chars"})
    let splitWebTitle = new SplitText(this.$refs.webTitle, {type: "chars"})
    let splitDevTitle = new SplitText(this.$refs.devTitle, {type: "chars"})
    let tl = gsap.timeline()

    this.textApparition(tl, splitName, 0)
    this.textApparition(tl, splitSubName, 0.2)
    this.textApparition(tl, splitWebTitle, 0)
    this.textApparition(tl, splitDevTitle, 0.2)

    this.textVanish(this.$refs.nameTitle)
    this.textVanish(this.$refs.subNameTitle)
    this.textVanish(this.$refs.webTitle)
    this.textVanish(this.$refs.devTitle)

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
    });

  },
  methods: {
    textApparition(tl, splitWord, timing) {
      tl.fromTo(splitWord.chars, {
        y: 120,
      }, {
        y: 0,
        stagger: 0.05,
        ease: Power2.easeInOut
      }, timing)
    },
    textVanish(el) {
      gsap.to(el, {
        opacity: 0,
        duration: .25,
        scrollTrigger: {
          trigger: this.$refs.homepage,
          start: '5% top',
          toggleActions: 'play none none reverse',
        }
      })
    },
    setHeight() {
      let height
      height = this.$refs.homepage.clientHeight;
      document.body.style.height = height + "px";
    },
  },
  layout: 'home',
}
</script>

<style scoped lang="scss">

  .homepage {
    background-color: $C-black;
    position: absolute;
    overflow: hidden;
    width: 100%;
    &__1 {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
      padding: 5rem;
      box-sizing: border-box;
    }
    &__2 {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
      padding: 5rem;
      box-sizing: border-box;
      background-color: $C-black;
    }
  }

  .homepageTitle {
    @include main-title;
    font-size: 5rem;
    font-weight: $FW-medium;
    color: $C-white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    /*width: 100%;
    text-align: center;
    text-transform: uppercase;*/

    &__top {
      font-size: 10rem;
      &__name {
        overflow: hidden;
      }
    }

    &__center {
      align-self: center;
    }

    &__bottom {
      font-size: 10rem;
      align-self: end;
    }

    &__dash {
      margin: 2rem 0;
      font-size: 8rem;
    }
  }
</style>
