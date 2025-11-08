'use client'

import React, { useState, useEffect } from 'react'
import './StickyCTA.css'

interface StickyCTAProps {
  productName: string
}

export default function StickyCTA({ productName }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.querySelector('.product-inquiry-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <button
      className={`sticky-cta ${isVisible ? 'visible' : ''}`}
      onClick={scrollToForm}
      aria-label="Получи оферта"
    >
      <span className="cta-icon">📋</span>
      <span className="cta-text">Получи оферта</span>
    </button>
  )
}
