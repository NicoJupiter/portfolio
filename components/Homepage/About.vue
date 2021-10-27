<template>
  <div class="about">
    <div class="about__title" ref="title">About me</div>
    <div class="about__text" ref="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Beatae distinctio facere ipsa iusto. Adipisci, architecto assumenda at beatae ea eaque eum itaque,
      libero nam non pariatur quisquam quod totam ullam!
    </div>
    <div class="about__bottom" ref="bottom" v-for="i in 1">
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Social</div>
        <div class="about__social--item">
          <div ref="socials">
            linkedin
            <span></span>
          </div>
        </div>
        <div class="about__social--item">
          <div ref="socials">
            facebook
            <span></span>
          </div>
        </div>
        <div class="about__social--item">
          <div ref="socials">
            twitter
            <span></span>
          </div>
        </div>
        <div class="about__social--item">
          <div ref="socials">
            soundcloud
            <span></span>
          </div>
        </div>
      </div>
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Mail</div>
        <div class="about__social--item">
          <div ref="socials">
            nicolas24.j@gmail.com
            <span></span>
          </div>
        </div>
      </div>
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Autres</div>
        <div class="about__social--item">
          <div ref="socials">
            CV
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "About",
  data() {
    return {

    }
  },
  mounted() {
    this.$refs.socials.forEach(item => {
      let socialEnterHandler = this.socialEnter.bind(this, item)
      let socialLeaveHandler = this.socialLeave.bind(this, item)
      item.addEventListener('mouseenter', socialEnterHandler)
      item.addEventListener('mouseleave', socialLeaveHandler)
    })
  },
  methods: {
    socialEnter(item) {
      this.$nuxt.$emit('link-hover')
      gsap.to(item.children[0], {
        width: '100%'
      })
    },
    socialLeave(item) {
      this.$nuxt.$emit('leave-link')
      gsap.to(item.children[0], {
        width: 0
      })
    }
  },
  beforeDestroy() {
    this.$refs.socials.forEach(item => {
      let socialEnterHandler = this.socialEnter.bind(this, item)
      let socialLeaveHandler = this.socialLeave.bind(this, item)
      item.removeEventListener('mouseenter', socialEnterHandler)
      item.removeEventListener('mouseleave', socialLeaveHandler)
    })
  }
}
</script>

<style scoped lang="scss">
  .about {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__title {
      color: $C-secondary;
      font-size: 3rem;
      font-family: $F-Lato;
      margin-bottom: 2rem;
    }
    &__text {
      @include main-title;
      color: $C-white;
      letter-spacing: .4rem;
      font-size: 5rem;
      margin-bottom: 3rem;
      @include breakpoint(lt-lg) {
        font-size: 3rem;
      }
    }
    &__bottom {
      display: flex;
    }
    &__social {
      margin-right: 7rem;
      font-size: 1.8rem;
      &--title {
        color: $C-secondary;
        margin-bottom: 1rem;
      }
      &--item {
        margin-bottom: .5rem;
        overflow: hidden;
        div {
          text-decoration: none;
          color: $C-white;

          position: relative;
          display: inline-block;
          span {
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: $C-white;
            height: 1px;
            width: 0;
          }
        }
      }
    }
  }
</style>
