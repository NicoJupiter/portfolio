<template>
  <div class="projectMobile" ref="mobileWrapper">
    <!--<div class="projectMobile__label" v-if="mobileParams.isLabel === true">
      {{mobileParams.text}}
    </div>-->
    <div v-for="item in mobileParams">
      <div class="projectMobile__item" ref="mobile">
        <img :src="require(`~/assets/img/${item}`)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default {
  name: "ProjectMobile",
  props: {
    /*typeBlock: {
      type: String,
      required: true
    },*/
    mobileParams: {
      type: Array,
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

    this.$refs.mobile.forEach((item, index) => {
      if(index % 2 === 0){
        item.classList.add('projectMobile__item--up')
      }
      else{
        item.classList.add('projectMobile__item--down')
      }
    })

    this.$data.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.mobileWrapper,
        start: "top center"
      }
    })
    this.$data.tl.fromTo('.projectMobile__item--up', {
      y: -75,
      opacity: 0
    }, {
      y:0,
      opacity: 1,
      duration: .8,
    }, 0)
    this.$data.tl.fromTo('.projectMobile__item--down', {
      y: 75,
      opacity: 0
    }, {
      y:0,
      opacity: 1,
      duration: .8,
    }, 0)
  },
  beforeDestroy() {
    this.$data.tl.scrollTrigger.kill()
  }
}
</script>

<style scoped lang="scss">
.projectMobile {
  display: flex;
  justify-content: space-around;
  &__item {
    width: 25rem;
    position: relative;
    aspect-ratio: 9/19.5;
    img {
      position: absolute;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  &__label {
    text-align: center;
    font-family: $F-Lato;
    font-weight: $FW-thin;
    color: $C-lightGrey;
    font-size: 3.6rem;
    margin-bottom: 5rem;
  }
}
</style>
