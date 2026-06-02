const BASE_URL = 'https://dummyjson.com'

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`)
  }
  return res.json()
}

// Fetch all products (limit=0 returns the full set on DummyJSON).
export function getProducts() {
  return request('/products?limit=0')
}

// Fetch the list of category objects: { slug, name, url }.
export function getCategories() {
  return request('/products/categories')
}

// Fetch the full product set for a single category.
export function getByCategory(slug) {
  return request(`/products/category/${encodeURIComponent(slug)}?limit=0`)
}

// Fetch a single product by id.
export function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`)
}
