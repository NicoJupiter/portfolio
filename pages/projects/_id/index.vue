<template>
  <div class="project">
    <CursorPointer/>
    <IndexBtn/>
    <div class="project__intro" ref="container">
      <img :src="require(`~/assets/img/${loadedProject.thumbnail}`)" alt="" ref="image"/>
      <div class="project__title">
        <div class="project__title--text" ref="title">
          {{loadedProject.title}}
        </div>
      </div>
    </div>
    <div class="project__wrapper" ref="tamerTest">
      <div class="creditsList">
        <span ref="creditLine"></span>
        <div class="creditsList__item">
          <div class="creditsList__item--title">Projet type :</div>
          <div class="creditsList__item--content">{{loadedProject.projetType}}</div>
        </div>
        <div class="creditsList__item">
          <div class="creditsList__item--title">Techno utilisés :</div>
          <div class="creditsList__item--content" v-for="item in loadedProject.technoList">
            {{item}}
          </div>
        </div>
        <div class="creditsList__item">
          <div class="creditsList__item--title">Url :</div>
          <a :href="loadedProject.url"
             class="creditsList__item--content creditsList__item--link"
             target="_blank" ref="itemLink">{{loadedProject.url}}</a>
        </div>
      </div>
      <div class="project__description">
        <span ref="description">
           {{loadedProject.content}}
        </span>
      </div>
    </div>
    <div class="project__demo" ref="videoSection">
      <div class="project__demo--video" ref="videoContainer">
        <video muted autoplay loop ref="video">
          <source :src="require(`~/assets/video/${loadedProject.video}`)" type="video/webm">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import gsap from 'gsap'
import SplitText from '@/assets/js/SplitText'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import IndexBtn from "@/components/IndexBtn";
import {typeB} from "@/mixins/transitions";
import ScrollTo from '@/assets/js/ScrollToPlugin.min'
import CursorPointer from "@/components/CursorPointer";
export default {
  components: {CursorPointer, IndexBtn},
  data() {
    return {
      loadedProject: null,
      blur: {
        value: 0
      },
      scrollSt: [],
      mouseEnterHandler: this.mouseEnterEvent.bind(this),
      mouseLeaveHandler: this.mouseLeaveEvent.bind(this)
    }
  },
  mixins: [
    typeB
  ],
  asyncData(context) {
    return axios
      .get('https://portfolio-55714-default-rtdb.firebaseio.com/'+context.params.id+'.json')
      .then(res => {
        console.log(res)
        return {
          loadedProject : res.data
        }
      }).catch(e => context.error())
  },
  mounted() {
    window.scrollTo(0, 0);
    gsap.registerPlugin(SplitText, ScrollTrigger, ScrollTo)
    this.introAnimation()
    let splitDescriptionText = new SplitText(this.$refs.description, {type: "words"})
    let descriptionTl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.container,
        start: 'bottom center',
      }
    })
    descriptionTl.fromTo(this.$refs.creditLine, {
      scaleX: 0
    }, {
      scaleX: 1,
      transformOrigin:'center',
      duration: 1
    }, 0)
    descriptionTl.fromTo(splitDescriptionText.words, {
      opacity: 0,
      y: 50,
      skewX: -5
    }, {
      opacity: 1,
      y: 0,
      skewX: 0,
      stagger: 0.01,
    }, .25)
    //init parallax
    let parrallaxSt = gsap.to(this.$refs.image, {
      y: `${window.innerHeight / 2}px`,
      ease: "none",
      scrollTrigger: {
        trigger: this.$refs.container,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onLeave:() => {
          this.$nuxt.$emit('project::homeSlide', true)
        },
        onEnterBack:() => {
          this.$nuxt.$emit('project::homeSlide', false)
        }
      }
    });


    let tlVideo = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.videoSection,
        start: "top center",
      }
    })
    tlVideo.fromTo(this.$refs.videoContainer, {
      scaleY: 0,
    }, {
      scaleY: 1,
      transformOrigin:'top',
      duration: 1
    })

    tlVideo.fromTo(this.$refs.video, {
      scale: 1.1
    }, {
      scale: 1,
      duration: 1.2
    }, 0)

    this.$data.scrollSt.push(tlVideo.scrollTrigger)
    this.$data.scrollSt.push(descriptionTl.scrollTrigger)
    this.$data.scrollSt.push(parrallaxSt.scrollTrigger)
    this.$refs.itemLink.addEventListener('mouseenter', this.$data.mouseEnterHandler)
    this.$refs.itemLink.addEventListener('mouseleave', this.$data.mouseLeaveHandler)
  },
  methods: {
    introAnimation() {
      let splitTitle = new SplitText(this.$refs.title, {type: "chars"})
      let tlIntro = gsap.timeline()
      gsap.set(splitTitle.chars, {
        y: 200
      })
      /*tlIntro.to(this.$data.blur, {
        value: 15,
        duration: 1,
        onUpdate: () => {
          this.addBlur()
        }
      })*/
      gsap.to(splitTitle.chars, {
        y: 0,
        stagger: 0.05,
      })
    },
    addBlur() {
      gsap.set(this.$refs.image, {webkitFilter:"blur(" + this.$data.blur.value + "px)"});
    },
    mouseEnterEvent() {
      this.$nuxt.$emit('link-hover')
    },
    mouseLeaveEvent() {
      this.$nuxt.$emit('leave-link')
    }
  },
  beforeDestroy() {
    this.$data.scrollSt.forEach(item => {
      item.kill()
    })
    this.$refs.itemLink.removeEventListener('mouseenter', this.$data.mouseEnterHandler)
    this.$refs.itemLink.removeEventListener('mouseleave', this.$data.mouseLeaveHandler)
  },
  //difference entre async et fetch async va sauvergarder
  //les datas récup dans un object propre au composant
  //et fectch lui va permettre de tout sauvegarder dans un store
  /*validate({ params }) {
    console.log(params)
    return /^\d+$/.test(params.id)
  },*/
}
</script>

<style scoped lang="scss">
.project {
  position: relative;
  &__intro {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    @include breakpoint(xs) {
      height: 50vh;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($C-black, .8);
    }
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transform: scale(1.1);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  &__title {
    position: absolute;
    left: 5rem;
    bottom: 5rem;
    overflow: hidden;
    z-index: 10;
    @include breakpoint(xs) {
      left: 2.5rem;
      bottom: 2.5rem;
    }
    &--text {
      @include main-title;
      color: $C-white;
      font-size: 10rem;
      text-transform: uppercase;
      @include breakpoint(xs) {
        font-size: 3rem;
      }
    }
  }
  &__wrapper {
    width: 100vw;
    //min-height: 100vh;
    background-color: $C-black;
    padding: 5rem 15rem 10rem;
    display: flex;
    flex-direction: column;
    position: relative;
    @include breakpoint(xxl) {
      padding: 5rem 25rem 10rem;
    }
    @include breakpoint(xs) {
      padding: 2.5rem 2.5rem 0;
    }
  }
  &__description {
    width: 50%;
    margin-top: 10rem;
    text-align: justify;
    @include breakpoint(xs) {
      width: 100%;
      margin-top: 2.5rem;
      text-align: initial;
    }
    span {
      font-family: $F-Oswald;
      color: $C-white;
      font-size: 3.5rem;
      font-weight: $FW-light;
    }
  }
  &__demo {
    width: 100vw;
    padding: 0 15rem 15rem;
    box-sizing: border-box;
    background-color: $C_black;
    @include breakpoint(xxl) {
      padding: 0 25rem 15rem;
    }
    @include breakpoint(xs) {
      padding: 0;
      height: 100vh;
      display: flex;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
}
.creditsList {
  display: flex;
  justify-content: space-between;
  position: relative;
  @include breakpoint(xs) {
    flex-direction: column;
  }
  span {
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $C-primary;
  }
  &__item {
    @include main-title;
    text-transform: uppercase;
    color: $C-primary;
    font-weight: $FW-thin;
    font-size: 1.5rem;
    &:not(:last-child) {
      @include breakpoint(xs) {
        margin-bottom: 1.5rem;
      }
    }
    &--content {
      font-size: 1.2rem;
    }
    &--link {
      text-decoration: none;
      color: $C-primary;
    }
  }
}
</style>
