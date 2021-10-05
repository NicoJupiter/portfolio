<template>
  <div class="app">
    <CursorPointer/>
    <!--<MainLoader/>-->
    <nuxt/>
  </div>
</template>

<script>
import MainLoader from "@/components/Loaders/MainLoader";
import gsap from 'gsap'
import CursorPointer from "@/components/CursorPointer";
export default {
  components: {CursorPointer, MainLoader},

}
</script>
