<script setup lang="ts"></script>
<template>
  <div class="loading">
    <div class="loading__spinner"></div>
  </div>
</template>
<style scoped lang="scss">
.loading {
  @include flex-center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: $z-index-loading;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &__spinner {
    width: 40px;
    height: 40px;
    border: 4px solid $color-primary;
    border-top-color: transparent;
    border-radius: 50%;
    animation: loading 1s linear infinite;
  }
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
