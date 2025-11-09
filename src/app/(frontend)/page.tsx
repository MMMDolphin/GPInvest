import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import {
  Shield, Headphones, Truck, Award, BadgeCheck, Clock,
  ShoppingCart, Laptop, Wrench, Package, ArrowRight, Phone
} from 'lucide-react'
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

  // Fetch homepage categories from admin
  const homeCategoriesData = await payload.findGlobal({
    slug: 'home-categories',
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
    productImage: slide.productImage && typeof slide.productImage === 'object' ? {
      url: slide.productImage.url,
      alt: slide.productImage.alt || slide.title,
    } : undefined,
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

      {/* Product Categories Section */}
      {homeCategoriesData.enabled && homeCategoriesData.categories && homeCategoriesData.categories.length > 0 && (
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{homeCategoriesData.title}</h2>
              {homeCategoriesData.subtitle && (
                <p className="section-subtitle">{homeCategoriesData.subtitle}</p>
              )}
            </div>

            <div className="categories-grid">
              {homeCategoriesData.categories.map((category: any, index: number) => {
                const IconComponent = category.icon === 'ShoppingCart' ? ShoppingCart :
                                     category.icon === 'Laptop' ? Laptop :
                                     category.icon === 'Wrench' ? Wrench :
                                     category.icon === 'Package' ? Package :
                                     category.icon === 'Smartphone' ? Phone :
                                     category.icon === 'Monitor' ? Laptop :
                                     category.icon === 'Printer' ? Laptop :
                                     category.icon === 'HardDrive' ? Package :
                                     category.icon === 'Scale' ? Package :
                                     category.icon === 'Barcode' ? Package : ShoppingCart

                return (
                  <Link key={index} href={category.link} className="category-card">
                    <div className="category-icon">
                      <IconComponent size={40} />
                    </div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <div className="category-arrow">
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <div className="section-header-accent"></div>
            <h2 className="section-title">Нашите продукти</h2>
            <p className="section-subtitle">
              Открийте най-доброто оборудване и софтуер за вашия бизнес
            </p>
          </div>

          {products.length > 0 ? (
            <>
              <div className="products-grid">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="section-cta">
                <Link href="/products" className="btn-primary-gradient">
                  <span>Виж всички продукти</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>Все още няма продукти в каталога.</p>
              <Link href="/admin" className="btn-primary-gradient">
                Добави продукти
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Защо да изберете GP Invest?</h2>
            <p className="section-subtitle">
              Вашият надежден партньор за професионални бизнес решения
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Гарантирано качество</h3>
              <p>Предлагаме само проверени и сертифицирани продукти от водещи производители.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Headphones size={32} />
              </div>
              <h3>Техническа поддръжка</h3>
              <p>Осигуряваме пълна техническа поддръжка и сервиз на всички наши продукти 24/7.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <h3>Бърза доставка</h3>
              <p>Гарантираме бърза доставка и професионална инсталация на оборудването.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Award size={32} />
              </div>
              <h3>Официална гаранция</h3>
              <p>Всички продукти се предлагат с официална гаранция от производителя.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BadgeCheck size={32} />
              </div>
              <h3>Сертификация</h3>
              <p>Сертифицирани решения, отговарящи на всички нормативни изисквания.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Дългогодишен опит</h3>
              <p>Над 15 години опит в индустрията и хиляди доволни клиенти.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Години опит</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Доволни клиенти</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Инсталирани продукта</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Техническа поддръжка</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-content">
              <h2>Готови ли сте да надградите вашия бизнес?</h2>
              <p>
                Свържете се с нас днес за безплатна консултация и персонализирана оферта
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn-cta-primary">
                <Phone size={20} />
                <span>Свържете се с нас</span>
              </Link>
              <Link href="/products" className="btn-cta-secondary">
                <span>Разгледай продукти</span>
                <ArrowRight size={20} />
              </Link>
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
