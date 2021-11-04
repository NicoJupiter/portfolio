<template>
  <div class="mainLoader" v-if="!isInitialLoaded" ref="mainLoader">
    <div class="mainLoader__wrapper" ref="wrapper">
      <div class="mainLoader__title">
        <div class="mainLoader__title--name" ref="name">Jupiter</div>
      </div>
      <div class="mainLoader__title">
        <div class="mainLoader__title--subName" ref="subname">Nicolas</div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
import SplitText from "assets/js/SplitText";

export default {
  computed: {
    isInitialLoaded() {
      return this.$store.getters.isInitialLoaded
    }
  },
  mounted() {
    gsap.registerPlugin(SplitText)
    let splitName = new SplitText(this.$refs.name, {type: "chars"})
    let splitSubName = new SplitText(this.$refs.subname, {type: "chars"})

    gsap.set(this.$refs.wrapper, {
      opacity: 1
    })

    let tl = gsap.timeline({
      delay: 1,
      onComplete:() => {
        this.endAnimation()
      }
    })
    tl.fromTo(splitName.chars, {
      y: 120,
    }, {
      y: 0,
      stagger: 0.1
    })
    tl.fromTo(splitSubName.chars, {
      y: 120,
    }, {
      y: 0,
      stagger: 0.1
    }, .2)

    /*setTimeout(() => {
      this.$store.commit('setInitialLoaded', true)
    }, 2000)*/
  },
  methods: {
    endAnimation() {
      let tlEnd = gsap.timeline({
        delay: 1,
        onComplete:() => {
          this.$store.commit('setInitialLoaded', true)
        }
      })
      tlEnd.to(this.$refs.name, {
        y: 120
      })
      tlEnd.to(this.$refs.subname, {
        y: 120
      }, 0)
      tlEnd.to(this.$refs.mainLoader, {
        yPercent: 100,
        duration: .5
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mainLoader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $C-black;
  z-index: 300;
  &__wrapper {
    position: fixed;
    left: 5rem;
    bottom: 5rem;
    opacity: 0;
  }
  &__title {
    @include main-title;
    color: $C-primary;
    font-size: 8rem;
    overflow: hidden;
    text-transform: uppercase;
    @include breakpoint(xs){
      font-size: 4rem;
    }
    &--name,
    &--subName {
      div {
        transform: translateY(-100%);

      }
    }
  }
}
</style>
