import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import ProductsClient from '../../ProductsClient'
import '../../products.css'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { fetchSiteData } from '@/lib/getSiteData'

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const payload = await getPayloadClient()
  const { categories, currencySettings } = await fetchSiteData()

  // Find the current category by slug
  const currentCategory = categories.find(c => c.slug === categorySlug)

  if (!currentCategory) {
    notFound()
  }

  // Fetch all products
  const productsData = await payload.find({
    collection: 'products',
    limit: 100,
    sort: '-createdAt',
  })

  // Transform products data
  const allProducts = productsData.docs.map((product: any) => ({
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

  // Filter products by current category
  const products = allProducts.filter((product) => {
    const productCategory = typeof product.category === 'object'
      ? String(product.category?.id)
      : String(product.category)
    return productCategory === currentCategory.id
  })

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Продукти', href: '/products' },
              { label: currentCategory.name }
            ]}
          />
          <h1>{currentCategory.name}</h1>
          {currentCategory.description && (
            <p className="page-subtitle">{currentCategory.description}</p>
          )}
        </div>
      </div>

      <ProductsClient
        products={products}
        categories={categories}
        initialCategory={currentCategory.id}
        currencySettings={currencySettings}
      />
    </>
  )
}
