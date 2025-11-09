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

  // Build hierarchical category structure for flat display with indentation
  const buildHierarchicalCategories = (): HierarchicalCategory[] => {
    const flatList: HierarchicalCategory[] = []

    // First, find all parent categories (categories without a parent)
    const parentCategories = categories.filter(cat => {
      const parentId = typeof cat.parent === 'object' && cat.parent !== null ? cat.parent.id : cat.parent
      return !parentId
    })

    // Recursive function to add category and its children to flat list
    const addCategoryWithChildren = (category: Category, level: number) => {
      flatList.push({
        id: category.id,
        name: category.name,
        slug: category.slug,
        level,
        children: []
      })

      // Find children of this category
      const children = categories.filter(cat => {
        const parentId = typeof cat.parent === 'object' && cat.parent !== null ? cat.parent.id : cat.parent
        return parentId === category.id
      })

      // Recursively add children
      children.forEach(child => addCategoryWithChildren(child, level + 1))
    }

    // Build the flat list with hierarchy
    parentCategories.forEach(parent => addCategoryWithChildren(parent, 0))

    return flatList
  }

  const hierarchicalCategories = buildHierarchicalCategories()

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
                <button className="nav-dropdown-trigger">
                  Продукти
                  <ChevronDown size={16} className={productsDropdownOpen ? 'rotated' : ''} />
                </button>
                {productsDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        href="/products"
                        onClick={() => setProductsDropdownOpen(false)}
                      >
                        Всички продукти
                      </Link>
                    </li>
                    {hierarchicalCategories.map((category) => {
                      if (!category.slug) return null

                      // Determine CSS class based on level
                      let className = ''
                      if (category.level === 1) className = 'dropdown-item-child'
                      if (category.level === 2) className = 'dropdown-item-grandchild'

                      // Create indentation prefix
                      const prefix = category.level === 1 ? '→ ' : category.level === 2 ? '→→ ' : ''

                      return (
                        <li key={category.id} className={className}>
                          <Link
                            href={`/products/category/${category.slug}`}
                            onClick={() => setProductsDropdownOpen(false)}
                          >
                            {prefix}{category.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
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
