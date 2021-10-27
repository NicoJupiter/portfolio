<template>
  <div class="circleLink" ref="circleLink">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <circle r="400" fill="none" cx="500" cy="500" stroke="white" stroke-width="15" ref="circle"/>
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
  data() {
    return {
      emitHandlerEnter: this.emitEventEnter.bind(this),
      emitHandlerExit: this.emitEventExit.bind(this)
    }
  },
  mounted() {
    this.$refs.circleLink.addEventListener('mouseenter', this.$data.emitHandlerEnter)
    this.$refs.circleLink.addEventListener('mouseleave', this.$data.emitHandlerExit)
  },
  methods: {
    emitEventEnter() {
      this.$nuxt.$emit('hover-item')
    },
    emitEventExit() {
      this.$nuxt.$emit('leave-item')
    }
  },
  beforeDestroy() {
    this.$refs.circleLink.removeEventListener('mouseenter', this.$data.emitHandlerEnter)
    this.$refs.circleLink.removeEventListener('mouseleave', this.$data.emitHandlerExit)
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
      font-weight: $FW-medium;

      text-transform: uppercase;
    }
  }
</style>
