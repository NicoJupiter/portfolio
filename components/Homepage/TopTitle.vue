<template>
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
</template>

<script>
import SplitText from "assets/js/SplitText";
import {gsap} from "gsap";

export default {
  name: "TopTitle",
  mounted() {
    gsap.registerPlugin(SplitText)
    let splitName = new SplitText(this.$refs.nameTitle, {type: "chars"})
    let splitSubName = new SplitText(this.$refs.subNameTitle, {type: "chars"})
    let splitWebTitle = new SplitText(this.$refs.webTitle, {type: "chars"})
    let splitDevTitle = new SplitText(this.$refs.devTitle, {type: "chars"})
    let tl = gsap.timeline()

    this.textApparition(tl, splitName, 0)
    this.textApparition(tl, splitSubName, 0.2)
    this.textApparition(tl, splitWebTitle, 0)
    this.textApparition(tl, splitDevTitle, 0.2)

    /*this.textVanish(this.$refs.nameTitle)
    this.textVanish(this.$refs.subNameTitle)
    this.textVanish(this.$refs.webTitle)
    this.textVanish(this.$refs.devTitle)*/
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
      /*gsap.to(el, {
        opacity: 0,
        duration: .25,
        scrollTrigger: {
          trigger: this.$refs.sections[0],
          start: 'center top',
          toggleActions: 'play none none reverse',
        }
      })*/
    },
  }
}
</script>

<style scoped lang="scss">
  .homepageTitle {
    @include main-title;
    font-size: 10rem;
    font-weight: $FW-medium;
    color: $C-white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    /*width: 100%;
    text-align: center;
    text-transform: uppercase;*/
    @include breakpoint(lt-lg) {
      font-size: 7rem;
    }
    &__top {

      &__name {
        overflow: hidden;
      }
    }

    &__center {
      align-self: center;
    }

    &__bottom {
      align-self: end;
    }

    &__dash {
      margin: 2rem 0;
      font-size: 8rem;
    }
  }
</style>
