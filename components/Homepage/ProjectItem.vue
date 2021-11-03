<template>
  <div class="project" ref="container">
    <div class="project__line" ref="topLine"></div>
    <div class="project__number" ref="number">0{{index+1}}</div>
    <NuxtLink :to="'/projects/'+loadedProject.id">
      <div class="project__image" ref="imageContainer">
        <img :src="require(`~/assets/img/${loadedProject.thumbnail}`)" alt="" ref="image"/>
      </div>
    </NuxtLink>

    <NuxtLink :to="'/projects/'+loadedProject.id" class="project__link">
      <div class="project__link--label" ref="title">
        {{loadedProject.title}}
      </div>
    </NuxtLink>
    <NuxtLink :to="'/projects/'+loadedProject.id">
      <div class="project__circle">
        <CircleLink :label="'Découvrir'" ref="circleComponent"/>
      </div>
    </NuxtLink>

    <div class="project__line" ref="bottomLine"></div>
  </div>
</template>

<script>
import gsap, {Power2} from 'gsap'
import SplitText from '@/assets/js/SplitText'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import DrawSVG from '@/assets/js/DrawSVGPlugin.min'
import CircleLink from "@/components/CircleLink";
export default {
  name: "ProjectItem",
  components: {CircleLink},
  props: {
    loadedProject: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      itemListeners: [],
      tl: null,
      itemSt: null
    }
  },
  mounted() {
    if(!this.isMobile()) {
      gsap.registerPlugin(SplitText, ScrollTrigger, DrawSVG)

      this.initAnimation()
      this.initEventListener()
      this.$nuxt.$on('homepage::scrollStart',() =>  {
        this.$data.tl.play()
      })
      this.$nuxt.$on('homepage::scrollEnd',() =>  {
        this.$data.tl.restart()
      })
    }

  },
  methods: {
    initEventListener() {

      this.$data.itemListeners.push(
        this.$refs.imageContainer,
        this.$refs.title,
      )

      this.$data.itemListeners.forEach(item => {
        item.addEventListener('mouseenter', e => {
          this.$nuxt.$emit('hover-item')
        })
        item.addEventListener('mouseleave', e => {
          this.$nuxt.$emit('leave-item')
        })
      })
    },
    initAnimation() {
      this.$data.tl = gsap.timeline({paused: true})
      let circleRefs = this.$refs.circleComponent.$refs

      let splitNumber = new SplitText(this.$refs.number, {type: "chars"})
      let splitTitle = new SplitText(this.$refs.title, {type: "chars"})

      this.$data.tl.fromTo(this.$refs.topLine, {
        scaleX: 0
      }, {
        scaleX: 1,
        transformOrigin:'center',
        duration: .5
      })
      this.$data.tl.fromTo(this.$refs.bottomLine, {
        scaleX: 0
      }, {
        scaleX: 1,
        transformOrigin:'center',
        duration: .5
      }, 0)

      this.$data.tl.fromTo(splitNumber.chars, {
        y: -120,
      }, {
        y: 0,
        stagger: 0.1
      }, 0.5)

      this.$data.tl.fromTo(splitTitle.chars, {
        y: 120,
      }, {
        y: 0,
        stagger: 0.05
      }, 0.5)


      this.$data.tl.fromTo(this.$refs.imageContainer, {
        scaleY: 0,
      }, {
        scaleY: 1,
        transformOrigin:'bottom',
        duration: .5
      }, 0.5)

      this.$data.tl.fromTo(this.$refs.image, {
        scale: 1.4
      }, {
        scale: 1,
        duration: .8
      }, 0.5)

      this.$data.tl.fromTo(circleRefs.circle, {
        drawSVG: '0% 0%'
      }, {
        drawSVG:'0% 100%',
        duration: .7
      }, 0.6)
      this.$data.tl.fromTo(circleRefs.circleLabel, {
        opacity: 0
      }, {
        opacity: 1,
        duration: .25
      })


      this.$data.itemSt = ScrollTrigger.create({
        trigger: this.$refs.container,
        start: 'top top',
        animation: this.$data.tl,
        toggleActions: 'play reverse play reverse'
      })

    },
  },
  beforeDestroy() {
    if(!this.isMobile()) {
      this.$data.itemSt.kill()
    }
  }
}
</script>

<style scoped lang="scss">
  .project {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    @include breakpoint(xs) {
      justify-content: space-between;
    }
    &__number {
      font-family: $F-Lato;
      font-weight: $FW-bold;
      font-size: 7rem;
      align-self: end;
      color: $C-white;
      margin-top: 1rem;
      overflow: hidden;
      @include breakpoint(lt-lg) {
        font-size: 5rem;
      }
      @include breakpoint(xs) {
        font-size: 4rem;
        margin-right: 2.5rem;
        margin-bottom: 5rem;
      }
    }

    &__image {
      width: 50rem;
      height: 30rem;
      overflow: hidden;
      margin-left: 10rem;
      margin-top: 2rem;
      margin-bottom: 2rem;

      @include breakpoint(lt-lg) {
        width: 35rem;
        height: 20rem;
        margin-left: 5rem;
      }

      @include breakpoint(xs) {
        width: 100%;
        height: 25rem;
        margin-left: 0;
        margin-top: 0;
        margin-bottom: 0;
      }
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
      }
    }

    &__link {
      align-self: end;
      text-decoration: none;
      @include breakpoint(xs) {
        width: 100%;
        text-align: center;
      }
      &--label {
        @include main-title;
        font-size: 7rem;
        text-transform: uppercase;
        color: $C-white;
        margin-bottom: 1rem;
        overflow: hidden;
        @include breakpoint(lt-lg) {
          font-size: 5rem;
        }
        @include breakpoint(xs) {
          font-size: 4rem;
          margin-top: 5rem;
        }
      }

    }
    &__circle {
      position: absolute;
      top: 50%;
      left: 75%;
      transform: translateY(-50%);
      @include breakpoint(xs) {
        display: none;
      }
    }
    &__line {
      width: 100%;
      height: 1px;
      background-color: $C-white;
      @include breakpoint(xs) {
        display: none;
      }
    }

  }
</style>
