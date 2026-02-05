<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>
<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <img
          src="@/assets/images/logo.webp"
          alt="Adverts Listing"
          class="header__logo-image"
          @click="navigateTo('/')"
        />
      </div>
      <nav class="header__nav">
        <RouterLink to="/" class="header__nav-link"> Tüm İlanlar </RouterLink>
      </nav>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-header;
  background-color: $color-white;
  border-bottom: 1px solid $color-border;

  &__container {
    @include container;
    @include flex-between;
    height: 64px;
  }

  &__logo {
    height: 32px;

    &-image {
      height: 100%;
    }
  }

  &__nav {
    &-link {
      font-size: $font-size-sm;
      color: $color-primary;
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: $color-brand-primary;
      }
    }
  }
}
</style>
