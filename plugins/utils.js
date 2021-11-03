import Vue from 'vue'

Vue.mixin({
  methods: {
    isMobile() {
      return (window.innerWidth <= 810)
    },
    isIE() {
      let ua = window.navigator.userAgent;
      return /MSIE|Trident/.test(ua)
    }
  }
})
