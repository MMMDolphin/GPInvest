import React from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import ProductsClient from '../../ProductsClient'
import '../../products.css'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { fetchSiteData } from '@/lib/getSiteData'
import { getParentCategoryBySlug } from '@/config/menuConfig'

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params
  const payload = await getPayloadClient()
  const { categories, currencySettings } = await fetchSiteData()

  // Check if this is a parent category (aggregates multiple child categories)
  const parentCategory = getParentCategoryBySlug(categorySlug)

  // Find the current category by slug
  const currentCategory = categories.find(c => c.slug === categorySlug)

  // If neither a parent category nor a regular category, return 404
  if (!currentCategory && !parentCategory) {
    notFound()
  }

  // Fetch all products
  const productsData = await payload.find({
    collection: 'products',
    limit: 100,
    sort: '-createdAt',
  })

  // Fetch all brands
  const brandsData = await payload.find({
    collection: 'brands',
    limit: 50,
  })

  const brands = brandsData.docs.map((brand: any) => ({
    id: String(brand.id),
    name: brand.name,
    slug: brand.slug,
  }))

  // Transform products data
  const allProducts = productsData.docs.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    price: product.price,
    category: product.category,
    brand: typeof product.brand === 'object' ? { id: String(product.brand.id), name: product.brand.name } : null,
    image: {
      url: typeof product.image === 'object' ? product.image.url : '',
      alt: typeof product.image === 'object' ? product.image.alt : product.name,
    },
    inStock: product.inStock,
  }))

  // Filter products based on whether this is a parent category or regular category
  let products
  let pageTitle: string
  let pageDescription: string | undefined
  let childCategoryIds: string[] = []

  if (parentCategory && parentCategory.childrenSlugs) {
    // This is a parent category - get products from all child categories
    const childCategories = categories.filter(c => parentCategory.childrenSlugs!.includes(c.slug))
    childCategoryIds = childCategories.map(c => c.id)

    products = allProducts.filter((product) => {
      const productCategoryId = typeof product.category === 'object'
        ? String(product.category?.id)
        : String(product.category)
      return childCategoryIds.includes(productCategoryId)
    })

    pageTitle = parentCategory.label
    pageDescription = `Всички продукти от категория ${parentCategory.label.toLowerCase()}`
  } else {
    // Regular single category
    products = allProducts.filter((product) => {
      const productCategory = typeof product.category === 'object'
        ? String(product.category?.id)
        : String(product.category)
      return productCategory === currentCategory!.id
    })

    pageTitle = currentCategory!.name
    pageDescription = currentCategory!.description
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Продукти', href: '/products' },
              { label: pageTitle }
            ]}
          />
          <h1>{pageTitle}</h1>
          {pageDescription && (
            <p className="page-subtitle">{pageDescription}</p>
          )}
        </div>
      </div>

      <ProductsClient
        products={products}
        categories={categories}
        brands={brands}
        initialCategory={currentCategory?.id}
        currencySettings={currencySettings}
      />
    </>
  )
}
