<template>
  <div class="transition">
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
  .transition {
    width: 100vw;
    height: 100vh;
    background-color: $C-black;
    z-index: 20;
    position: fixed;
    left: 0;
    bottom: -100%;
    pointer-events: none;
  }
</style>
