import { Link, useLocation } from 'react-router-dom'
import StarRating from './StarRating.jsx'

export default function ProductCard({ product }) {
  const location = useLocation()
  // Preserve the current filters (query string) so Back returns to them.
  const to = {
    pathname: `/product/${product.id}`,
    state: { from: location.pathname + location.search },
  }

  return (
    <Link
      to={to}
      className="group flex flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-32 items-center justify-center p-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition group-hover:scale-105"
        />
      </div>
      <h3 className="mt-2 line-clamp-1 text-sm font-semibold text-gray-800">
        {product.title}
      </h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-base font-bold text-price">${product.price}</span>
        <StarRating rating={product.rating} />
      </div>
    </Link>
  )
}
