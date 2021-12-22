<template>
  <div class="projectList">
    <div class="projectList__item">
      <div class="projectList__item__title">Malegaze</div>
      <div class="projectList__item__image">
        <img src="~/assets/img/la-nouvelle.PNG" alt="" />
      </div>
    </div>
    <div class="projectList__item">
      <div class="projectList__item__title">Malegaze</div>
      <div class="projectList__item__image">
        <img src="~/assets/img/malegaze.jpg" alt="" />
      </div>
    </div>
    <div class="projectList__item">
      <div class="projectList__item__title">Malegaze</div>
      <div class="projectList__item__image">
        <img src="~/assets/img/secudiag.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "ProjectList",
  props: {
    loadedProject: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log(this.$store.getters.loadedProjects)
    console.log(this.loadedProject)
  }
}
</script>

<style scoped lang="scss">
  .projectList {
    &__item {
      border-top: 2px solid $C-primary;
      position: relative;
      overflow: hidden;
      &__title {
        @include main-title;
        font-size: 9.6rem;
        color: rgba($C-white, .5);
        text-align: center;
        padding: 5rem 0;
        z-index: 1;
        position: relative;
        text-transform: uppercase;
      }
      &__image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
        transition: all .5s;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba($C-black, .8);
          width: 100%;
          height: 100%;
        }
        img {
          @include absCenter;
          position: absolute;
        }
      }
      &:hover {
        .projectList__item__image {
          transform: scale(1.1);
        }
        .projectList__item__title {
          color: rgba($C-white, 1);
        }
      }
    }
  }
</style>
