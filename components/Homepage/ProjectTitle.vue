<template>
  <div class="projectTitleWrapper" ref="wrapperProject">
    <div class="projectTitle" ref="rowProject"
         :direction="direction">
      <div class="projectTitle__item" ref="itemProject">
        Project-
      </div>
    </div>
  </div>
</template>

<script>
import {gsap, Power4} from 'gsap'
export default {
  name: "ProjectTitle",
  props: {
    direction: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      xTranslateMax : 0
    }
  },
  mounted() {
    this.cloneProjectTitle()
    this.titleAppear()
  },
  methods: {
    cloneProjectTitle() {

     this.$data.xTranslateMax = this.$refs.itemProject.getBoundingClientRect().width;

      let sizeScreen = window.innerWidth + ( this.$data.xTranslateMax * 2);
      let currentRowSize =  0;

      console.log(this.$data.xTranslateMax)
      console.log(sizeScreen)
      let i = 1
      while (sizeScreen > currentRowSize) {
        let clone = this.$refs.itemProject.cloneNode(true);
        this.$refs.rowProject.appendChild(clone);

        currentRowSize = currentRowSize + this.$data.xTranslateMax *i;
        i++;
      }
    },
    titleAppear() {
      if(this.$props.direction === "left") {
        gsap.fromTo(this.$refs.rowProject, {
          x: 2500,
        }, {
          x: 0,
          ease: "slow(0.7, 0.7, false)",
          duration: 2,
          onComplete:() => {
            this.textAnimation()
          },
          scrollTrigger: {
            trigger: this.$refs.wrapperProject.parentNode,
            start: "top center",
            markers: true,
          }
        })
      } else {
        gsap.fromTo(this.$refs.rowProject, {
          x: -2500,
        }, {
          x: -this.$data.xTranslateMax,
          ease: "slow(0.7, 0.7, false)",
          duration: 2,
          onComplete:() => {
            this.textAnimation()
          },
          scrollTrigger: {
            trigger: this.$refs.wrapperProject.parentNode,
            start: "top center",
            markers: true,
          }
        })
      }

    },
    textAnimation() {

      let tl = gsap.timeline({
        repeat: -1
      })

      if(this.$props.direction === "left") {
        tl.to(this.$refs.rowProject, {x: '-' + this.$data.xTranslateMax, duration: (this.$data.xTranslateMax / 30), ease: 'none'});
      } else {
        tl.to(this.$refs.rowProject, {x: this.$data.xTranslateMax, duration: (this.$data.xTranslateMax / 30), ease: 'none'});
      }

    }
  }
}
</script>

<style scoped lang="scss">
  .projectTitleWrapper {
    position: relative;
    height: 12rem;
  }
  .projectTitle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    &__item {
      @include main-title;
      color: rgba($C-primary, 0.6);
      text-transform: uppercase;
      font-size: 7rem;
    }
  }
</style>
