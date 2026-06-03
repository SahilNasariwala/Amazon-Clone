import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useFilters } from '../hooks/useFilters.js'
import { useProducts } from '../hooks/useProducts.js'
import FilterPanel from '../components/FilterPanel.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

const PAGE_SIZE = 8

export default function ListingPage() {
  const { sidebarOpen } = useOutletContext()
  const { filters, updateFilters, clearFilters } = useFilters()
  const { products, loading, error, refetch } = useProducts(filters.category)

  const brands = useMemo(() => {
    const set = new Set()
    for (const p of products) if (p.brand) set.add(p.brand)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [products])

  const filtered = useMemo(() => {
    const min = filters.minPrice !== '' ? Number(filters.minPrice) : -Infinity
    const max = filters.maxPrice !== '' ? Number(filters.maxPrice) : Infinity
    const brandSet = new Set(filters.brands)
    const query = filters.search.trim().toLowerCase()
    return products.filter((p) => {
      if (p.price < min || p.price > max) return false
      if (brandSet.size && !brandSet.has(p.brand)) return false
      if (query && !p.title.toLowerCase().includes(query)) return false
      return true
    })
  }, [products, filters.minPrice, filters.maxPrice, filters.brands, filters.search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(filters.page, totalPages)
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {sidebarOpen && (
        <FilterPanel
          filters={filters}
          brands={brands}
          onChange={updateFilters}
          onClear={clearFilters}
        />
      )}

      <section className="flex-1">
        <div className="mb-4 flex items-center gap-2">
          <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          <h1 className="text-lg font-semibold text-gray-800">Filters</h1>
        </div>

        {loading ? (
          <Loader label="Loading products…" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <>
            <div className="mb-3 text-sm text-gray-600">
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}{' '}
              products
            </div>
            <ProductGrid products={pageItems} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(p) => updateFilters({ page: p })}
            />
          </>
        )}
      </section>
    </div>
  )
}
