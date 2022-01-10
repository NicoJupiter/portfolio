<template>
  <div class="transition">
    <div class="transition--1"></div>
    <div class="transition--2"></div>
    <div class="transition--3"></div>
  </div>
</template>

<script>
export default {
  name: "TransitionLoader",
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  /*.transition {
    width: 100vw;
    height: 100vh;
    background-color: $C-black;
    z-index: 20;
    position: fixed;
    left: 0;
    bottom: -100%;
    pointer-events: none;
  }*/
  .transition {
    overflow: hidden;
    z-index: 20;
    pointer-events: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    &--1 {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: $C-primary;
      transform: translate(0%, -100%);
    }
    &--2 {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: $C-secondary;
      transform: translate(0%, -100%);
    }
    &--3 {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: $C-black;
      transform: translate(0%, -100%);
    }
  }
</style>
