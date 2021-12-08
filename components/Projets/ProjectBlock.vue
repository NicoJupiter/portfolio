<template>
  <div class="projectBlock">
    <div class="projectBlock__horizontal" v-if="typeBlock === 'horizontal'">
      Horizontal Block
    </div>
    <div class="projectBlock__double" v-if="typeBlock === 'double'">
      <div class="projectBlock__rectangle">
        Block 1
      </div>
      <div class="projectBlock__square">
        Block 1
      </div>
    </div>
    <div class="projectBlock__simple" :class="alignBlock != null ? 'projectBlock--'+alignBlock : ''" v-if="typeBlock === 'simple'">
      <div class="projectBlock__rectangle">
        simple block
      </div>
    </div>
    <div class="projectBlock__label" v-if="typeBlock === 'label'">
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
    typeBlock: {
      type: String,
      required: true
    },
    alignBlock: {
      type: String,
      required: false
    }
  },
}
</script>

<style scoped lang="scss">
  .projectBlock {
    margin-bottom: 10rem;
    &__horizontal {
      height: 35rem;
      background-color: #C4C4C4;
    }
    &__rectangle {
      width: 40rem;
      height: 55rem;
      background-color: #C4C4C4;
    }
    &__square {
      width: 37.5rem;
      height: 40rem;
      background-color: #C4C4C4;
    }
    &__double {
      display: flex;
      justify-content: space-between;
      & .projectBlock__square {
        align-self: end;
      }
    }
    &__simple {
      display: flex;
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
    &--left {
      justify-content: left;
    }
    &--center {
      justify-content: center;
    }
    &--right {
      justify-content: end;
    }
  }
</style>
