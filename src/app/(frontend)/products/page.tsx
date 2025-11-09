import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import ProductsClient from './ProductsClient'
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
    category: product.category,
    image: {
      url: typeof product.image === 'object' ? product.image.url : '',
      alt: typeof product.image === 'object' ? product.image.alt : product.name,
    },
    inStock: product.inStock,
  }))

  // Transform categories data
  const categories = categoriesData.docs.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  }))

  console.log('Categories:', categories) // Debug log

  return (
    <>
      <Navigation companyName={siteSettings.companyName} categories={categories} />

      <div className="page-header">
        <div className="container">
          <Breadcrumb items={[{ label: 'Продукти' }]} />
          <h1>Нашите продукти</h1>
          <p className="page-subtitle">
            Професионално оборудване и софтуер за вашия бизнес
          </p>
        </div>
      </div>

      <ProductsClient products={products} categories={categories} />

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
