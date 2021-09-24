<template>
  <div class="mainLoader" v-if="!isInitialLoaded">
  </div>
</template>

<script>
export default {
  name: "MainLoader",
  computed: {
    isInitialLoaded() {
      return this.$store.getters.isInitialLoaded
    }
  },
  watch: {
    isInitialLoaded(newIsInitialLoaded, oldIsInitialLoaded) {
      console.log(newIsInitialLoaded)
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('setInitialLoaded', true)
    }, 2000)
  }
}
</script>

<style scoped lang="scss">
.mainLoader {
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: absolute;
  top: 0;
  overflow: hidden;
}
</style>
