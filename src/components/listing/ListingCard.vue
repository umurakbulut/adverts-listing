<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { MapPin, Calendar } from 'lucide-vue-next'
import { getListingItemImageUrl } from '@/utils'
import type { IListingItem } from '@/types'
import { ImageResolution } from '@/utils/imageHelper'

defineProps<{
  item: IListingItem
}>()
</script>

<template>
  <RouterLink :to="{ name: 'Detail', params: { id: item.id } }" class="listing-card">
    <div class="listing-card__image-wrapper">
      <img
        :src="getListingItemImageUrl(item.photo, ImageResolution.LARGE)"
        :alt="item.title"
        class="listing-card__image"
        loading="lazy"
      />
    </div>

    <div class="listing-card__content">
      <div class="listing-card__header">
        <h3 class="listing-card__title">{{ item.title }}</h3>
        <span class="listing-card__model">{{ item.modelName }}</span>
      </div>

      <div class="listing-card__price">{{ item.priceFormatted }}</div>

      <div class="listing-card__details">
        <div class="listing-card__detail">
          <MapPin class="listing-card__icon" :size="16" />
          <span>{{ item.location.cityName }}, {{ item.location.townName }}</span>
        </div>

        <div class="listing-card__detail">
          <Calendar class="listing-card__icon" :size="16" />
          <span>{{ item.dateFormatted }}</span>
        </div>
      </div>

      <div class="listing-card__properties" v-if="item.properties?.length">
        <span v-for="(prop, index) in item.properties" :key="index" class="listing-card__property">
          {{ prop.value !== '' && prop.value !== null ? prop.value : '-' }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.listing-card {
  display: block;
  text-decoration: none;
  background: $color-white;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: $color-gray-100;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;

    .listing-card:hover & {
      transform: scale(1.05);
    }
  }

  &__content {
    padding: $spacing-4;
    display: flex;
    flex-direction: column;
    gap: $spacing-3;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $spacing-1;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    line-height: 1.4;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
  }

  &__model {
    font-size: $font-size-sm;
    color: $color-gray-300;
    font-weight: $font-weight-medium;
  }

  &__price {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-brand-primary;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: $spacing-2;
  }

  &__detail {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    font-size: $font-size-sm;
    color: $color-gray-300;
  }

  &__icon {
    flex-shrink: 0;
  }

  &__properties {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-2;
    padding-top: $spacing-3;
    border-top: 1px solid $color-border;
  }

  &__property {
    background: rgba($color-gray-200, 0.5);
    color: $color-primary;
    padding: $spacing-1 $spacing-2;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
  }
}
</style>
