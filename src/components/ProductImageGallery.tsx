'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface ProductImageGalleryProps {
  mainImage: {
    url: string
    alt: string
  }
  gallery?: Array<{
    image: {
      url: string
      alt: string
    }
  }> | null
  productName: string
}

export default function ProductImageGallery({ mainImage, gallery, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Build images array for lightbox
  const allImages = [
    { url: mainImage.url, alt: mainImage.alt || productName },
    ...(gallery || []).map((item, index) => ({
      url: item.image.url,
      alt: item.image.alt || `${productName} ${index + 1}`,
    })),
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="product-images-section">
        <div className="product-main-image-wrapper" onClick={() => openLightbox(0)}>
          <Image
            src={mainImage.url}
            alt={mainImage.alt || productName}
            width={800}
            height={800}
            className="product-main-image"
            priority
          />
        </div>

        {gallery && gallery.length > 0 && (
          <div className="product-thumbnails">
            {gallery.slice(0, 4).map((item: any, index: number) => (
              <div
                key={index}
                className="product-thumbnail"
                onClick={() => openLightbox(index + 1)}
              >
                {typeof item.image === 'object' && item.image.url && (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || `${productName} ${index + 1}`}
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

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allImages}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </>
  )
}
