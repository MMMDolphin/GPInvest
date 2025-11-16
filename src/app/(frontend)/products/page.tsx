import React from 'react'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import ProductsClient from './ProductsClient'
import './products.css'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { fetchSiteData } from '@/lib/getSiteData'

export const metadata: Metadata = {
  title: 'Продукти - Касови апарати и POS системи',
  description: 'Разгледайте нашата гама от касови апарати, фискални принтери, POS терминали и аксесоари. Професионално оборудване за Вашия бизнес с гаранция и сервиз.',
  openGraph: {
    title: 'Продукти - Касови апарати и POS системи | GP Invest',
    description: 'Разгледайте нашата гама от касови апарати, фискални принтери, POS терминали и аксесоари.',
    url: 'https://gpinvest.bg/products',
  },
  alternates: {
    canonical: 'https://gpinvest.bg/products',
  },
}

export default async function ProductsPage() {
  const payload = await getPayloadClient()
  const { categories } = await fetchSiteData()

  // Fetch all products
  const productsData = await payload.find({
    collection: 'products',
    limit: 100,
    sort: '-createdAt',
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

  return (
    <>
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
    </>
  )
}
