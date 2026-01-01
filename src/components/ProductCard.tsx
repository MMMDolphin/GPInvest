import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, type CurrencySettings, getDefaultCurrencySettings } from '@/lib/currency'
import './ProductCard.css'

interface Product {
  id: string
  name: string
  slug: string
  shortDescription?: string
  price: number
  image: {
    url: string
    alt: string
  }
  inStock: boolean
}

interface ProductCardProps {
  product: Product
  currencySettings?: CurrencySettings
}

export default function ProductCard({ product, currencySettings }: ProductCardProps) {
  const settings = currencySettings || getDefaultCurrencySettings()
  const { eur, bgn } = formatPrice(product.price, settings)

  return (
    <div className="product-card">
      <Link href={`/products/${product.slug}`} className="product-link">
        <div className="product-image-wrapper">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="product-badge out-of-stock">Изчерпан</div>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.shortDescription && (
            <p className="product-description">{product.shortDescription}</p>
          )}
          <div className="product-footer">
            <div className="product-price-container">
              <span className={`product-price ${product.price === 0 ? 'quote-only' : ''}`}>{eur}</span>
              {bgn && <span className="product-price-bgn">({bgn})</span>}
            </div>
            <span className="product-cta">Виж повече →</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
