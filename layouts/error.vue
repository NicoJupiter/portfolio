<template>
  <div class="error">
    <CursorPointer/>
    <div class="error__404">
      404
    </div>
    <nuxt-link to="/" class="error__link" ref="link">
      Retourner à la page d’accueil
    </nuxt-link>
  </div>
</template>


<script>
import gsap from 'gsap'
import CursorPointer from "@/components/CursorPointer";

export default {
  name: "Error",
  components: {CursorPointer},
  data() {
    return {
      eventEnterLinkHandler: this.eventEnterLink.bind(this),
      eventLeaveLinkHandler: this.eventLeaveLink.bind(this)
    }
  },
  mounted() {
    this.$refs.link.$el.addEventListener('mouseenter', this.$data.eventEnterLinkHandler)
    this.$refs.link.$el.addEventListener('mouseleave', this.$data.eventLeaveLinkHandler)
  },
  methods: {
    eventEnterLink() {
      this.$nuxt.$emit('hover-item')
    },
    eventLeaveLink() {
      this.$nuxt.$emit('leave-item')
    }
  },
  beforeDestroy() {
    this.$refs.link.$el.removeEventListener('mouseenter', this.$data.eventEnterLinkHandler)
    this.$refs.link.$el.removeEventListener('mouseleave', this.$data.eventLeaveLinkHandler)
  }
}
</script>

<style lang="scss">
  .error {
    width: 100vw;
    height: 100vh;
    background-color: $C-black;
    position: relative;
    &__404 {
      @include absCenter;
      position: absolute;
      font-size: 35rem;
      color: rgba($C-secondary, .2);
      font-family: $F-Lato;
    }
    &__link {
      @include absCenter;
      position: absolute;
      text-decoration: none;
      font-family: $F-Lato;
      font-size: 5rem;
      color: $C-white;
    }
  }
</style>

