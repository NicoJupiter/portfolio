<template>
  <div class="classicPage">
    <TextIntro/>
    <ImageFull/>
    <TextIntro/>
  </div>
</template>

<script>
import TextIntro from "@/components/ProjectComponents/TextIntro";
import ImageFull from "@/components/ProjectComponents/ImageFull";
export default {
name: "ClassicPage",
  components: {ImageFull, TextIntro},
  props: {
    pageContent: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
