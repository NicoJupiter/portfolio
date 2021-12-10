<template>
  <div class="projectBlock"
       :class="['projectBlock--'+blockParams.horizontalAlign]">
    <div class="projectBlock__square" v-if="blockParams.type === 'square'">
      <img src="~/assets/img/malegaze.jpg" alt="" />
    </div>
    <div class="projectBlock__rectangle" v-if="blockParams.type === 'rectangle'">
      simple block
    </div>
    <div class="projectBlock__horizontal" v-if="blockParams.type === 'horizontal'">
      <img src="~/assets/img/malegaze.jpg" alt="" />
    </div>
    <div class="projectBlock__label" v-if="blockParams.type === 'label'">
      <div class="projectBlock__label--text">
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit.
      </div>
      <div class="projectBlock__rectangle">
        block rectangle
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectBlock",
  props: {
    /*typeBlock: {
      type: String,
      required: true
    },*/
    blockParams: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped lang="scss">
  .projectBlock {
    margin-bottom: 10rem;
    display: flex;

    //----------Horizontal align-----------------
    &--center {
      justify-content: center;
    }
    &--right {
      justify-content: right;
    }

    &__horizontal {
      width: 100%;
      height: 35rem;
      background-color: #C4C4C4;
      overflow: hidden;
      position: relative;
      img {
        @include absCenter;
        position: absolute;
      }
    }
    &__rectangle {
      width: 40rem;
      height: 55rem;
      background-color: #C4C4C4;
      position: relative;
      overflow: hidden;
      img {
        @include absCenter;
        position: absolute;
      }
    }
    &__square {
      width: 37.5rem;
      height: 40rem;
      background-color: #C4C4C4;
      position: relative;
      overflow: hidden;
      img {
        @include absCenter;
        position: absolute;
      }
    }

    &__label {
      &--text {
        text-align: center;
        font-family: $F-Lato;
        font-weight: $FW-thin;
        color: $C-lightGrey;
        font-size: 3.6rem;
        margin-bottom: 5rem;
      }
      & .projectBlock__rectangle {
        margin: auto;
      }
    }
  }
</style>
