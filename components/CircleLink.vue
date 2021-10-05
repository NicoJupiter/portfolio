<template>
  <div class="circleLink" ref="circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <circle r="400" fill="none" cx="500" cy="500" stroke="white" stroke-width="10" ref="circle"/>
    </svg>
    <div class="circleLink__label" ref="circleLabel">{{label}}</div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  name: "CircleLink",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$refs.circle.addEventListener('mouseenter', e => {
      this.$nuxt.$emit('hover-item')
    })
    this.$refs.circle.addEventListener('mouseleave', e => {
      this.$nuxt.$emit('leave-item')
    })
  }
}
</script>

<style scoped lang="scss">
  .circleLink {
    width: 15rem;
    height: 15rem;
    position: relative;
    svg {
      transform: rotate(270deg);
      circle {
        stroke: $C-primary;
      }
    }
    &__label {
      @include absCenter;
      position: absolute;
      font-size: 1.4rem;
      color: $C-primary;
      font-family: $F-Oswald;
      text-transform: uppercase;
    }
  }
</style>
