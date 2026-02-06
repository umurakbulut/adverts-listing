import type { IListingFilter } from '@/types'

const API_BASE_URL = '/api/v1'

export async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, options)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export function buildQueryString(filters: IListingFilter): string {
  const params = new URLSearchParams()

  params.append('sort', String(filters.sort))
  params.append('sortDirection', String(filters.sortDirection))
  params.append('take', String(filters.take))
  params.append('skip', String(filters.skip))

  if (filters.minDate) params.append('minDate', filters.minDate)
  if (filters.maxDate) params.append('maxDate', filters.maxDate)
  if (filters.minYear) params.append('minYear', String(filters.minYear))
  if (filters.maxYear) params.append('maxYear', String(filters.maxYear))

  return params.toString()
}
