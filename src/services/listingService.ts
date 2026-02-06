import type { IListingItem, IListingFilter } from '@/types'
import { fetchApi, buildQueryString } from '.'

export const listingService = {
  async getListingItems(filters: IListingFilter): Promise<IListingItem[]> {
    const queryString = buildQueryString(filters)
    return fetchApi<IListingItem[]>(`/listing?${queryString}`)
  },
}
