import gsap from 'gsap'

export const typeA = {
  transition: {
    mode: 'out-in',
    css: false,
    leave (el, done) {
      this.$nuxt.$emit('homepage::pageTransition')
      let transitionDiv = document.querySelector('.transition')
      gsap.fromTo(transitionDiv, {
        bottom: -100 + '%'
      }, {
        bottom: 0,
        delay: .5,
        duration: .5,
        onComplete: () => {
          done()
        }
      })
    },

    enter (el, done) {
      let transitionDiv = document.querySelector('.transition')
      gsap.fromTo(transitionDiv, {
        bottom: 0
      }, {
        bottom: 100 + '%',
        delay: .5,
        duration: .5,
        onComplete: () => {
          this.$nuxt.$emit('pageTransition::reset')
          done()
        }
      })
    }
  }
}

export const typeB = {
  transition: {
    mode: 'out-in',
    css: false,
    leave (el, done) {

      let transitionDiv = document.querySelector('.transition')
      gsap.fromTo(transitionDiv, {
        bottom: -100 + '%'
      }, {
        bottom: 0,
        delay: .5,
        duration: .5,
        onComplete: () => {
          this.$nuxt.$emit('pageTransition::reset')
          done()
        }
      })
    },
  }
}
