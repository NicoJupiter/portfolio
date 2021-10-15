<template>
  <div class="navSections">
    <div class="navSections__wrapper" v-for="i in 1">
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label">
          Homepage
        </div>
        <div class="navSections__item__line"></div>
      </div>
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label">
          Projets
        </div>
        <div class="navSections__item__line"></div>
      </div>
      <div class="navSections__item" ref="item">
        <div class="navSections__item__label">
          à propos
        </div>
        <div class="navSections__item__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "NavSections",
  mounted() {

    this.$refs.item[0].classList.add('navSections__item--active')

    this.$nuxt.$on('homepage::updateDistortion', (i) => {
      if(this.$refs.item.length > 0) {
        this.$refs.item.forEach((item) => {
          item.classList.remove('navSections__item--active')
        })
        this.$refs.item[i].classList.add('navSections__item--active')
      }
    })

    this.$refs.item.forEach(item => {
      item.addEventListener('click', () => {

      })
    })

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
