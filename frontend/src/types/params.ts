export type Params = Promise<{ [key: string]: string }>

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export type ParamsType = {
  params: Params
  searchParams: SearchParams
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: {
    page: number
    pageSize: number
    totalPages: number
    links: {
      self: string
      next: string | null
      prev: string | null
      first: string
      last: string
    }
  }
}
