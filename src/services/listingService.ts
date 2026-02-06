import type { IListingItem, IListingFilter } from '@/types'
import { fetchApi, buildSearchParams } from '.'

export const listingService = {
  async getListingItems(filters: IListingFilter): Promise<IListingItem[]> {
    const queryString = buildSearchParams(filters)
    return fetchApi<IListingItem[]>(`/listing?${queryString}`)
  },
}
