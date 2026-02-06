<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AlertCircle, Search, SlidersHorizontal, ChevronDown } from 'lucide-vue-next'
import { useListingStore } from '@/stores/listingStore'
import { parseFiltersFromQuery, buildQueryFromFilters } from '@/utils'
import type { IListingFilter } from '@/types'
import AppLoading from '@/components/common/AppLoading.vue'
import AppPagination from '@/components/common/AppPagination.vue'
import ListingCard from '@/components/listing/ListingCard.vue'
import FilterModal from '@/components/listing/FilterModal.vue'

const listingStore = useListingStore()
const route = useRoute()
const router = useRouter()
const isFilterOpen = ref(false)
const takeOptions = [20, 50]

const syncUrlWithFilters = () => {
  router.replace({ query: buildQueryFromFilters(listingStore.filters) })
}

const handleApplyFilters = (filters: IListingFilter) => {
  listingStore.applyFilters(filters)
  syncUrlWithFilters()
}

const handleTakeChange = (e: Event) => {
  listingStore.setTake(Number((e.target as HTMLSelectElement).value))
  syncUrlWithFilters()
}

const handlePageChange = (page: number) => {
  listingStore.setPage(page)
  syncUrlWithFilters()
}

watch(
  () => route.query,
  () => {
    listingStore.setFilters(parseFiltersFromQuery(route.query))
    listingStore.fetchItems()
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <div class="home">
    <header class="home__header">
      <h1 class="home__title">İkinci El Araç İlanları</h1>
      <p class="home__subtitle">En güncel araç ilanlarını keşfedin</p>
      <div class="home__actions">
        <button class="home__filter-btn" @click="isFilterOpen = true">
          <SlidersHorizontal :size="20" />
          <span>Filtrele</span>
          <span v-if="listingStore.activeFilterCount > 0" class="home__filter-badge">
            {{ listingStore.activeFilterCount }}
          </span>
        </button>

        <div class="home__take">
          <select :value="listingStore.filters.take" class="home__take-select" @change="handleTakeChange">
            <option v-for="opt in takeOptions" :key="opt" :value="opt">{{ opt }} ilan</option>
          </select>
          <ChevronDown class="home__take-icon" :size="16" />
        </div>
      </div>
    </header>

    <FilterModal
      :is-open="isFilterOpen"
      :current-filters="listingStore.filters"
      @close="isFilterOpen = false"
      @apply="handleApplyFilters"
    />

    <AppLoading v-if="listingStore.loading" />

    <div v-else-if="listingStore.error" class="home__error">
      <AlertCircle class="home__error-icon" :size="64" />
      <p>{{ listingStore.error }}</p>
    </div>

    <div v-else-if="listingStore.items.length === 0" class="home__empty">
      <Search class="home__empty-icon" :size="64" />
      <p>Henüz ilan bulunamadı</p>
    </div>

    <template v-else>
      <div class="home__grid">
        <ListingCard v-for="item in listingStore.items" :key="item.id" :item="item" />
      </div>

      <AppPagination
        :current-page="listingStore.currentPage"
        :item-count="listingStore.items.length"
        :page-size="listingStore.filters.take"
        @page-change="handlePageChange"
      />
    </template>
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
    margin: 0 0 $spacing-4;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-lg;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: $spacing-3;
  }

  &__filter-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: $spacing-2;
    padding: $spacing-3 $spacing-5;
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-primary;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: $color-brand-primary;
      color: $color-brand-primary;
    }
  }

  &__filter-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 20px;
    height: 20px;
    padding: 0 $spacing-1;
    background: $color-brand-primary;
    color: $color-white;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__take {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  &__take-select {
    appearance: none;
    padding: $spacing-3 $spacing-8 $spacing-3 $spacing-4;
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-primary;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: $color-brand-primary;
    }

    &:focus {
      outline: none;
      border-color: $color-brand-primary;
    }
  }

  &__take-icon {
    position: absolute;
    right: $spacing-3;
    pointer-events: none;
    color: $color-gray-300;
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
