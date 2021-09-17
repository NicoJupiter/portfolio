<template>
  <div class="header">
    <div class="header__open" @click="$emit('openNav')">
      open
    </div>
  </div>
</template>

<script>
export default {
name: "Header"
}
</script>

<style scoped>
  .header {
    width: 100%;
    background-color: black;
    padding: 2rem;
    box-sizing: border-box;
  }
  .header__open {
    color: white;
  }
</style>
