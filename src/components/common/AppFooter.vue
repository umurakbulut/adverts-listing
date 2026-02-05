<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__copyright">© {{ currentYear }} Adverts Listing. Tüm hakları saklıdır.</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  &__container {
    @include container;
    @include flex-center;
    height: 64px;
    border-top: 1px solid $color-border;
  }

  &__copyright {
    font-size: $font-size-xs;
    color: $color-gray-300;
  }
}
</style>
