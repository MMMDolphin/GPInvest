import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import ProductsClient from '../../ProductsClient'
import '../../products.css'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch all categories for navigation and filtering
  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  const categories = categoriesData.docs.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
  }))

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
      ? product.category?.id
      : product.category
    return productCategory === currentCategory.id
  })

  // Transform logo data
  const logo = siteSettings.logo && typeof siteSettings.logo === 'object' ? {
    url: siteSettings.logo.url,
    alt: siteSettings.logo.alt || siteSettings.companyName,
  } : null

  return (
    <>
      <Navigation companyName={siteSettings.companyName} logo={logo} categories={categories} />

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
      />

      <Footer
        companyName={siteSettings.companyName}
        logo={logo}
        tagline={siteSettings.tagline}
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
