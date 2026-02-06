import type { IListingItem } from '@/types'
import { fetchApi } from '.'

export const detailService = {
  async getListingItemDetail(id: string): Promise<IListingItem> {
    return fetchApi<IListingItem>(`/detail?id=${id}`)
  },
}
