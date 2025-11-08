'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './HeroCarousel.css'

interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage: {
    url: string
    alt: string
  }
  productImage?: {
    url: string
    alt: string
  }
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div className="hero-carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          {/* Background Image */}
          <div className="hero-background">
            <Image
              src={slide.backgroundImage.url}
              alt={slide.backgroundImage.alt}
              fill
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Content Container */}
          <div className="hero-content-wrapper">
            <div className="container">
              <div className="hero-split-layout">
                {/* Left Side - Text Content */}
                <div className="hero-text-section">
                  {slide.subtitle && <p className="hero-subtitle">{slide.subtitle}</p>}
                  <h1 className="hero-title">{slide.title}</h1>
                  {slide.description && <p className="hero-description">{slide.description}</p>}
                  {slide.buttonText && slide.buttonLink && (
                    <a href={slide.buttonLink} className="btn btn-light hero-btn">
                      {slide.buttonText}
                    </a>
                  )}
                </div>

                {/* Right Side - Product Image */}
                {slide.productImage && (
                  <div className="hero-product-section">
                    <div className="hero-product-image">
                      <Image
                        src={slide.productImage.url}
                        alt={slide.productImage.alt}
                        fill
                        style={{ objectFit: 'contain' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
