import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import StickyCTA from '@/components/StickyCTA'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { headers } from 'next/headers'
import {
  Check, Shield, Truck, Settings, Phone, Star,
  Award, Wrench, Clock, Package, BadgeCheck, Heart,
  Download, FileText, Zap
} from 'lucide-react'
import './product-detail.css'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

// Helper function to render Payload rich text (Lexical JSON)
function renderRichText(content: any): React.ReactNode {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (node.type === 'text') {
      let text = node.text
      if (node.format & 1) text = <strong key={index}>{text}</strong> // bold
      if (node.format & 2) text = <em key={index}>{text}</em> // italic
      return text
    }

    if (node.type === 'paragraph') {
      return (
        <p key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </p>
      )
    }

    if (node.type === 'heading') {
      const Tag = `h${node.tag}` as keyof JSX.IntrinsicElements
      return (
        <Tag key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </Tag>
      )
    }

    if (node.type === 'list') {
      const Tag = node.listType === 'bullet' || node.listType === 'check' ? 'ul' : 'ol'
      return (
        <Tag key={index} className={node.listType === 'check' ? 'checklist' : ''}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </Tag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      )
    }

    if (node.type === 'link') {
      return (
        <a key={index} href={node.url} target="_blank" rel="noopener noreferrer">
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </a>
      )
    }

    // Default: render children if they exist
    if (node.children) {
      return node.children.map((child: any, i: number) => renderNode(child, i))
    }

    return null
  }

  return content.root.children.map((node: any, index: number) => renderNode(node, index))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Get the full URL for the product
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const productUrl = `${protocol}://${host}/products/${slug}`

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

  // Get brand name
  const brandName = typeof product.brand === 'object' ? product.brand.name : ''

  // Calculate price without VAT
  const vatRate = product.vatRate || 20
  const priceWithVAT = product.price
  const priceWithoutVAT = priceWithVAT / (1 + vatRate / 100)

  // Build SEO-optimized title
  const seoTitle = brandName && product.model
    ? `${brandName} | ${product.model} | ${product.name}`
    : brandName
    ? `${brandName} | ${product.name}`
    : product.name

  // Icon mapping for trust badges
  const iconMap: Record<string, React.ElementType> = {
    check: Check,
    shield: Shield,
    truck: Truck,
    settings: Settings,
    phone: Phone,
    star: Star,
    award: Award,
    wrench: Wrench,
    clock: Clock,
    package: Package,
    'badge-check': BadgeCheck,
    heart: Heart,
  }

  return (
    <>
      <Navigation companyName={siteSettings.companyName} />

      {/* Minimal Header with Breadcrumb */}
      <div className="product-header">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Продукти', href: '/products' },
              { label: categoryName, href: '/products' },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      {/* Hero Section - Product Overview */}
      <section className="product-hero">
        <div className="container">
          <div className="product-hero-grid">
            {/* Left: Product Images */}
            <div className="product-images-section">
              <div className="product-main-image-wrapper">
                {typeof product.image === 'object' && product.image.url && (
                  <Image
                    src={product.image.url}
                    alt={product.image.alt || product.name}
                    width={800}
                    height={800}
                    className="product-main-image"
                    priority
                  />
                )}
              </div>

              {product.gallery && product.gallery.length > 0 && (
                <div className="product-thumbnails">
                  {product.gallery.slice(0, 4).map((item: any, index: number) => (
                    <div key={index} className="product-thumbnail">
                      {typeof item.image === 'object' && item.image.url && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || `${product.name} ${index + 1}`}
                          width={120}
                          height={120}
                          className="thumbnail-image"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information */}
            <div className="product-info-section">
              {/* Category Badge */}
              <div className="product-category-badge">
                {categoryName}
              </div>

              {/* Product Title */}
              <h1 className="product-title">{seoTitle}</h1>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="product-short-description">{product.shortDescription}</p>
              )}

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="product-highlights-section">
                  <ul className="product-highlights-list">
                    {product.highlights.map((item: any, index: number) => (
                      <li key={index} className="product-highlight-item">
                        <Check size={20} strokeWidth={2.5} className="highlight-icon" />
                        <span>{item.highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price Card - Premium Glass-morphism */}
              <div className="product-price-card">
                <div className="price-card-content">
                  <div className="price-main">
                    <div className="price-amount">{priceWithVAT.toFixed(2)} лв</div>
                    <div className="price-label">с ДДС</div>
                  </div>
                  <div className="price-without-vat">
                    Без ДДС: {priceWithoutVAT.toFixed(2)} лв
                  </div>
                  <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    <div className="stock-indicator"></div>
                    {product.inStock ? 'В наличност' : 'Няма в наличност'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="btn-primary-large">
                  Запитване за продукта
                </button>
                <button className="btn-secondary-outline">
                  <Download size={20} />
                  <span>Свали спецификация</span>
                </button>
              </div>

              {/* Trust Badges */}
              {product.trustBadges && product.trustBadges.length > 0 && (
                <div className="trust-badges-section">
                  {product.trustBadges.map((item: any, index: number) => {
                    const badge = typeof item === 'object' ? item : null
                    if (!badge) return null
                    const IconComponent = iconMap[badge.icon] || Check

                    return (
                      <div key={badge.id || index} className="trust-badge-item">
                        <div className="trust-badge-icon">
                          <IconComponent size={18} strokeWidth={2} />
                        </div>
                        <span className="trust-badge-text">{badge.name}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section - Cards */}
      {product.features && product.features.length > 0 && (
        <section className="product-features-section">
          <div className="container">
            <h2 className="section-heading">Ключови характеристики</h2>
            <div className="features-grid">
              {product.features.slice(0, 6).map((item: any, index: number) => (
                <div key={index} className="feature-card">
                  <div className="feature-card-icon">
                    <Zap size={24} />
                  </div>
                  <div className="feature-card-text">{item.feature}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tabbed Content Section */}
      <section className="product-details-section">
        <div className="container">
          <div className="product-tabs">
            {/* Description Tab */}
            {product.description && (
              <div className="tab-content">
                <h2 className="tab-heading">Описание</h2>
                <div className="product-description-content">
                  {renderRichText(product.description)}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="tab-content">
                <h2 className="tab-heading">Технически спецификации</h2>
                <div className="specifications-table-wrapper">
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
              </div>
            )}

            {/* Included Services */}
            {product.includedServices && product.includedServices.length > 0 && (
              <div className="tab-content">
                <h2 className="tab-heading">Включени услуги</h2>
                <div className="services-grid">
                  {product.includedServices.map((service: any, index: number) => (
                    <div key={index} className="service-card">
                      <div className="service-card-icon">
                        <Check size={24} />
                      </div>
                      <div className="service-card-content">
                        <h3 className="service-card-title">{service.service}</h3>
                        {service.description && (
                          <p className="service-card-description">{service.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      {product.certifications && product.certifications.length > 0 && (
        <section className="certifications-section">
          <div className="container">
            <h2 className="section-heading">Сертификати и одобрения</h2>
            <div className="certifications-grid">
              {product.certifications.map((item: any, index: number) => {
                const cert = typeof item === 'object' ? item : null
                if (!cert) return null

                return (
                  <div key={cert.id || index} className="certification-card">
                    {typeof cert.image === 'object' && cert.image.url && (
                      <div className="certification-image-wrapper">
                        <Image
                          src={cert.image.url}
                          alt={cert.name}
                          width={120}
                          height={120}
                          className="certification-image"
                        />
                      </div>
                    )}
                    <div className="certification-name">{cert.name}</div>
                    {cert.description && (
                      <p className="certification-description">{cert.description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="product-inquiry-section">
        <div className="container">
          <div className="inquiry-content-wrapper">
            <div className="inquiry-header">
              <h2 className="inquiry-heading">Заинтересовани сте от този продукт?</h2>
              <p className="inquiry-subheading">
                Попълнете формата и нашият екип ще се свърже с вас в рамките на 24 часа с персонализирана оферта.
              </p>
            </div>
            <ContactForm productName={product.name} productUrl={productUrl} />
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

      <StickyCTA productName={product.name} />
    </>
  )
}
