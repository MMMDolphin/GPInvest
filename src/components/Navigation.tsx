'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ChevronDown } from 'lucide-react'
import { menuItems } from '@/config/menuConfig'
import './Navigation.css'

interface Logo {
  url: string
  alt?: string
}

interface NavigationProps {
  companyName?: string
  logo?: Logo | null
}

export default function Navigation({ companyName = 'GP Invest', logo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<number | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleDropdownMouseEnter = (index: number) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
    }
    setActiveDropdown(index)
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
    setDropdownTimeout(timeout)
  }

  const toggleMobileDropdown = (index: number) => {
    setMobileActiveDropdown(mobileActiveDropdown === index ? null : index)
  }

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
              {logo ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || companyName}
                  className="logo-image"
                  width={180}
                  height={60}
                  priority
                />
              ) : (
                companyName
              )}
            </Link>

            {/* Desktop Navigation Menu */}
            <ul className="nav-menu-desktop">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={item.children ? 'nav-dropdown' : ''}
                  onMouseEnter={item.children ? () => handleDropdownMouseEnter(index) : undefined}
                  onMouseLeave={item.children ? handleDropdownMouseLeave : undefined}
                >
                  {item.children ? (
                    <>
                      <span className="nav-dropdown-trigger">
                        {item.label}
                        <ChevronDown size={16} className={activeDropdown === index ? 'rotated' : ''} />
                      </span>
                      {activeDropdown === index && (
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                            >
                              Всички {item.label.toLowerCase()}
                            </Link>
                          </li>
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                href={child.href}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
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
              {logo ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || companyName}
                  className="mobile-menu-logo"
                  width={150}
                  height={50}
                />
              ) : (
                <span className="mobile-menu-title">{companyName}</span>
              )}
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
              {menuItems.map((item, index) => (
                <li key={index} className={item.children ? 'mobile-dropdown' : ''}>
                  {item.children ? (
                    <>
                      <button
                        className="mobile-dropdown-trigger"
                        onClick={() => toggleMobileDropdown(index)}
                      >
                        {item.label}
                        <ChevronDown size={20} className={mobileActiveDropdown === index ? 'rotated' : ''} />
                      </button>
                      {mobileActiveDropdown === index && (
                        <ul className="mobile-submenu">
                          <li>
                            <Link href={item.href} onClick={() => setIsOpen(false)}>
                              Всички {item.label.toLowerCase()}
                            </Link>
                          </li>
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
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
