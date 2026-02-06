import type { LocationQueryRaw, LocationQuery } from 'vue-router'
import type { IListingFilter } from '@/types'
import { SortType, SortDirection } from '@/types'

export const DEFAULT_FILTERS: IListingFilter = {
  take: 20,
  skip: 0,
  sort: SortType.Date,
  sortDirection: SortDirection.Descending,
}

export function parseFiltersFromQuery(query: LocationQuery): IListingFilter {
  return {
    take: query.take ? Number(query.take) : DEFAULT_FILTERS.take,
    skip: query.skip ? Number(query.skip) : DEFAULT_FILTERS.skip,
    sort: query.sort !== undefined ? Number(query.sort) : DEFAULT_FILTERS.sort,
    sortDirection:
      query.sortDirection !== undefined
        ? Number(query.sortDirection)
        : DEFAULT_FILTERS.sortDirection,
    minDate: (query.minDate as string) || undefined,
    maxDate: (query.maxDate as string) || undefined,
    minYear: query.minYear ? Number(query.minYear) : undefined,
    maxYear: query.maxYear ? Number(query.maxYear) : undefined,
  }
}

export function buildQueryFromFilters(filters: IListingFilter): LocationQueryRaw {
  const query: Record<string, string> = {}

  if (filters.take !== DEFAULT_FILTERS.take) query.take = String(filters.take)
  if (filters.sort !== DEFAULT_FILTERS.sort) query.sort = String(filters.sort)
  if (filters.sortDirection !== DEFAULT_FILTERS.sortDirection)
    query.sortDirection = String(filters.sortDirection)
  if (filters.minDate) query.minDate = filters.minDate
  if (filters.maxDate) query.maxDate = filters.maxDate
  if (filters.minYear) query.minYear = String(filters.minYear)
  if (filters.maxYear) query.maxYear = String(filters.maxYear)

  return query
}

export function getActiveFilterCount(filters: IListingFilter): number {
  let count = 0
  if (filters.minDate) count++
  if (filters.maxDate) count++
  if (filters.minYear) count++
  if (filters.maxYear) count++
  return count
}
