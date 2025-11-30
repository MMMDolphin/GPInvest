'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import './CookieConsent.css'

const COOKIE_CONSENT_KEY = 'gp-invest-cookie-consent'

type ConsentStatus = 'accepted' | 'declined' | null

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (accepted: boolean) => {
    setIsClosing(true)

    // Store user preference
    localStorage.setItem(COOKIE_CONSENT_KEY, accepted ? 'accepted' : 'declined')

    // If accepted, you can initialize analytics/tracking here
    if (accepted) {
      // Example: Initialize Google Analytics, Facebook Pixel, etc.
      // window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }

    // Animate out then hide
    setTimeout(() => {
      setShowBanner(false)
      setIsClosing(false)
    }, 300)
  }

  if (!showBanner) return null

  return (
    <div className={`cookie-consent ${isClosing ? 'closing' : ''}`}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-icon">
          <Cookie size={24} />
        </div>
        <div className="cookie-consent-text">
          <p>
            Използваме бисквитки, за да подобрим вашето изживяване на сайта.
            Научете повече в нашата{' '}
            <Link href="/privacy">Политика за поверителност</Link>.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            onClick={() => handleConsent(false)}
            className="cookie-btn cookie-btn-decline"
          >
            Отказвам
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="cookie-btn cookie-btn-accept"
          >
            Приемам
          </button>
        </div>
        <button
          onClick={() => handleConsent(false)}
          className="cookie-consent-close"
          aria-label="Затвори"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}
