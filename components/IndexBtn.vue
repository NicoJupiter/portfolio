<template>
  <div class="indexBtn" ref="indexBtn">
    <nuxt-link to="/">Jupiter Nicolas</nuxt-link>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "IndexBtn",
  mounted() {
    this.$refs.indexBtn.addEventListener('mouseenter', () => {
      gsap.to(this.$refs.indexBtn, {
        y: -5,
        duration: .5
      })
      this.$nuxt.$emit('link-hover')
    })
    this.$refs.indexBtn.addEventListener('mouseleave', () => {
      gsap.to(this.$refs.indexBtn, {
        y: 0,
        duration: .5
      })

      this.$nuxt.$emit('leave-link')
    })

    this.$nuxt.$on('homepage::updateDistortion', (i) => {
      if (i !== 1) {
        gsap.to(this.$refs.indexBtn, {
          opacity: 1,
          duration: .25,
        })
      } else {
        gsap.to(this.$refs.indexBtn, {
          opacity: 0,
          duration: .25,
        })
      }
    })
    this.$nuxt.$on('pageTransition::reset', () => {
      gsap.to(this.$refs.indexBtn, {
        opacity: 1,
        duration: .25,
      })
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('homepage::updateDistortion')
    this.$nuxt.$off('pageTransition::reset')
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
    a {
      text-decoration: none;
      color: $C-primary;
    }
  }
</style>
