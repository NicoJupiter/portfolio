<template>
  <div class="navSections">
    <div class="navSections__item" ref="item">
      <div class="navSections__item__label">
        <div class="navSections__item__label--active" ref="active">Homepage</div>
        <div class="navSections__item__label--hidden" ref="hidden">Homepage</div>
      </div>
      <div class="navSections__item__line"></div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "NavSections",
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  .navSections {

    &__item {
      display: flex;
      align-items: center;
      &__label {
        @include main-title;
        text-transform: uppercase;
        font-size: 2rem;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 15rem;
        height: 3rem;
        overflow: hidden;
        &--active {
          position: absolute;
          right: 0;
          color: rgba($C-white, .5);
        }
        &--hidden {
          position: absolute;
          top: 100%;
          right: 0;
          color: $C-secondary;
        }
      }
      &__line {
        width: 7rem;
        height: 1px;
        background-color: rgba($C-white, .5);
        margin: 0 1rem;
      }

    }
  }
</style>
