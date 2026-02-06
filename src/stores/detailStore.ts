import { defineStore } from 'pinia'
import type { IListingItem } from '@/types'
import { detailService } from '@/services/detailService'
import { ref } from 'vue'

export const useDetailStore = defineStore('detail', () => {
  const item = ref<IListingItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const getDetail = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await detailService.getListingItemDetail(id)
      item.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'İlan detayı yüklenirken bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  const clearDetail = () => {
    item.value = null
    error.value = null
  }

  return {
    item,
    loading,
    error,
    getDetail,
    clearDetail,
  }
})
