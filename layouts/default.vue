<template>
  <div>
    <Header @openNav="isOpenSideNav = !isOpenSideNav" />
    <SideNav :is-display="isOpenSideNav" @closeNav="isOpenSideNav = false" :item-test="itemTest" />
    <nuxt/>
  </div>
</template>

<style>
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
  }
</style>
<script>
import Header from "@/components/Navigation/Header";
import SideNav from "@/components/Navigation/SideNav";
export default {
  components: {SideNav, Header},
  data() {
    return{
      isOpenSideNav: false,
      itemTest: {
        item1: 'oui'
      }
    }
  },
  mounted() {
    console.log(this.$data.isOpenSideNav)
  }
}
</script>
