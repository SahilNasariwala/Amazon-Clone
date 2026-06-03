export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const go = (p) => onChange(Math.min(Math.max(1, p), totalPages))

  const pages = []
  const end = Math.min(totalPages, Math.max(page + 2, 4))
  for (let p = Math.max(1, end - 3); p <= end; p++) pages.push(p)

  return (
    <nav className="mt-6 flex items-center justify-center gap-2 text-sm">
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className="px-2 py-1 font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40"
      >
        ← Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`h-8 w-8 rounded-md border font-medium ${
            p === page
              ? 'border-accent bg-accent text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className="px-2 py-1 font-medium text-gray-600 hover:text-gray-900 disabled:opacity-40"
      >
        Next →
      </button>
    </nav>
  )
}
