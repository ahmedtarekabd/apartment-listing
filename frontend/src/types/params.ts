export type Params = Promise<{ [key: string]: string }>

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export type ParamsType = {
  params: Params
  searchParams: SearchParams
}
