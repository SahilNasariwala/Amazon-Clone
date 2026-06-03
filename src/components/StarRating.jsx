export default function StarRating({ rating, className = 'text-xs' }) {
  const value = Number(rating) || 0
  const filled = Math.round(value)
  return (
    <span className={`inline-flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= filled ? 'text-amber-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="ml-1 text-gray-500">({value.toFixed(1)})</span>
    </span>
  )
}
