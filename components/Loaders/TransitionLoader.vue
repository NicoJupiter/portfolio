<template>
  <div v-if="loading" class="loading-page">
    <h1>Loading</h1>
  </div>
</template>

<script>
export default {
  name: "LoadingAnimation",
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

<style scoped>

</style>
