<template>
  <div class="about">
    <div class="about__title" ref="title">About me</div>
    <div class="about__text" ref="text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Beatae distinctio facere ipsa iusto. Adipisci, architecto assumenda at beatae ea eaque eum itaque,
      libero nam non pariatur quisquam quod totam ullam!
    </div>
    <div class="about__bottom" ref="bottom" v-for="i in 1">
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Social</div>
        <div class="about__social--item">
          <div ref="socials">linkedin</div>
        </div>
        <div class="about__social--item">
          <div ref="socials">facebook</div>
        </div>
        <div class="about__social--item">
          <div ref="socials">twitter</div>
        </div>
        <div class="about__social--item">
          <div ref="socials">soundcloud</div>
        </div>
      </div>
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Mail</div>
        <div class="about__social--item">
          <div ref="socials">nicolas24.j@gmail.com</div>
        </div>
      </div>
      <div class="about__social">
        <div class="about__social--title" ref="titleSocial">Autre</div>
        <div class="about__social--item">
          <div ref="socials">CV</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped lang="scss">
  .about {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__title {
      color: $C-primary;
      font-size: 3rem;
      font-family: $F-Lato;
      margin-bottom: 2rem;
    }
    &__text {
      @include main-title;
      color: $C-white;
      letter-spacing: .4rem;
      font-size: 5rem;
      margin-bottom: 3rem;
    }
    &__bottom {
      display: flex;
    }
    &__social {
      margin-right: 7rem;
      font-size: 1.8rem;
      &--title {
        color: $C-secondary;
        margin-bottom: 1rem;
      }
      &--item {
        margin-bottom: .5rem;
        overflow: hidden;
        div {
          text-decoration: none;
          color: $C-white;
        }
      }
    }
  }
</style>
