import { useSearchParams } from 'react-router-dom'

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || '',
    brands: (searchParams.get('brands') || '')
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean),
    page: Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1),
  }

  function updateFilters(partial) {
    const next = new URLSearchParams(searchParams)

    const setOrDelete = (key, value) => {
      if (value === undefined || value === null || value === '') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    }

    if ('category' in partial) setOrDelete('category', partial.category)
    if ('minPrice' in partial) setOrDelete('minPrice', partial.minPrice)
    if ('maxPrice' in partial) setOrDelete('maxPrice', partial.maxPrice)
    if ('search' in partial) setOrDelete('search', partial.search)
    if ('brands' in partial) setOrDelete('brands', partial.brands.join(','))

    if ('page' in partial) {
      setOrDelete('page', String(partial.page))
    } else {
      next.delete('page')
    }

    setSearchParams(next)
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams())
  }

  return { filters, updateFilters, clearFilters }
}
