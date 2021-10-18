<template>
  <div class="navSections">
    <div class="navSections__wrapper" v-for="i in 1">
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label" ref="label">
          Homepage
        </div>
        <div class="navSections__item__line"></div>
      </div>
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label" ref="label">
          Projets
        </div>
        <div class="navSections__item__line"></div>
      </div>
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label" ref="label">
          à propos
        </div>
        <div class="navSections__item__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import ScrollTo from '@/assets/js/ScrollToPlugin.min'

export default {
  name: "NavSections",
  data() {
    return {
      buttonClicked: false
    }
  },
  mounted() {

    console.log()
    gsap.registerPlugin(ScrollTo)

    this.$refs.item[0].classList.add('navSections__item--active')

    this.$nuxt.$on('homepage::updateDistortion', (i) => {
      if(this.$refs.item.length > 0) {
        this.$refs.item.forEach((item) => {
          item.classList.remove('navSections__item--active')
        })
        this.$refs.item[i].classList.add('navSections__item--active')
      }
    })

    this.$refs.label.forEach((item, index) => {
      item.addEventListener('click', () => {
        if(!this.$data.buttonClicked) {
          this.goToSection(index)
        }
      })
      item.addEventListener('mouseenter', () => {
        this.$nuxt.$emit('link-hover')
      })
      item.addEventListener('mouseleave', () => {
        this.$nuxt.$emit('leave-link')
      })
    })

  },
  methods: {
    goToSection(i) {
      let scrollToPx = 0
      if(i === 2) {
        scrollToPx = document.body.offsetHeight - window.innerHeight
      } else {
        scrollToPx = i * window.innerHeight + 1
      }
      gsap.to(window, {
        scrollTo: {y: scrollToPx, autoKill: false },
        duration: 1,
        onComplete: () => {
          this.$data.buttonClicked = false;
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .navSections {
    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
    &__item {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      &__label {
        @include main-title;
        letter-spacing: 0.5rem;
        text-transform: uppercase;
        font-size: 2rem;
        color: rgba($C-white, .5);
        transition: all .5s;
        position: relative;
      }
      &__line {
        width: 4rem;
        height: 1px;
        background-color: rgba($C-white, .5);
        margin: 0 1rem;
        transition: all .5s;
      }

      &--active {
        .navSections__item__label {
          color: $C-secondary;
        }
        .navSections__item__line {
          background-color: $C-secondary;
        }
      }
    }
  }
</style>
