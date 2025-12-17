'use client'

import React, { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import { Package, Filter, ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react'
import type { CurrencySettings } from '@/lib/currency'

interface Brand {
  id: string
  name: string
  slug: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductsClientProps {
  products: any[]
  categories: Category[]
  brands: Brand[]
  initialCategory?: string | null
  currencySettings?: CurrencySettings
}

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc'

export default function ProductsClient({
  products,
  categories,
  brands,
  initialCategory = null,
  currencySettings
}: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
  })

  // Calculate price range from products
  const priceStats = useMemo(() => {
    const prices = products.filter(p => p.price > 0).map(p => p.price)
    return {
      min: Math.floor(Math.min(...prices, 0)),
      max: Math.ceil(Math.max(...prices, 1000)),
    }
  }, [products])

  // Get brands that have products
  const brandsWithProducts = useMemo(() => {
    const brandCounts = new Map<string, number>()
    products.forEach(p => {
      if (p.brand?.id) {
        brandCounts.set(p.brand.id, (brandCounts.get(p.brand.id) || 0) + 1)
      }
    })
    return brands.filter(b => brandCounts.has(b.id)).map(b => ({
      ...b,
      count: brandCounts.get(b.id) || 0,
    }))
  }, [products, brands])

  // Get categories with product counts
  const categoriesWithCounts = useMemo(() => {
    const categoryCounts = new Map<string, number>()
    products.forEach(p => {
      const catId = typeof p.category === 'object' ? String(p.category?.id) : String(p.category)
      categoryCounts.set(catId, (categoryCounts.get(catId) || 0) + 1)
    })
    return categories.map(c => ({
      ...c,
      id: String(c.id),
      count: categoryCounts.get(String(c.id)) || 0,
    }))
  }, [products, categories])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => {
        const catId = typeof p.category === 'object' ? String(p.category?.id) : String(p.category)
        return catId === selectedCategory
      })
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => p.brand && selectedBrands.includes(p.brand.id))
    }

    // Filter by price range
    result = result.filter(p => {
      if (p.price === 0) return true // Always show "get quote" products
      return p.price >= priceRange[0] && p.price <= priceRange[1]
    })

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name, 'bg'))
        break
      case 'newest':
      default:
        // Keep original order (newest first)
        break
    }

    return result
  }, [products, selectedCategory, selectedBrands, priceRange, sortBy])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategory(null)
    setSelectedBrands([])
    setPriceRange([priceStats.min, priceStats.max])
    setSortBy('newest')
  }

  const hasActiveFilters = selectedCategory || selectedBrands.length > 0 ||
    priceRange[0] > priceStats.min || priceRange[1] < priceStats.max

  return (
    <section className="products-page-section">
      <div className="container">
        <div className="products-layout">
          {/* Mobile Filter Toggle */}
          <button
            className="mobile-filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            <span>Филтри</span>
            {hasActiveFilters && <span className="filter-badge" />}
          </button>

          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3><Filter size={18} /> Филтри</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>

            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                <X size={16} />
                Изчисти филтрите
              </button>
            )}

            {/* Category Filter */}
            <div className="filter-group">
              <button
                className="filter-group-header"
                onClick={() => toggleSection('category')}
              >
                <span>Категория</span>
                {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedSections.category && (
                <div className="filter-options">
                  <label className={`filter-option ${selectedCategory === null ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                    />
                    <span className="option-label">Всички</span>
                    <span className="option-count">{products.length}</span>
                  </label>
                  {categoriesWithCounts.filter(cat => cat.count > 0).map(cat => (
                    <label
                      key={cat.id}
                      className={`filter-option ${selectedCategory === cat.id ? 'active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                      />
                      <span className="option-label">{cat.name}</span>
                      <span className="option-count">{cat.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <button
                className="filter-group-header"
                onClick={() => toggleSection('brand')}
              >
                <span>Марка</span>
                {expandedSections.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedSections.brand && (
                <div className="filter-options">
                  {brandsWithProducts.map(brand => (
                    <label
                      key={brand.id}
                      className={`filter-option checkbox ${selectedBrands.includes(brand.id) ? 'active' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => toggleBrand(brand.id)}
                      />
                      <span className="checkmark" />
                      <span className="option-label">{brand.name}</span>
                      <span className="option-count">{brand.count}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <button
                className="filter-group-header"
                onClick={() => toggleSection('price')}
              >
                <span>Цена (EUR)</span>
                {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {expandedSections.price && (
                <div className="filter-options price-filter">
                  <div className="price-inputs">
                    <div className="price-input-group">
                      <label>От</label>
                      <input
                        type="number"
                        min={priceStats.min}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      />
                    </div>
                    <span className="price-separator">—</span>
                    <div className="price-input-group">
                      <label>До</label>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={priceStats.max}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={priceStats.min}
                    max={priceStats.max}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="price-slider"
                  />
                </div>
              )}
            </div>

            {/* Mobile Apply Button */}
            <button
              className="apply-filters-btn"
              onClick={() => setShowFilters(false)}
            >
              Покажи {filteredProducts.length} продукта
            </button>
          </aside>

          {/* Products Grid */}
          <div className="products-main">
            <div className="products-toolbar">
              <div className="results-info">
                <span className="results-count">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'продукт' : 'продукта'}
                </span>
                {selectedCategory && (
                  <span className="current-category">
                    в {categoriesWithCounts.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
              </div>
              <div className="sort-select">
                <label>Сортирай:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
                  <option value="newest">Най-нови</option>
                  <option value="price-asc">Цена: ниска → висока</option>
                  <option value="price-desc">Цена: висока → ниска</option>
                  <option value="name-asc">Име: А → Я</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} currencySettings={currencySettings} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Package size={48} />
                <p>Няма продукти, отговарящи на избраните филтри.</p>
                <button onClick={clearAllFilters} className="btn-reset-filter">
                  Изчисти филтрите
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}