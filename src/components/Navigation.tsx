'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ChevronDown, Search, X, Loader2 } from 'lucide-react'
import { menuItems } from '@/config/menuConfig'
import './Navigation.css'

interface SearchResult {
  id: string
  name: string
  slug: string
  price: number
  image: string | null
}

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

  // Search state
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Open search
  const openSearch = () => {
    setShowSearch(true)
    setTimeout(() => searchInputRef.current?.focus(), 100)
  }

  // Close search
  const closeSearch = () => {
    setShowSearch(false)
    setSearchQuery('')
    setSearchResults([])
  }

  // Search products
  const searchProducts = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setSearchResults(data.products || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  // Debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value)
    }, 300)
  }

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSearch) {
        closeSearch()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showSearch])

  // Prevent body scroll when search is open
  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = 'hidden'
    } else if (!isOpen) {
      document.body.style.overflow = 'unset'
    }
  }, [showSearch, isOpen])

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

            {/* Search Button */}
            <button
              className="nav-search-btn"
              onClick={openSearch}
              aria-label="Търсене"
            >
              <Search size={20} />
            </button>

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

      {/* Search Overlay */}
      {showSearch && (
        <div className="search-overlay" onClick={closeSearch}>
          <div className="search-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <div className="search-input-wrapper">
                <Search size={20} className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Търсене на продукти..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {isSearching && <Loader2 size={20} className="search-spinner" />}
              </div>
              <button className="search-close" onClick={closeSearch} aria-label="Затвори">
                <X size={24} />
              </button>
            </div>

            <div className="search-results">
              {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
                <div className="search-no-results">
                  Няма намерени продукти за "{searchQuery}"
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="search-results-list">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="search-result-item"
                      onClick={closeSearch}
                    >
                      {product.image && (
                        <div className="search-result-image">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div className="search-result-info">
                        <span className="search-result-name">{product.name}</span>
                        <span className="search-result-price">
                          {product.price === 0 ? 'Получи оферта' : `${product.price.toFixed(2)} EUR`}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.length < 2 && (
                <div className="search-hint">
                  Въведете поне 2 символа за търсене
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
