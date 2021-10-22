import gsap from 'gsap'

export const typeA = {
  transition: {
    mode: 'out-in',
    css: false,
    leave (el, done) {
      console.log('about leave', el)
      this.$nuxt.$emit('homepage::pageTransition')
      let transitionDiv = document.querySelector('.transition')
      gsap.fromTo(transitionDiv, {
        left: -100 + '%'
      }, {
        left: 0,
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
        left: 0
      }, {
        left: 100 + '%',
        duration: .5,
        onComplete: () => {
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
    enter (el, done) {
      let transitionDiv = document.querySelector('.transition')
      gsap.fromTo(transitionDiv, {
        opacity: 1
      }, {
        opacity: 0,
        delay: 1,
        duration: .5,
        onComplete: () => {
          done()
        }
      })
    }
  }
}
