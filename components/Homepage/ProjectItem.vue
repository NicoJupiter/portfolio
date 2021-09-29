<template>
  <div class="projectContainer" ref="container">
    <div class="project">
      <div class="project__line" ref="topLine"></div>
      <div class="project__number" ref="number">01</div>
      <div class="project__image" ref="imageContainer">
        <img src="~/assets/img/malegaze.jpg" alt="" ref="image">
        <!--<div class="project__image--techno">Techno - Oui - Non</div>-->
      </div>
      <div class="project__title" ref="title">Male gaze</div>
      <!--<div class="project__link"></div>-->
      <div class="project__line" ref="bottomLine"></div>
    </div>
  </div>
</template>

<script>
import gsap, {Power2} from 'gsap'
import SplitText from '@/assets/js/SplitText'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
export default {
  name: "ProjectItem",
  mounted() {
    gsap.registerPlugin(SplitText, ScrollTrigger)
    let tl = gsap.timeline()

    let splitNumber = new SplitText(this.$refs.number, {type: "chars"})
    let splitTitle = new SplitText(this.$refs.title, {type: "chars"})

    tl.fromTo(this.$refs.topLine, {
      scaleX: 0
    }, {
      scaleX: 1,
      transformOrigin:'left center',
      duration: 1.5
    })
    tl.fromTo(this.$refs.bottomLine, {
      scaleX: 0
    }, {
      scaleX: 1,
      transformOrigin:'right center',
      duration: 1.5
    }, 0)

    tl.fromTo(splitNumber.chars, {
      y: -120,
    }, {
      y: 0,
      stagger: 0.05
    }, 0.7)

    tl.fromTo(splitTitle.chars, {
      y: 120,
    }, {
      y: 0,
      stagger: 0.1
    }, 0.7)


    tl.fromTo(this.$refs.imageContainer, {
      scaleY: 0,
    }, {
      scaleY: 1,
      transformOrigin:'bottom',
      duration: .5
    }, 0.7)

    tl.fromTo(this.$refs.image, {
      scale: 1.4
    }, {
      scale: 1,
      duration: .8
    }, 0.7)

    ScrollTrigger.create({
      trigger: this.$refs.container,
      start: '30% center',
      end: 'center top',
      animation: tl,
      toggleActions: 'play reverse play reverse'
    })

  }
}
</script>

<style scoped lang="scss">
  .projectContainer {
    height: 100vh;
    padding: 0 10rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .project {
    display: flex;
    flex-direction: column;
    position: relative;
    &__number {
      font-family: $F-Lato;
      font-weight: $FW-bold;
      font-size: 7rem;
      align-self: end;
      color: $C-white;
      margin-top: 1rem;
      overflow: hidden;
    }

    &__image {
      width: 75rem;
      height: 40rem;
      margin: 1rem 0;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &__title {
      @include main-title;
      font-size: 7rem;
      align-self: end;
      text-transform: uppercase;
      color: $C-white;
      margin-bottom: 1rem;
      overflow: hidden;
    }
    &__link {
      position: absolute;
      top: 50%;
      left: 75%;
      transform: translateY(-50%);
      width: 15rem;
      height: 15rem;
      border-radius: 100%;
      border: 1px solid $C-primary;
    }
    &__line {
      width: 100%;
      height: 1px;
      background-color: $C-white;

    }
  }
</style>
