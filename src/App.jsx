import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ListingPage from './pages/ListingPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListingPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  )
}
