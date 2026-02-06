<script setup lang="ts">
import { useListingStore } from '@/stores/listingStore'
import { SortType, SortDirection } from '@/types'
import { onMounted } from 'vue'
import AppLoading from '@/components/common/AppLoading.vue'
import ListingCard from '@/components/listing/ListingCard.vue'
import { AlertCircle, Search } from 'lucide-vue-next'

const listingStore = useListingStore()

onMounted(() => {
  listingStore.getListingItems({
    take: 10,
    skip: 0,
    sort: SortType.Date,
    sortDirection: SortDirection.Descending,
  })
})
</script>

<template>
  <div class="home">
    <header class="home__header">
      <h1 class="home__title">İkinci El Araç İlanları</h1>
      <p class="home__subtitle">En güncel araç ilanlarını keşfedin</p>
    </header>

    <AppLoading v-if="listingStore.loading" />

    <div v-else-if="listingStore.error" class="home__error">
      <AlertCircle class="home__error-icon" :size="64" />
      <p>{{ listingStore.error }}</p>
    </div>

    <div v-else-if="listingStore.items.length === 0" class="home__empty">
      <Search class="home__empty-icon" :size="64" />
      <p>Henüz ilan bulunamadı</p>
    </div>

    <div v-else class="home__grid">
      <ListingCard v-for="item in listingStore.items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: $spacing-6 $spacing-4;
  max-width: 1400px;
  margin: 0 auto;

  &__header {
    text-align: center;
    margin-bottom: $spacing-8;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin: 0 0 $spacing-2;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-4xl;
    }
  }

  &__subtitle {
    font-size: $font-size-base;
    color: $color-gray-300;
    margin: 0;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-lg;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-4;

    @media (min-width: $breakpoint-sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-6;
    }

    @media (min-width: $breakpoint-xl) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__error,
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-12 $spacing-4;
    text-align: center;
    color: $color-gray-300;
  }

  &__error-icon,
  &__empty-icon {
    margin-bottom: $spacing-4;
    opacity: 0.5;
  }

  &__error {
    color: $color-brand-primary;
  }
}
</style>
