<template>
  <div class="project">
    <div class="project__intro">
      <img :src="require(`~/assets/img/${loadedProject.thumbnail}`)" alt="" ref="image"/>
      <div class="project__title">
        <div class="project__title--text" ref="title">
          {{loadedProject.title}}
        </div>
      </div>
    </div>
    <div class="project__wrapper">
      <div class="creditsList">
        <span></span>
        <div class="creditsList__item">
          <div class="creditsList__item--title">Fait par :</div>
          <div class="creditsList__item--content">test</div>
          <div class="creditsList__item--content">omg</div>
        </div>
        <div class="creditsList__item">
          <div class="creditsList__item--title">Oui Oui :</div>
        </div>
        <div class="creditsList__item">
          <div class="creditsList__item--title">tamer :</div>
        </div>
      </div>
      <div class="project__description">
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        A accusamus architecto corporis cumque dolore ex hic illo molestias nam natus,
        nostrum perferendis possimus recusandae reiciendis repudiandae velit voluptas voluptates voluptatum?
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        A accusamus architecto corporis cumque dolore ex hic illo molestias nam natus,
        nostrum perferendis possimus recusandae reiciendis repudiandae velit voluptas voluptates voluptatum?
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

export default {
  data() {
    return {
      loadedProject: null,
      blur: {
        value: 0
      }
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
    //console.log(this.$data.loadedProject)
    gsap.registerPlugin(SplitText)
    this.introAnimation()
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
      }
    }
    &__title {
      @include absCenter;
      position: absolute;
      overflow: hidden;
      z-index: 10;
      &--text {
        @include main-title;
        color: $C-white;
        font-size: 5rem;
        text-transform: uppercase;
      }
    }
    &__wrapper {
      width: 100vw;
      min-height: 100vh;
      background-color: $C-black;
      padding: 5rem 10rem;
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
