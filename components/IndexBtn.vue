<template>
  <div class="indexBtn" ref="indexBtn">
    <nuxt-link to="/">Jupiter Nicolas</nuxt-link>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "IndexBtn",
  data() {
    return {
      mouseEventEnterHandler: this.mouseEventEnter.bind(this),
      mouseEventLeaveHandler: this.mouseEventLeave.bind(this)
    }
  },
  mounted() {
    this.$refs.indexBtn.addEventListener('mouseenter', this.$data.mouseEventEnterHandler)
    this.$refs.indexBtn.addEventListener('mouseleave', this.$data.mouseEventLeaveHandler)

    this.$nuxt.$on('homepage::updateDistortion', (i) => {
      if (i !== 1) {
       this.labelApparition()
      } else {
       this.labelDisappear()
      }
    })
    this.$nuxt.$on('pageTransition::reset', () => {
      this.labelApparition()
    })
    this.$nuxt.$on('project::homeSlide', (isSlide) => {
      isSlide ? this.labelDisappear() : this.labelApparition()
    })
  },
  methods: {
    labelDisappear() {
      gsap.to(this.$refs.indexBtn, {
        opacity: 0,
        duration: .25,
      })
    },
    labelApparition() {
      gsap.to(this.$refs.indexBtn, {
        opacity: 1,
        duration: .25,
      })
    },
    mouseEventEnter() {
      gsap.to(this.$refs.indexBtn, {
        y: -5,
        duration: .5
      })
      this.$nuxt.$emit('link-hover')
    },
    mouseEventLeave() {
      gsap.to(this.$refs.indexBtn, {
        y: 0,
        duration: .5
      })

      this.$nuxt.$emit('leave-link')
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('homepage::updateDistortion')
    this.$nuxt.$off('pageTransition::reset')
    this.$nuxt.$off('project::homeSlide')
    this.$refs.indexBtn.removeEventListener('mouseenter', this.$data.mouseEventEnterHandler)
    this.$refs.indexBtn.removeEventListener('mouseleave', this.$data.mouseEventLeaveHandler)
  }
}
</script>

<style scoped lang="scss">
  .indexBtn {
    font-family: $F-Oswald;
    font-weight: $FW-medium;
    font-size: 2rem;
    letter-spacing: 0.2rem;
    position: fixed;
    top: 5rem;
    left: 5rem;
    z-index: 200;
    text-transform: uppercase;
    overflow: hidden;
    a {
      text-decoration: none;
      color: $C-primary;
    }
  }
</style>
