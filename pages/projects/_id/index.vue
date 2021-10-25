<template>
  <div class="project">
    <IndexBtn/>
    <div class="project__intro" ref="container">
      <img :src="require(`~/assets/img/${loadedProject.thumbnail}`)" alt="" ref="image"/>
      <div class="project__title">
        <div class="project__title--text" ref="title">
          {{loadedProject.title}}
        </div>
      </div>
    </div>
    <div class="project__wrapper" ref="wrapper">
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
          <div class="creditsList__item--content">{{loadedProject.url}}</div>
        </div>
      </div>
      <div class="project__description">
        <span ref="description">
           {{loadedProject.content}}
        </span>
      </div>
    </div>
    <div class="project__demo">
      <div class="project__demo--video">oui la video</div>
    </div>
   </div>
</template>

<script>
import axios from 'axios'
import gsap from 'gsap'
import SplitText from '@/assets/js/SplitText'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import IndexBtn from "@/components/IndexBtn";

export default {
  components: {IndexBtn},
  data() {
    return {
      loadedProject: null,
      blur: {
        value: 0
      },
      wrapperSt: null,
    }
  },
  asyncData(context) {
    return axios.get('https://portfolio-55714-default-rtdb.firebaseio.com/'+context.params.id+'.json')
      .then(res => {
        return {
          loadedProject : res.data
        }
      }).catch(e => console.log('error data'))
  },
  mounted() {
    gsap.registerPlugin(SplitText, ScrollTrigger)
    this.introAnimation()
    console.log(this.$refs.description)

    //init parallax
    gsap.to(this.$refs.image, {
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

    let splitDescriptionText = new SplitText(this.$refs.description, {type: "words"})
    let descriptionTl = gsap.timeline()

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

    this.$data.wrapperSt = ScrollTrigger.create({
      trigger: this.$refs.wrapper,
      start: 'center bottom',
      animation: descriptionTl,
      toggleActions: 'play none none none'
    })

  },
  methods: {
    introAnimation() {
      let splitTitle = new SplitText(this.$refs.title, {type: "chars"})
      let tlIntro = gsap.timeline()

      gsap.set(splitTitle.chars, {
        y: 200
      })
      tlIntro.to(this.$data.blur, {
        value: 15,
        duration: 1,
        onUpdate: () => {
          this.addBlur()
        }
      })
      tlIntro.to(splitTitle.chars, {
        y: 0,
        stagger: 0.05,
      }, .5)

    },
    addBlur() {
      gsap.set(this.$refs.image, {webkitFilter:"blur(" + this.$data.blur.value + "px)"});
    }
  },
  beforeDestroy() {
    this.$data.wrapperSt.kill()
  }
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
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($C-black, .4);
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
      &--text {
        @include main-title;
        color: $C-white;
        font-size: 10rem;
        text-transform: uppercase;
      }
    }
    &__wrapper {
      width: 100vw;
      min-height: 100vh;
      background-color: $C-black;
      padding: 5rem 10rem;
      display: flex;
      flex-direction: column;
    }
    &__description {
      width: 50%;
      margin-left: 50%;
      margin-top: 5rem;
      span {
        font-family: $F-Oswald;
        color: $C-white;
        font-size: 3.5rem;
        font-weight: $FW-light;
      }
    }
    &__demo {
      width: 100vw;
      height: 100vh;
      padding: 0 5rem;
      background-color: $C_black;
      &--video {
        width: 100%;
        height: 100%;
        background-color: pink;
      }
    }
  }

  .creditsList {
    display: flex;
    justify-content: space-between;
    position: relative;
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
      &--content {
        font-size: 1.2rem;
      }
    }
  }
</style>
