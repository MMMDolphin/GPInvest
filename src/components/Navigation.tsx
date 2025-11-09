'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import './Navigation.css'

interface NavigationProps {
  companyName?: string
}

export default function Navigation({ companyName = 'GP Invest' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Track scroll for navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-wrapper">
            {/* Logo */}
            <Link href="/" className="logo" onClick={() => setIsOpen(false)}>
              {companyName}
            </Link>

            {/* Desktop Navigation Menu */}
            <ul className="nav-menu-desktop">
              <li>
                <Link href="/">Начало</Link>
              </li>
              <li>
                <Link href="/products">Продукти</Link>
              </li>
              <li>
                <Link href="/services">Услуги</Link>
              </li>
              <li>
                <Link href="/about">За нас</Link>
              </li>
              <li>
                <Link href="/contact">Контакти</Link>
              </li>
            </ul>

            {/* CTA Button */}
            <Link href="/contact" className="nav-cta">
              <Phone size={18} />
              <span>Свържете се</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`nav-toggle ${isOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">{companyName}</span>
              <button
                className="mobile-menu-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <span></span>
                <span></span>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <ul className="mobile-menu-items">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Начало
                </Link>
              </li>
              <li>
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  Продукти
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setIsOpen(false)}>
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Контакти
                </Link>
              </li>
            </ul>

            {/* Mobile CTA */}
            <Link href="/contact" className="mobile-menu-cta" onClick={() => setIsOpen(false)}>
              <Phone size={20} />
              <span>Свържете се с нас</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
