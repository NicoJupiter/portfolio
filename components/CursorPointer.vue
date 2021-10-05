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
      posX: 0,
      posY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted() {

    gsap.set(this.$refs.cursor, {xPercent: -50, yPercent: -50});

    const cursor = this.$refs.cursor;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.35;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("mousemove", e => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    gsap.ticker.add(() => {

      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  },
  created() {
    this.$nuxt.$on('hover-item', () => {
      this.itemHover()
    })
    this.$nuxt.$on('leave-item', () => {
      this.itemLeave()
    })
  },
  beforeDestroy(){
    this.$nuxt.$off('hover-item')
    this.$nuxt.$off('leave-item')
  },
  methods: {
    itemHover() {
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
  width: 5rem;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  border: 1px solid $C-primary;
  border-radius: 50%;
  z-index: 5;
  pointer-events: none;
  &__point {
    width: 1rem;
    height: 1rem;
    background-color: $C-primary;
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
    color: $C-primary;
    text-transform: uppercase;
    opacity: 0;
  }
}

</style>
