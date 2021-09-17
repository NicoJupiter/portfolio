<template>
  <div class="sideNavContainer">
    <div class="sideNav" v-if="isDisplay">
      <div class="sideNav__close" @click="$emit('closeNav')">
        close
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    },
    itemTest: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      itemTestData: this.itemTest ? {...this.itemTest} : {item1: ''}
    }
  }
}
</script>

<style scoped>
  .sideNav {
    position: absolute;
    top: 0;
    left: 0;
    width: 5rem;
    height: 100%;
    background-color: pink;
  }
</style>
