<template>
  <div class="homepage" ref="homepage">
    <div class="logo">
      <img src="~/assets/svg/logo.svg" alt="" ref="logo">
    </div>
    <div class="projectTitlesUp" ref="projectTitlesUp">
      <ProjectTitle direction="up" label="Project-" />
    </div>

    <div v-for="i in 1">
      <div class="homepage__section homepage__section--1" ref="sections">
        <div class="homepageTitle">
          <div class="homepageTitle__top">
            <div class="homepageTitle__top__name" ref="nameTitle">Jupiter</div>
            <div class="homepageTitle__top__name" ref="subNameTitle">Nicolas</div>
          </div>
          <div class="homepageTitle__bottom">
            <div class="homepageTitle__top__name" ref="webTitle">Web</div>
            <div class="homepageTitle__top__name" ref="devTitle">Developer</div>
          </div>
        </div>
      </div>
      <div class="homepage__section" ref="sections">
        <ProjectItem/>
      </div>
      <div class="homepage__section" ref="sections">
        <ProjectItem/>
      </div>
    </div>
  </div>
</template>

<script>
import {gsap, Power2} from 'gsap'
import SplitText from '@/assets/js/SplitText'
import ScrollTo from '@/assets/js/ScrollToPlugin.min'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ProjectTitle from "@/components/Homepage/ProjectTitle";
import ProjectItem from "@/components/Homepage/ProjectItem";
export default {
  components: {ProjectItem, ProjectTitle},
  data() {
    return {
      height: 0,
      scrollTween: null,

    }
  },
  mounted() {
    gsap.registerPlugin(SplitText, ScrollTrigger, ScrollTo)

    this.$refs.sections.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        onToggle: self => self.isActive && !this.$data.scrollTween && this.goToSection(i)
      });
    });

    gsap.to(this.$refs.logo, {
      opacity: 0,
      y: 100,
      duration: .5,
      ease: 'none',
      scrollTrigger: {
        trigger: this.$refs.homepage,
        start: '5% top',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.to(this.$refs.projectTitlesUp, {
      opacity: 1,
      duration: .25,
      scrollTrigger: {
        trigger: this.$refs.homepage,
        start: '25% top',
        toggleActions: 'play none none reverse'
      }
    })


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


  },
  methods: {
    textApparition(tl, splitWord, timing) {
      tl.fromTo(splitWord.chars, {
        y: 120,
      }, {
        y: 0,
        stagger: 0.05,
      }, timing)
    },
    textVanish(el) {
      gsap.to(el, {
        opacity: 0,
        duration: .25,
        scrollTrigger: {
          trigger: this.$refs.sections[0],
          start: 'center top',
          toggleActions: 'play none none reverse',
        }
      })
    },
    /*setHeight() {
      let height
      height = this.$refs.homepage.clientHeight;
      document.body.style.height = height + "px";
    },*/
    goToSection(i) {
      this.$data.scrollTween  = gsap.to(window, {
        scrollTo: {
          y: i * document.documentElement.clientHeight,
          autoKill: false
        },
        duration: 1,
        onComplete: () => this.$data.scrollTween = null,
        overwrite: true
      });
    },
  }
}
</script>

<style scoped lang="scss">

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

  .homepage {

    &__section {
      height: 100vh;
      position: relative;
      background-color: $C-black;
      &--1 {
        padding: 5rem;
      }
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
