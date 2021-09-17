<template>
  <div class="noText">
    <TextIntro/>
    <TextIntro/>
  </div>
</template>

<script>
import TextIntro from "@/components/ProjectComponents/TextIntro";
export default {
name: "NoTextPage",
  components: {TextIntro},
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
