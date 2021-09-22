<template>
  <div>
    <MainLoader/>
    <nuxt/>
  </div>
</template>

<script>
import MainLoader from "@/components/Loaders/MainLoader";
export default {
  components: {MainLoader}
}
</script>

