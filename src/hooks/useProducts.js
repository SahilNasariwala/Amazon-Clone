import { useCallback, useEffect, useState } from 'react'
import { getProducts, getByCategory } from '../api/products.js'

// Fetches the product set for the active category scope.
// Empty category => all products. Refetches when category changes
// or when refetch() is called (e.g. error retry).
export function useProducts(category) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const fetcher = category ? getByCategory(category) : getProducts()
    fetcher
      .then((data) => {
        if (cancelled) return
        setProducts(data.products || [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || 'Failed to load products')
        setProducts([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [category, reloadKey])

  return { products, loading, error, refetch }
}
