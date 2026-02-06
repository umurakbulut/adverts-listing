<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next'
import { getListingItemImageUrl, ImageResolution } from '@/utils'

const props = defineProps<{
  photos: string[]
}>()

const currentIndex = ref(0)
const isFullscreen = ref(false)

const currentPhoto = computed(() => props.photos[currentIndex.value] ?? '')
const hasMultiplePhotos = computed(() => props.photos.length > 1)

const goToPrevious = () => {
  currentIndex.value = currentIndex.value === 0 ? props.photos.length - 1 : currentIndex.value - 1
}

const goToNext = () => {
  currentIndex.value = currentIndex.value === props.photos.length - 1 ? 0 : currentIndex.value + 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const openFullscreen = () => {
  isFullscreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullscreen = () => {
  isFullscreen.value = false
  document.body.style.overflow = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isFullscreen.value) return
  if (e.key === 'Escape') closeFullscreen()
  if (e.key === 'ArrowLeft') goToPrevious()
  if (e.key === 'ArrowRight') goToNext()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="slider">
    <div class="slider__main" @click="openFullscreen">
      <img
        :src="getListingItemImageUrl(currentPhoto, ImageResolution.LARGE)"
        :alt="`Fotoğraf ${currentIndex + 1}`"
        class="slider__image"
      />

      <template v-if="hasMultiplePhotos">
        <button class="slider__nav slider__nav--prev" @click.stop="goToPrevious">
          <ChevronLeft :size="24" />
        </button>
        <button class="slider__nav slider__nav--next" @click.stop="goToNext">
          <ChevronRight :size="24" />
        </button>
      </template>

      <div class="slider__counter">{{ currentIndex + 1 }} / {{ photos.length }}</div>
    </div>

    <div v-if="hasMultiplePhotos" class="slider__thumbnails">
      <button
        v-for="(photo, index) in photos"
        :key="index"
        class="slider__thumbnail"
        :class="{ 'slider__thumbnail--active': index === currentIndex }"
        @click="goToSlide(index)"
      >
        <img
          :src="getListingItemImageUrl(photo, ImageResolution.THUMBNAIL)"
          :alt="`Küçük resim ${index + 1}`"
        />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="fullscreen">
        <div v-if="isFullscreen" class="fullscreen" @click.self="closeFullscreen">
          <button class="fullscreen__close" @click="closeFullscreen">
            <X :size="32" />
          </button>

          <img
            :src="getListingItemImageUrl(currentPhoto, ImageResolution.XL)"
            :alt="`Fotoğraf ${currentIndex + 1}`"
            class="fullscreen__image"
          />

          <template v-if="hasMultiplePhotos">
            <button class="fullscreen__nav fullscreen__nav--prev" @click="goToPrevious">
              <ChevronLeft :size="32" />
            </button>
            <button class="fullscreen__nav fullscreen__nav--next" @click="goToNext">
              <ChevronRight :size="32" />
            </button>
          </template>

          <div class="fullscreen__counter">{{ currentIndex + 1 }} / {{ photos.length }}</div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.slider {
  &__main {
    position: relative;
    aspect-ratio: 16 / 9;
    background: $color-primary;
    border-radius: $border-radius-lg;
    overflow: hidden;
    cursor: pointer;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background: rgba($color-white, 0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
      background: $color-white;
    }

    &--prev {
      left: $spacing-4;
    }

    &--next {
      right: $spacing-4;
    }
  }

  &__counter {
    position: absolute;
    bottom: $spacing-4;
    right: $spacing-4;
    background: rgba(0, 0, 0, 0.6);
    color: $color-white;
    padding: $spacing-1 $spacing-3;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
  }

  &__thumbnails {
    display: flex;
    gap: $spacing-2;
    margin-top: $spacing-3;
    overflow-x: auto;
    padding-bottom: $spacing-2;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-gray-300;
      border-radius: 2px;
    }
  }

  &__thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 60px;
    padding: 0;
    border: 2px solid transparent;
    border-radius: $border-radius-sm;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s;

    &--active {
      border-color: $color-brand-primary;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.fullscreen {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;

  &__close {
    position: absolute;
    top: $spacing-4;
    right: $spacing-4;
    background: none;
    border: none;
    color: $color-white;
    cursor: pointer;
    padding: $spacing-2;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba($color-white, 0.1);
    border: none;
    color: $color-white;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: rgba($color-white, 0.2);
    }

    &--prev {
      left: $spacing-4;
    }

    &--next {
      right: $spacing-4;
    }
  }

  &__counter {
    position: absolute;
    bottom: $spacing-6;
    left: 50%;
    transform: translateX(-50%);
    color: $color-white;
    font-size: $font-size-base;
  }
}

.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: opacity 0.3s ease;
}

.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}
</style>
