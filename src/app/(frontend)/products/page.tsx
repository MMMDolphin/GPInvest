import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import './products.css'

export default async function ProductsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch all products
  const productsData = await payload.find({
    collection: 'products',
    limit: 100,
    sort: '-createdAt',
  })

  // Fetch categories
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  // Transform products data
  const products = productsData.docs.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    price: product.price,
    image: {
      url: typeof product.image === 'object' ? product.image.url : '',
      alt: typeof product.image === 'object' ? product.image.alt : product.name,
    },
    inStock: product.inStock,
  }))

  return (
    <>
      <Navigation companyName={siteSettings.companyName} />
      <Breadcrumb items={[{ label: 'Продукти' }]} />

      <div className="page-header">
        <div className="container">
          <h1>Нашите продукти</h1>
          <p className="page-subtitle">
            Професионално оборудване и софтуер за вашия бизнес
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Categories */}
          {categoriesData.docs.length > 0 && (
            <div className="categories-section">
              <h2>Категории</h2>
              <div className="categories-grid">
                {categoriesData.docs.map((category: any) => (
                  <div key={category.id} className="category-card">
                    <h3>{category.name}</h3>
                    {category.description && <p>{category.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="products-section">
            <h2>Всички продукти</h2>
            {products.length > 0 ? (
              <div className="products-grid">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>В момента няма налични продукти.</p>
                <a href="/admin" className="btn btn-primary">
                  Добавете продукти от админ панела
                </a>
              </div>
            )}
          </div>
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
