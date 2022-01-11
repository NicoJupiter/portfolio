<template>
  <div class="projectBlock" ref="projectBlock">
    <div class="projectBlock__fullScreen">
      <div class="projectBlock__fullScreen--wrapper">
        <img :src="require(`~/assets/img/${blockParams.src}`)" alt="" ref="projectBlockItem"
             v-if="blockParams.type === 'image'" />
        <video  autoplay preload="metadata" loop muted v-if="blockParams.type === 'video'" ref="projectBlockItem">
          <source :src="require(`~/assets/img/${blockParams.src}`)"
                  type="video/webm">
          <source :src="require(`~/assets/img/${blockParams.src}`)"
                  type="video/mp4">
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default {
  name: "ProjectBlock",
  props: {
    blockParams: {
      type: Object,
      required: true
    },
    data() {
      return {
        tl: null
      }
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger)

    this.$data.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.projectBlock,
        start: "top center",
      },
      /*onComplete: () => {
        if(this.$props.blockParams.type === 'video') {
          this.$refs.projectBlockItem.play()
         }

      }*/
    })

    this.$data.tl.fromTo(this.$refs.projectBlock, {
      scaleY: 0,
    }, {
      scaleY: 1,
      transformOrigin: 'center',
      duration: .8
    }, 0)

    this.$data.tl.fromTo(this.$refs.projectBlockItem, {
      scale: 1.7
    }, {
      scale: 1,
      transformOrigin: 'center',
      duration: .8
    }, 0)
  },
  beforeDestroy() {
    this.$data.tl.scrollTrigger.kill()
  }
}
</script>

<style scoped lang="scss">
  .projectBlock {
    margin-bottom: 10rem;
    overflow: hidden;
    @include breakpoint(xs) {
      margin-bottom: 2.5rem;
    }
    &__fullScreen {
      width: 100%;
      &--wrapper {
        position: relative;
        //padding-bottom: 56.25%;
        aspect-ratio: 16/9;
        img {
          position: absolute;
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
        video {
          position: absolute;
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
    }


  }
</style>
