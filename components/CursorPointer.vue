<template>
  <div class="cursor" ref="cursor">
    <div class="cursor__point" ref="point"></div>
    <!--<div class="cursor__label" ref="label">Découvrir</div>-->
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "CursorPointer",
  data() {
    return {
      mouse: {},
      mouseMoveHandler: this.mouseMove.bind(this)
      //eventTest: this.mouseMove(mouse, e)
    }
  },
  mounted() {

    if(!this.isMobile()) {
      gsap.set(this.$refs.cursor, {xPercent: -50, yPercent: -50});

      const cursor = this.$refs.cursor;
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      this.$data.mouse = { x: pos.x, y: pos.y };
      const speed = 0.35;

      const xSet = gsap.quickSetter(cursor, "x", "px");
      const ySet = gsap.quickSetter(cursor, "y", "px");


      window.addEventListener("mousemove", this.$data.mouseMoveHandler, false)

      gsap.ticker.add(() => {

        // adjust speed for higher refresh monitors
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

        pos.x += (this.$data.mouse.x - pos.x) * dt;
        pos.y += (this.$data.mouse.y - pos.y) * dt;
        xSet(pos.x);
        ySet(pos.y);
      });

      this.$nuxt.$on('pageTransition::reset', () => {
        console.log('ressseett pointer')
        gsap.set(this.$refs.cursor, {
          scale: 1,
          opacity: 1
        })
        gsap.to(this.$refs.point, {
          opacity: 1,
          duration: .25
        })
      })
    }
  },
  created() {
    this.$nuxt.$on('hover-item', () => {
      this.itemHover()
    })
    this.$nuxt.$on('leave-item', () => {
      this.itemLeave()
    })
    this.$nuxt.$on('link-hover', () => {
      this.linkHover()
    })
    this.$nuxt.$on('leave-link', () => {
      this.linkLeave()
    })
  },
  beforeDestroy(){
    if(!this.isMobile()) {
      this.$nuxt.$off('hover-item')
      this.$nuxt.$off('leave-item')
      this.$nuxt.$off('link-hover')
      this.$nuxt.$off('leave-link')
      this.$nuxt.$off('pageTransition::reset')
      window.removeEventListener("mousemove",  this.$data.mouseMoveHandler)
    }
  },
  methods: {
    mouseMove(e) {
      this.$data.mouse.x = e.x;
      this.$data.mouse.y = e.y;
    },
    linkHover() {
      gsap.to(this.$refs.cursor, {
        scale: 0,
        duration: .25
      })
    },
    linkLeave() {
      gsap.to(this.$refs.cursor, {
        scale: 1,
        duration: .25
      })
    },
    itemHover() {
      //this.$refs.cursor.classList.add('cursor--negatif')
      gsap.to(this.$refs.cursor, {
        scale: 2,
        duration: .25
      })
      gsap.to(this.$refs.point, {
        opacity: 0,
        duration: .25
      })
    },
    itemLeave() {
      //this.$refs.cursor.classList.remove('cursor--negatif')
      gsap.to(this.$refs.cursor, {
        scale: 1,
        duration: .25
      })
      gsap.to(this.$refs.point, {
        opacity: 1,
        duration: .25
      })
    }
  },
}
</script>


<style scoped lang="scss">
.cursor {
  @include breakpoint(xs) {
    display: none;
  }
  width: 5rem;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid $C-secondary;
  border-radius: 50%;
  z-index: 5;
  pointer-events: none;
  &--negatif {
    background: #fff;
    mix-blend-mode: difference;
  }
  &__point {
    width: 1rem;
    height: 1rem;
    background-color: $C-secondary;
    border-radius: 50%;
    @include absCenter;
    position: fixed;
  }
  &__label {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(50%, -50%);
    font-size: 1rem;
    color: $C-secondary;
    text-transform: uppercase;
    opacity: 0;
  }
}

</style>
