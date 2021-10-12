<template>
  <div class="about">
    <div class="about__title">About me</div>
    <div class="about__text">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Beatae distinctio facere ipsa iusto. Adipisci, architecto assumenda at beatae ea eaque eum itaque,
      libero nam non pariatur quisquam quod totam ullam!
    </div>
    <div class="about__bottom">
      <div class="about__social">
        <div class="about__social--title">Social</div>
        <div class="about__social--item">linkedin</div>
        <div class="about__social--item">facebook</div>
        <div class="about__social--item">twitter</div>
        <div class="about__social--item">soundcloud</div>
      </div>
      <div class="about__social">
        <div class="about__social--title">Mail</div>
        <div class="about__social--item">nicolas24.j@gmail.com</div>
      </div>
      <div class="about__social">
        <div class="about__social--title">Autre</div>
        <div class="about__social--item">CV</div>
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
        color: $C-white;
        margin-bottom: .5rem;
      }
    }
  }
</style>
