import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getProductById } from '../api/products.js'
import StarRating from '../components/StarRating.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getProductById(id)
      .then((data) => !cancelled && setProduct(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  const goBack = () => {
    const from = location.state?.from
    if (from) navigate(from)
    else navigate(-1)
  }

  const BackButton = () => (
    <button
      onClick={goBack}
      className="mb-4 inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
    >
      ← Back
    </button>
  )

  if (loading) return <Loader label="Loading product…" />
  if (error)
    return (
      <div>
        <BackButton />
        <ErrorMessage message={error} />
      </div>
    )
  if (!product) return null

  return (
    <div>
      <BackButton />
      <div className="grid gap-8 rounded-lg border border-gray-200 bg-white p-6 md:grid-cols-2">
        <div>
          <div className="flex h-80 items-center justify-center rounded-lg bg-navy p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.slice(0, 5).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="h-16 w-16 shrink-0 rounded border border-gray-200 object-contain p-1"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-bold text-price">${product.price}</span>
            <StarRating rating={product.rating} className="text-sm" />
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <p>
              <span className="font-semibold text-gray-800">Brand: </span>
              <span className="text-gray-600">{product.brand || '—'}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800">Category: </span>
              <span className="text-gray-600 capitalize">{product.category}</span>
            </p>
          </div>

          <h2 className="mt-5 text-base font-semibold text-gray-800">
            Description
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>

          {product.reviews?.length > 0 && (
            <>
              <h2 className="mt-6 text-base font-semibold text-gray-800">
                Reviews
              </h2>
              <ul className="mt-2 space-y-3">
                {product.reviews.slice(0, 4).map((r, i) => (
                  <li key={i}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {r.reviewerName}
                      </span>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-sm text-gray-600">{r.comment}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
