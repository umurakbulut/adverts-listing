<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  @include container;
  padding-top: $spacing-4;
  padding-bottom: $spacing-4;
}
</style>
