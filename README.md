# 🛒 Amazon Clone — Product Listing & Detail

An Amazon-style e-commerce product listing application built with **React +
Vite + Tailwind CSS**, using the public [DummyJSON Products API](https://dummyjson.com/docs/products).

Built for the Leegality Frontend Engineer assessment.

## ✨ Features

- **Product Listing Page** — filters on the left, responsive product grid on the
  right, pagination at the bottom.
- **Product Detail Page** — image gallery, title, price, rating, description,
  brand, and category, with a Back button that preserves your filters.
- **Combined filtering** — Category + Price range + Brand + title search all work
  together and update the list immediately.
- **Product search** in the header (filters by title); a separate sidebar search
  filters the category list.
- **Reviews** displayed on the product detail page.
- **Filters live in the URL** — shareable, survive a page refresh, and persist
  automatically when you navigate to a product and back.
- **Pagination resets** to page 1 whenever a filter changes.
- **Loading, error, and empty states** are handled throughout.

## 🚀 Setup

Requires Node.js 18+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build + local preview
npm run build
npm run preview
```

## 🗂️ Project Structure

```
src/
  api/products.js          # fetch wrappers for the DummyJSON endpoints
  hooks/
    useProducts.js         # fetch product set + loading/error/refetch
    useFilters.js          # read/write filters <-> URL query params
  components/
    FilterPanel.jsx        # category, price range, brand multi-select
    ProductCard.jsx        # image, title, price, rating
    ProductGrid.jsx        # card layout + empty state
    Pagination.jsx         # page controls
    Loader.jsx             # spinner
    ErrorMessage.jsx       # error display + retry
  pages/
    ListingPage.jsx        # filters + grid + pagination
    ProductDetailPage.jsx  # single product + back button
  App.jsx                  # routes: "/" and "/product/:id"
  main.jsx                 # entry + Router
```

## 🔌 API Usage

| Purpose            | Endpoint                                   |
| ------------------ | ------------------------------------------ |
| All products       | `GET /products?limit=0`                    |
| Categories         | `GET /products/categories`                 |
| Products by category | `GET /products/category/{slug}?limit=0`  |
| Single product     | `GET /products/{id}`                       |

## 🧠 Architectural Decisions

- **Filters stored in the URL query string** (`?category=&minPrice=&maxPrice=&brands=&page=`).
  This makes them the single source of truth — shareable, refresh-safe, and they
  persist across detail-page navigation **for free**, with no extra state layer.
- **Hybrid filtering strategy.** Category narrows the fetch via the API
  (`/products/category/{slug}`). DummyJSON has **no price or brand filter
  endpoints**, so those are applied client-side.
- **Client-side pagination over the filtered result.** Mixing server-side
  pagination (`limit`/`skip`) with client-side filtering produces inconsistent
  pages (a "12-item" page could show 3 items after filtering). Since the catalog
  is small (~194 products, fewer per category), we fetch the full category set
  (`limit=0`) and paginate the *filtered* list — so page counts and the
  "Showing X–Y of Z" indicator are always correct.
- **Brands are derived dynamically** from the fetched product set, so the brand
  options always reflect the currently selected category.
- **Reusable, single-purpose components** with small, well-defined props.

## 📝 Assumptions

- DummyJSON exposes no price/brand filter endpoints → those filters are
  client-side (per the spec, which allows client-side filtering where required).
- The catalog is small enough (~194 total) to fetch a category's full set at once.
- `/products/categories` returns objects (`{ slug, name, url }`); the code also
  tolerates the older string-array shape.
- Some products may lack a `brand` field — these are handled gracefully (shown
  as `—` on the detail page and excluded from brand options).
- "All categories" is the default view.

## 🔮 Improvements If Given More Time

- Debounced price inputs and a text search box.
- Sorting (by price / rating).
- Skeleton loaders instead of a single spinner.
- Unit & integration tests (Vitest + React Testing Library).
- Caching fetched categories/products to avoid refetching.
- Persisted scroll position when returning from the detail page.

## ✅ Verification

Verified by running the app and rendering it headlessly:

- Listing renders all 194 products with titles, prices, and ratings.
- Category filter via URL (`?category=smartphones`) correctly narrows results.
- Pagination shows the right counts ("Showing 1–12 of N products").
- Detail page (`/product/:id`) renders all required fields with a working Back button.
