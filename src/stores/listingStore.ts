import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IListingItem, IListingFilter } from '@/types'
import { listingService } from '@/services/listingService'
import { DEFAULT_FILTERS, getActiveFilterCount, getCurrentPage } from '@/utils'

export const useListingStore = defineStore('listing', () => {
  const items = ref<IListingItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<IListingFilter>({ ...DEFAULT_FILTERS })

  const activeFilterCount = computed(() => getActiveFilterCount(filters.value))
  const currentPage = computed(() => getCurrentPage(filters.value))

  const fetchItems = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await listingService.getListingItems(filters.value)
      items.value = response || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'İlanlar yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: IListingFilter) => {
    filters.value = { ...newFilters }
  }

  const applyFilters = (newFilters: Partial<IListingFilter>) => {
    filters.value = { ...filters.value, ...newFilters, skip: 0 }
  }

  const setPage = (page: number) => {
    filters.value.skip = (page - 1) * filters.value.take
  }

  const setTake = (take: number) => {
    const newSkip = (currentPage.value - 1) * take
    filters.value = { ...filters.value, take, skip: newSkip }
  }

  const resetFilters = () => {
    filters.value = { ...DEFAULT_FILTERS }
  }

  return {
    items,
    loading,
    error,
    filters,
    activeFilterCount,
    currentPage,
    fetchItems,
    setFilters,
    applyFilters,
    setPage,
    setTake,
    resetFilters,
  }
})
