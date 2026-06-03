const BASE_URL = 'https://dummyjson.com'

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`)
  }
  return res.json()
}

export function getProducts() {
  return request('/products?limit=0')
}

export function getCategories() {
  return request('/products/categories')
}

export function getByCategory(slug) {
  return request(`/products/category/${encodeURIComponent(slug)}?limit=0`)
}

export function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`)
}
