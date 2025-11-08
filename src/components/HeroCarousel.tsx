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
          <div className="hero-image">
            <Image
              src={slide.backgroundImage.url}
              alt={slide.backgroundImage.alt}
              fill
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-overlay"></div>
          </div>

          <div className="hero-content">
            <div className="container">
              <div className="hero-text">
                {slide.subtitle && <p className="hero-subtitle">{slide.subtitle}</p>}
                <h1 className="hero-title">{slide.title}</h1>
                {slide.description && <p className="hero-description">{slide.description}</p>}
                {slide.buttonText && slide.buttonLink && (
                  <a href={slide.buttonLink} className="btn btn-primary hero-btn">
                    {slide.buttonText}
                  </a>
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
