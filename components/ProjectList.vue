<template>
  <div class="projectList">
    <div class="projectList__item"
         v-for="loadedProject in loadedProjects"
         :key="loadedProject.id">
      <div class="projectList__itemTitle">{{loadedProject.title}}</div>
      <div class="projectList__id">{{loadedProject.id}}</div>
      <nuxt-link :to="`/projects/${loadedProject.id}`">Go to</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  props: {
    loadedProjects: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
