import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-20 text-center">
        <p className="text-lg font-semibold text-gray-700">No products found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
