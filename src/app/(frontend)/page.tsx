import React from 'react'
import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import {
  Shield, Headphones, Truck, Award, BadgeCheck, Clock,
  ArrowRight, Phone
} from 'lucide-react'
import { getIconComponent } from '@/utils/iconMapper'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { fetchSiteData } from '@/lib/getSiteData'
import './homepage.css'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const { siteSettings } = await fetchSiteData()

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

  // Fetch all categories for homepage display
  const homepageCategoriesData = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  const homepageCategories = homepageCategoriesData.docs.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon || 'Package',
    link: `/products/category/${category.slug}`,
  }))

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
      {heroSlides.length > 0 && <HeroCarousel slides={heroSlides} />}

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

      {/* Product Categories Section */}
      {homepageCategories.length > 0 && (
        <section className="categories-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Категории продукти</h2>
              <p className="section-subtitle">Разгледайте нашата богата гама от POS решения и оборудване</p>
            </div>

            <div className="categories-grid">
              {homepageCategories.map((category: any) => {
                const IconComponent = getIconComponent(category.icon)

                return (
                  <Link key={category.id} href={category.link} className="category-card">
                    <div className="category-icon">
                      <IconComponent size={24} />
                    </div>
                    <div className="category-content">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>
                    <div className="category-arrow">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

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
                <Shield size={24} />
              </div>
              <div>
                <h3>Гарантирано качество</h3>
                <p>Проверени и сертифицирани продукти от водещи производители.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Headphones size={24} />
              </div>
              <div>
                <h3>Техническа поддръжка</h3>
                <p>Пълна техническа поддръжка и сервиз 24/7.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={24} />
              </div>
              <div>
                <h3>Бърза доставка</h3>
                <p>Бърза доставка и професионална инсталация.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <div>
                <h3>Официална гаранция</h3>
                <p>Официална гаранция от производителя на всички продукти.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BadgeCheck size={24} />
              </div>
              <div>
                <h3>Сертификация</h3>
                <p>Решения отговарящи на всички нормативни изисквания.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={24} />
              </div>
              <div>
                <h3>Дългогодишен опит</h3>
                <p>Над 15 години опит и хиляди доволни клиенти.</p>
              </div>
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
    </>
  )
}
