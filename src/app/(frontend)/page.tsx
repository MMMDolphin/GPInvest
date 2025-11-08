import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import './homepage.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch site settings
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch active hero slides, sorted by order
  const heroSlidesData = await payload.find({
    collection: 'hero-slides',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'order',
    limit: 10,
  })

  // Fetch featured products
  const featuredProductsData = await payload.find({
    collection: 'products',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 6,
  })

  // Transform hero slides data
  const heroSlides = heroSlidesData.docs.map((slide: any) => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    description: slide.description,
    buttonText: slide.buttonText,
    buttonLink: slide.buttonLink,
    backgroundImage: {
      url: typeof slide.backgroundImage === 'object' ? slide.backgroundImage.url : '',
      alt: typeof slide.backgroundImage === 'object' ? slide.backgroundImage.alt : slide.title,
    },
  }))

  // Transform products data
  const products = featuredProductsData.docs.map((product: any) => ({
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

      {heroSlides.length > 0 && <HeroCarousel slides={heroSlides} />}

      <section className="section">
        <div className="container">
          <h2 className="section-title">Нашите продукти</h2>
          <p className="section-subtitle">
            Открийте най-доброто оборудване и софтуер за вашия бизнес
          </p>

          {products.length > 0 ? (
            <div className="products-grid">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Все още няма продукти в каталога.</p>
              <a href="/admin" className="btn btn-primary">
                Добави продукти
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <h2 className="section-title">Защо да изберете GP Invest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Гарантирано качество</h3>
              <p>Предлагаме само проверени и сертифицирани продукти от водещи производители.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3>Техническа поддръжка</h3>
              <p>Осигуряваме пълна техническа поддръжка и сервиз на всички наши продукти.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Бърза доставка</h3>
              <p>Гарантираме бърза доставка и инсталация на оборудването.</p>
            </div>
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
