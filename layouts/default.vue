<template>
  <div class="app">
    <IndexBtn/>
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
import IndexBtn from "@/components/IndexBtn";
export default {
  components: {IndexBtn, TransitionLoader, CursorPointer, MainLoader},

}
</script>
