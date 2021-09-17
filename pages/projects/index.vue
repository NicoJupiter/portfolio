<template>
  <div class="projects">
    <ProjectList :loaded-projects="loadedProjects" />
  </div>
</template>

<script>
  import ProjectList from "@/components/ProjectList";
  export default {
    components: {ProjectList},
    computed: {
      loadedProjects() {
        console.log(this.$store.getters.loadedProjects)
        return this.$store.getters.loadedProjects
      }
    }
    //layout: 'projects'
  }
</script>
