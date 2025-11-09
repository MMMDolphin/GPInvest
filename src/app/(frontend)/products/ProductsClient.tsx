'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Package, Filter } from 'lucide-react'

interface ProductsClientProps {
  products: any[]
  categories: any[]
  initialCategory?: string | null
}

export default function ProductsClient({ products, categories, initialCategory = null }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const router = useRouter()

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)

    if (categoryId === null) {
      // Navigate to all products
      router.push('/products')
    } else {
      // Find category slug and navigate
      const category = categories.find(c => c.id === categoryId)
      if (category?.slug) {
        router.push(`/products/category/${category.slug}`)
      }
    }
  }

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => {
        const productCategory = typeof product.category === 'object'
          ? String(product.category?.id)
          : String(product.category)
        return productCategory === selectedCategory
      })
    : products

  return (
    <section className="products-page-section">
      <div className="container">
        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="categories-filter-section">
            <div className="filter-header">
              <Filter size={20} />
              <h2>Филтрирай по категория</h2>
            </div>
            <div className="categories-filter-grid">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`category-filter-btn ${selectedCategory === null ? 'active' : ''}`}
              >
                <Package size={20} />
                <span>Всички продукти</span>
                <span className="count">{products.length}</span>
              </button>
              {categories.map((category: any) => {
                const categoryProductCount = products.filter((p) => {
                  const productCategory = typeof p.category === 'object'
                    ? String(p.category?.id)
                    : String(p.category)
                  return productCategory === category.id
                }).length

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    <Package size={20} />
                    <span>{category.name}</span>
                    <span className="count">{categoryProductCount}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="products-section">
          <div className="products-header">
            <h2>
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'Продукти'
                : 'Всички продукти'}
            </h2>
            <span className="products-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'продукт' : 'продукта'}
            </span>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Package size={48} />
              <p>Няма продукти в тази категория.</p>
              <button
                onClick={() => handleCategoryChange(null)}
                className="btn-reset-filter"
              >
                Виж всички продукти
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
