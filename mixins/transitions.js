import gsap from 'gsap'

export const typeA = {
  transition: {
    mode: 'out-in',
    css: false,
    leave (el, done) {
      this.$nuxt.$emit('homepage::pageTransition')

      let transition1 = document.querySelector('.transition--1')
      let transition2 = document.querySelector('.transition--2')
      let transition3 = document.querySelector('.transition--3')
      let array1 = [transition1, transition2, transition3]
      gsap.to(array1, {
        y: 0,
        duration: .8,
        stagger: 0.2,
        delay: .5,
        onComplete: () => {
          done()
        }
      })

    },

    enter (el, done) {
      let transition1 = document.querySelector('.transition--1')
      let transition2 = document.querySelector('.transition--2')
      let transition3 = document.querySelector('.transition--3')
      let array2 = [transition3, transition2, transition1]
      let windowHeight = window.innerHeight
      gsap.to(array2, {
        y: -windowHeight,
        duration: .8,
        stagger: 0.2,
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
    enter (el, done) {
      let transition1 = document.querySelector('.transition--1')
      let transition2 = document.querySelector('.transition--2')
      let transition3 = document.querySelector('.transition--3')
      let windowHeight = window.innerHeight
      let array2 = [transition3, transition2, transition1]
      gsap.to(array2, {
        y: -windowHeight,
        duration: .8,
        stagger: 0.2,
        onComplete: () => {
          this.$nuxt.$emit('pageTransition::reset')
          done()
        }
      })
    },
    leave (el, done) {
      let transition1 = document.querySelector('.transition--1')
      let transition2 = document.querySelector('.transition--2')
      let transition3 = document.querySelector('.transition--3')
      let array1 = [transition1, transition2, transition3]
      gsap.to(array1, {
        y: 0,
        duration: .8,
        stagger: 0.2,
        onComplete: () => {
          this.$nuxt.$emit('pageTransition::reset')
          done()
        }
      })
    }
  }
}
