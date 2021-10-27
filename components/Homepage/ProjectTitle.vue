<template>
  <div class="projectTitleWrapper" ref="wrapperProject">
    <div class="projectTitle" ref="rowProject"
         :direction="direction">
      <div class="projectTitle__item" ref="itemProject">
        {{label}}
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
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      xTranslateMax : 0,
      yTranslateMax: 0,
    }
  },
  mounted() {
    this.cloneProjectTitle()

    this.$nuxt.$on('homepage::updateDistortion', (i) => {
      if (i === 1) {
        gsap.to(this.$refs.wrapperProject, {
          opacity: 1,
          duration: .25,
        })
      } else {
        gsap.to(this.$refs.wrapperProject, {
          opacity: 0,
          duration: .25,
        })
      }
    })

    if (this.$props.direction === 'right') {
      this.$refs.rowProject.style.left = '-' + this.$data.xTranslateMax + 'px'
    }
    this.textAnimation()
    //this.titleAppear()
  },
  beforeDestroy() {
    this.$nuxt.$off('homepage::updateDistortion')
  },
  methods: {
    cloneProjectTitle() {
      if(this.$props.direction === 'up' || this.$props.direction === 'down') {
        this.$data.yTranslateMax = this.$refs.itemProject.getBoundingClientRect().height;
        let sizeScreen = window.innerHeight + ( this.$data.yTranslateMax * 2);
        let currentRowSize =  0;
        let i = 1
        while (sizeScreen > currentRowSize) {
          let clone = this.$refs.itemProject.cloneNode(true);
          this.$refs.rowProject.appendChild(clone);

          currentRowSize = currentRowSize + this.$data.yTranslateMax *i;
          i++;
        }
      }

      if(this.$props.direction === 'left' || this.$props.direction === 'right') {

        this.$data.xTranslateMax = this.$refs.itemProject.getBoundingClientRect().width;
        let sizeScreen = window.innerWidth + ( this.$data.xTranslateMax * 3);
        let currentRowSize =  0;

        let i = 1
        while (sizeScreen > currentRowSize) {
          let clone = this.$refs.itemProject.cloneNode(true);
          this.$refs.rowProject.appendChild(clone);

          currentRowSize = currentRowSize + this.$data.xTranslateMax *i;
          i++;
        }
      }

    },
    textAnimation() {

      let tl = gsap.timeline({
        repeat: -1
      })

      if(this.$props.direction === "left") {
        tl.to(this.$refs.rowProject, {x: '-' + this.$data.xTranslateMax, duration: (this.$data.xTranslateMax / 30), ease: 'none'});
      } else if(this.$props.direction === "up") {
        tl.to(this.$refs.rowProject, {x: '-' + this.$data.yTranslateMax, duration: (this.$data.yTranslateMax / 30), ease: 'none'});
      } else if(this.$props.direction === "right") {
        tl.to(this.$refs.rowProject, {x: this.$data.xTranslateMax, duration: (this.$data.xTranslateMax / 30), ease: 'none'});
      } else if(this.$props.direction === 'down') {
        tl.to(this.$refs.rowProject, {x: '-' + this.$data.yTranslateMax, duration: (this.$data.yTranslateMax / 30), ease: 'none'});
      }

    },
    titleAppear() {
      if(this.$props.direction === "left") {
        this.$data.titleSt =  gsap.fromTo(this.$refs.rowProject, {
          x: 2500,
          scrollTrigger: {
            trigger: this.$refs.wrapperProject.parentNode,
            start: "top center",
            markers: true,
          }
        }, {
          x: 0,
          ease: "slow(0.7, 0.7, false)",
          duration: 2,
          onComplete:() => {
            this.textAnimation()
          }
        })
      } else {
        this.$data.titleSt = gsap.fromTo(this.$refs.rowProject, {
          x: -2500,
          scrollTrigger: {
            trigger: this.$refs.wrapperProject.parentNode,
            start: "top center",
            markers: true,
          }
        }, {
          x: -this.$data.xTranslateMax,
          ease: "slow(0.7, 0.7, false)",
          duration: 2,
          onComplete:() => {
            this.textAnimation()
          },
        })
      }
    }
  },

}
</script>

<style scoped lang="scss">
  .projectTitleWrapper {
    position: relative;
    opacity: 0;
    @include breakpoint(lt-md){
      display: none;
    }
  }
  .projectTitle {
    display: flex;
    &__item {
      @include main-title;
      @include breakpoint(lt-lg) {
        font-size: 5rem;
      }
      color: rgba($C-primary, 0.3);
      text-transform: uppercase;
      font-size: 7rem;
    }
  }
</style>
