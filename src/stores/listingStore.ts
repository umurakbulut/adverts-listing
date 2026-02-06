import { defineStore } from 'pinia'
import type { IListingItem, IListingFilter } from '@/types'
import { listingService } from '@/services/listingService'
import { ref } from 'vue'

export const useListingStore = defineStore('listing', () => {
  const items = ref<IListingItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getListingItems = async (filters: IListingFilter) => {
    loading.value = true
    error.value = null
    try {
      const response = await listingService.getListingItems(filters)
      items.value = response || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'İlanlar yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  return {
    items,
    loading,
    error,
    getListingItems,
  }
})
