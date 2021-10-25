<template>
  <div class="app">
    <TransitionLoader/>
    <CursorPointer/>
    <nuxt/>
  </div>
</template>

<script>
import MainLoader from "@/components/Loaders/MainLoader";
import gsap from 'gsap'
import CursorPointer from "@/components/CursorPointer";
import TransitionLoader from "@/components/Loaders/TransitionLoader";
export default {
  components: {TransitionLoader, CursorPointer, MainLoader},

}
</script>
