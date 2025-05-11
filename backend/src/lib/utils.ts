export const strToList = (str: string): string[] => {
  if (!str) return []
  return str.split(',').map((item) => item.trim())
}

export const listToStr = (list: string[]): string => {
  if (!list || list.length === 0) return ''
  return list.join(', ')
}
