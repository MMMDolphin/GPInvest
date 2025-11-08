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
  Award, Wrench, Clock, Package, BadgeCheck, Heart
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

  return (
    <>
      <Navigation companyName={siteSettings.companyName} />

      <div className="page-header">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Продукти', href: '/products' },
              { label: product.name },
            ]}
          />
          <h1 className="product-seo-title">{seoTitle}</h1>
          {product.shortDescription && (
            <p className="page-subtitle">{product.shortDescription}</p>
          )}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="product-main-image">
                {typeof product.image === 'object' && product.image.url && (
                  <Image
                    src={product.image.url}
                    alt={product.image.alt || product.name}
                    width={600}
                    height={600}
                    className="main-image"
                  />
                )}
              </div>

              {product.gallery && product.gallery.length > 0 && (
                <div className="product-gallery">
                  {product.gallery.map((item: any, index: number) => (
                    <div key={index} className="gallery-item">
                      {typeof item.image === 'object' && item.image.url && (
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || `${product.name} ${index + 1}`}
                          width={150}
                          height={150}
                          className="gallery-image"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-category">{categoryName}</div>

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="product-highlights">
                  <ul className="highlights-list">
                    {product.highlights.map((item: any, index: number) => (
                      <li key={index}>{item.highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-price-section">
                <div className="price-with-vat">
                  <div className="product-price">{priceWithVAT.toFixed(2)} лв</div>
                  <div className="price-label">с ДДС</div>
                </div>
                <div className="price-without-vat">
                  Цена без ДДС: {priceWithoutVAT.toFixed(2)} лв
                </div>
                <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? '✓ В наличност' : '✕ Няма в наличност'}
                </div>
              </div>

              {/* Trust Badges */}
              {product.trustBadges && product.trustBadges.length > 0 && (
                <div className="trust-badges">
                  {product.trustBadges.map((item: any, index: number) => {
                    const badge = typeof item === 'object' ? item : null
                    if (!badge) return null

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

                    const IconComponent = iconMap[badge.icon] || Check

                    return (
                      <div key={badge.id || index} className="trust-badge">
                        <span className="badge-icon">
                          <IconComponent size={20} strokeWidth={2} />
                        </span>
                        <span className="badge-text">{badge.name}</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {product.features && product.features.length > 0 && (
                <div className="product-features">
                  <h3>Характеристики</h3>
                  <ul className="features-list">
                    {product.features.map((item: any, index: number) => (
                      <li key={index}>{item.feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Product Inquiry Form */}
          <div className="product-inquiry-section">
            <h2>Запитване за продукта</h2>
            <p className="inquiry-intro">
              Интересувате се от този продукт? Попълнете формата по-долу и ние ще се свържем с вас скоро.
            </p>
            <ContactForm productName={product.name} productUrl={productUrl} />
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="product-description-section">
              <h2>Описание</h2>
              <div className="product-description">
                {renderRichText(product.description)}
              </div>
            </div>
          )}

          {/* Technical Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="product-specifications">
              <h2>Технически спецификации</h2>
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
          )}

          {/* Included Services */}
          {product.includedServices && product.includedServices.length > 0 && (
            <div className="included-services-section">
              <h2>Включени услуги</h2>
              <div className="services-grid">
                {product.includedServices.map((service: any, index: number) => (
                  <div key={index} className="service-card">
                    <div className="service-icon">✓</div>
                    <div className="service-content">
                      <h3>{service.service}</h3>
                      {service.description && <p>{service.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="certifications-section">
              <h2>Сертификати</h2>
              <div className="certifications-grid">
                {product.certifications.map((item: any, index: number) => {
                  const cert = typeof item === 'object' ? item : null
                  if (!cert) return null

                  return (
                    <div key={cert.id || index} className="certification-card">
                      {typeof cert.image === 'object' && cert.image.url && (
                        <div className="certification-image">
                          <Image
                            src={cert.image.url}
                            alt={cert.name}
                            width={200}
                            height={200}
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
          )}
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
