import { useEffect, useState } from 'react'
import { getCategories } from '../api/products.js'

// DummyJSON returns category objects { slug, name, url }.
// Older shapes returned plain strings; normalize to be safe.
function normalizeCategory(c) {
  if (typeof c === 'string') return { slug: c, name: c }
  return { slug: c.slug, name: c.name || c.slug }
}

export default function FilterPanel({ filters, brands, onChange, onClear }) {
  const [categories, setCategories] = useState([])
  const [catError, setCatError] = useState(null)
  const [catSearch, setCatSearch] = useState('')

  // Local draft for the price range — committed via the Apply button.
  const [minPrice, setMinPrice] = useState(filters.minPrice)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice)

  useEffect(() => setMinPrice(filters.minPrice), [filters.minPrice])
  useEffect(() => setMaxPrice(filters.maxPrice), [filters.maxPrice])

  useEffect(() => {
    let cancelled = false
    getCategories()
      .then((data) => {
        if (!cancelled) setCategories((data || []).map(normalizeCategory))
      })
      .catch((err) => {
        if (!cancelled) setCatError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Single-select category (checkbox UI). Clicking the active one clears it.
  const selectCategory = (slug) =>
    onChange({ category: filters.category === slug ? '' : slug })

  const toggleBrand = (brand) => {
    const set = new Set(filters.brands)
    set.has(brand) ? set.delete(brand) : set.add(brand)
    onChange({ brands: [...set] })
  }

  const visibleCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(catSearch.toLowerCase()),
  )

  return (
    <aside className="w-full shrink-0 rounded-lg border border-gray-200 bg-white p-4 lg:w-60">
      {/* Sidebar search — filters the category list */}
      <div className="mb-4 flex items-center rounded-md border border-gray-300 px-2 py-1.5">
        <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={catSearch}
          onChange={(e) => setCatSearch(e.target.value)}
          placeholder="Search..."
          className="ml-2 w-full text-sm outline-none"
        />
      </div>

      {/* Categories */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">Categories</h3>
        {catError ? (
          <p className="text-xs text-red-600">Failed to load categories</p>
        ) : (
          <div className="max-h-44 space-y-1.5 overflow-y-auto pr-1">
            {visibleCategories.map((c) => (
              <label
                key={c.slug}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={filters.category === c.slug}
                  onChange={() => selectCategory(c.slug)}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                {c.name}
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Price Range */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-gray-800">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm"
          />
        </div>
        <button
          onClick={() => onChange({ minPrice, maxPrice })}
          className="mt-2 w-full rounded-md bg-accent py-1.5 text-sm font-medium text-white hover:bg-blue-600"
        >
          Apply
        </button>
      </section>

      {/* Brands */}
      <section>
        <h3 className="mb-2 text-sm font-semibold text-gray-800">Brands</h3>
        {brands.length === 0 ? (
          <p className="text-xs text-gray-400">No brands available</p>
        ) : (
          <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                {brand}
              </label>
            ))}
          </div>
        )}
      </section>

      <button
        onClick={onClear}
        className="mt-5 w-full rounded-md border border-gray-300 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
      >
        Clear all filters
      </button>
    </aside>
  )
}
