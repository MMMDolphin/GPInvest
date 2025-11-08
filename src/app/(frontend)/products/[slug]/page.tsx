import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Image from 'next/image'
import './product-detail.css'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch product by slug
  const productsData = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  if (!productsData.docs || productsData.docs.length === 0) {
    notFound()
  }

  const product = productsData.docs[0]

  // Get category name
  const categoryName = typeof product.category === 'object' ? product.category.name : ''

  return (
    <>
      <Navigation companyName={siteSettings.companyName} />

      <div className="page-header">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Продукти', href: '/products' },
              { label: product.name },
            ]}
          />
          <h1>{product.name}</h1>
          {product.shortDescription && (
            <p className="page-subtitle">{product.shortDescription}</p>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="product-main-image">
                {typeof product.image === 'object' && product.image.url && (
                  <Image
                    src={product.image.url}
                    alt={product.image.alt || product.name}
                    width={600}
                    height={600}
                    className="main-image"
                  />
                )}
              </div>

              {product.gallery && product.gallery.length > 0 && (
                <div className="product-gallery">
                  {product.gallery.map((item: any, index: number) => (
                    <div key={index} className="gallery-item">
                      {typeof item.image === 'object' && item.image.url && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || `${product.name} ${index + 1}`}
                          width={150}
                          height={150}
                          className="gallery-image"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-category">{categoryName}</div>

              <div className="product-price-section">
                <div className="product-price">{product.price.toFixed(2)} лв</div>
                <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? '✓ В наличност' : '✕ Няма в наличност'}
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="product-features">
                  <h3>Характеристики</h3>
                  <ul className="features-list">
                    {product.features.map((item: any, index: number) => (
                      <li key={index}>{item.feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-actions">
                <a href="/contact" className="btn btn-primary">
                  Запитване за продукта
                </a>
              </div>
            </div>
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="product-description-section">
              <h2>Описание</h2>
              <div className="product-description">
                {/* Render rich text content */}
                {typeof product.description === 'object' &&
                  JSON.stringify(product.description)}
              </div>
            </div>
          )}

          {/* Technical Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="product-specifications">
              <h2>Технически спецификации</h2>
              <table className="specifications-table">
                <tbody>
                  {product.specifications.map((spec: any, index: number) => (
                    <tr key={index}>
                      <td className="spec-name">{spec.name}</td>
                      <td className="spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Footer
        companyName={siteSettings.companyName}
        email={siteSettings.email}
        phone={siteSettings.phone}
        address={siteSettings.address}
        facebook={siteSettings.facebook}
        instagram={siteSettings.instagram}
        linkedin={siteSettings.linkedin}
      />
    </>
  )
}
