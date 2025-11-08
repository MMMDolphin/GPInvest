'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

interface Certification {
  id: string
  name: string
  description?: string
  image?: {
    url: string
    alt?: string
  }
}

interface CertificationGridProps {
  certifications: Certification[]
}

export default function CertificationGrid({ certifications }: CertificationGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Build images array for lightbox
  const certImages = certifications
    .filter(cert => cert.image?.url)
    .map(cert => ({
      url: cert.image!.url,
      alt: cert.image?.alt || cert.name,
    }))

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="certifications-grid">
        {certifications.map((cert, index) => {
          const imageIndex = certifications.slice(0, index).filter(c => c.image?.url).length

          return (
            <div key={cert.id || index} className="certification-card">
              {cert.image?.url && (
                <div
                  className="certification-image-wrapper"
                  onClick={() => openLightbox(imageIndex)}
                >
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

      {certImages.length > 0 && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={certImages}
          currentIndex={currentImageIndex}
          onNavigate={setCurrentImageIndex}
        />
      )}
    </>
  )
}
