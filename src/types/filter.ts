export interface IListingFilter {
  take: number
  skip: number
  sort: SortType
  sortDirection: SortDirection
  minDate?: string
  maxDate?: string
  minYear?: number
  maxYear?: number
}

export enum SortType {
  Price = 0,
  Date = 1,
  Year = 2,
}

export enum SortDirection {
  Ascending = 0,
  Descending = 1,
}
