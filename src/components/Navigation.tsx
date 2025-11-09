'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, ChevronDown, Package } from 'lucide-react'
import './Navigation.css'

interface Category {
  id: string
  name: string
  slug?: string
  parent?: string | Category | null
}

interface HierarchicalCategory {
  id: string
  name: string
  slug?: string
  level: number
  children: HierarchicalCategory[]
}

interface Logo {
  url: string
  alt?: string
}

interface NavigationProps {
  companyName?: string
  logo?: Logo | null
  categories?: Category[]
}

export default function Navigation({ companyName = 'GP Invest', logo, categories = [] }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleProductsDropdown = () => setProductsDropdownOpen(!productsDropdownOpen)
  const [hoveredParentId, setHoveredParentId] = useState<string | null>(null)

  // Get parent categories only
  const parentCategories = categories.filter(cat => {
    const parentId = typeof cat.parent === 'object' && cat.parent !== null ? cat.parent.id : cat.parent
    return !parentId
  })

  // Get children for a specific parent
  const getChildrenForParent = (parentId: string) => {
    return categories.filter(cat => {
      const catParentId = typeof cat.parent === 'object' && cat.parent !== null ? cat.parent.id : cat.parent
      return catParentId === parentId
    })
  }

  // Get grandchildren for a specific child
  const getGrandchildrenForChild = (childId: string) => {
    return categories.filter(cat => {
      const catParentId = typeof cat.parent === 'object' && cat.parent !== null ? cat.parent.id : cat.parent
      return catParentId === childId
    })
  }

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
    }
    setProductsDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setProductsDropdownOpen(false)
    }, 200)
    setDropdownTimeout(timeout)
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
                <img src={logo.url} alt={logo.alt || companyName} className="logo-image" />
              ) : (
                companyName
              )}
            </Link>

            {/* Desktop Navigation Menu */}
            <ul className="nav-menu-desktop">
              <li>
                <Link href="/">Начало</Link>
              </li>
              <li
                className="nav-dropdown"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <span className="nav-dropdown-trigger">
                  Продукти
                  <ChevronDown size={16} className={productsDropdownOpen ? 'rotated' : ''} />
                </span>
                {productsDropdownOpen && (
                  <div className="mega-menu">
                    {/* Left Panel - Parent Categories */}
                    <div className="mega-menu-left">
                      <div className="mega-menu-header">
                        <Link
                          href="/products"
                          onClick={() => setProductsDropdownOpen(false)}
                          className="mega-menu-all-products"
                        >
                          Всички продукти
                        </Link>
                      </div>
                      <ul className="mega-menu-parents">
                        {parentCategories.map((parent) => {
                          if (!parent.slug) return null
                          const isHovered = hoveredParentId === parent.id
                          return (
                            <li
                              key={parent.id}
                              onMouseEnter={() => setHoveredParentId(parent.id)}
                              className={isHovered ? 'active' : ''}
                            >
                              <Link
                                href={`/products/category/${parent.slug}`}
                                onClick={() => setProductsDropdownOpen(false)}
                              >
                                {parent.name}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>

                    {/* Right Panel - Children & Grandchildren */}
                    {hoveredParentId && (
                      <div className="mega-menu-right">
                        {getChildrenForParent(hoveredParentId).map((child) => {
                          if (!child.slug) return null
                          const grandchildren = getGrandchildrenForChild(child.id)

                          return (
                            <div key={child.id} className="mega-menu-category-group">
                              <Link
                                href={`/products/category/${child.slug}`}
                                onClick={() => setProductsDropdownOpen(false)}
                                className="mega-menu-child-title"
                              >
                                {child.name}
                              </Link>
                              {grandchildren.length > 0 && (
                                <ul className="mega-menu-grandchildren">
                                  {grandchildren.map((grandchild) => {
                                    if (!grandchild.slug) return null
                                    return (
                                      <li key={grandchild.id}>
                                        <Link
                                          href={`/products/category/${grandchild.slug}`}
                                          onClick={() => setProductsDropdownOpen(false)}
                                        >
                                          {grandchild.name}
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
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
              {logo ? (
                <img src={logo.url} alt={logo.alt || companyName} className="mobile-menu-logo" />
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
              <li>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Начало
                </Link>
              </li>
              <li className="mobile-dropdown">
                <button
                  className="mobile-dropdown-trigger"
                  onClick={toggleProductsDropdown}
                >
                  Продукти
                  <ChevronDown size={20} className={productsDropdownOpen ? 'rotated' : ''} />
                </button>
                {productsDropdownOpen && (
                  <ul className="mobile-submenu">
                    <li>
                      <Link href="/products" onClick={() => setIsOpen(false)}>
                        <Package size={18} />
                        Всички продукти
                      </Link>
                    </li>
                    {hierarchicalCategories.map((category) => {
                      if (!category.slug) return null

                      // Determine CSS class based on level
                      let className = ''
                      if (category.level === 1) className = 'mobile-submenu-child'
                      if (category.level === 2) className = 'mobile-submenu-grandchild'

                      // Create indentation prefix
                      const prefix = category.level === 1 ? '→ ' : category.level === 2 ? '→→ ' : ''

                      return (
                        <li key={category.id} className={className}>
                          <Link
                            href={`/products/category/${category.slug}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Package size={18} />
                            {prefix}{category.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
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
