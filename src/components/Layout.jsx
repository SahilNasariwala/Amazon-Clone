import { useState } from 'react'
import { Outlet, useSearchParams, useNavigate, useLocation } from 'react-router-dom'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const search = searchParams.get('search') || ''

  const onSearch = (value) => {
    const next = new URLSearchParams(searchParams)
    value ? next.set('search', value) : next.delete('search')
    next.delete('page')
    if (location.pathname !== '/') {
      navigate({ pathname: '/', search: next.toString() })
    } else {
      setSearchParams(next)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="sticky top-0 z-20 bg-navy text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <button
            aria-label="Toggle filters"
            onClick={() => setSidebarOpen((o) => !o)}
            className="rounded p-2 hover:bg-white/10"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
            <span className="mt-1 block h-0.5 w-5 bg-white" />
          </button>

          <div className="mx-auto flex w-full max-w-xl items-center">
            <div className="flex w-full items-center rounded-md bg-white px-3 py-2 text-gray-700">
              <svg
                className="h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search products..."
                className="ml-2 w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button aria-label="Cart" className="rounded p-2 hover:bg-white/10">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </button>
            <button aria-label="Account" className="rounded p-2 hover:bg-white/10">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet context={{ sidebarOpen }} />
      </main>
    </div>
  )
}
