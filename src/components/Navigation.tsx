'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import './Navigation.css'

interface NavigationProps {
  companyName?: string
}

export default function Navigation({ companyName = 'GP Invest' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-wrapper">
          <Link href="/" className="logo">
            {companyName}
          </Link>

          <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
            <span className={isOpen ? 'open' : ''}></span>
          </button>

          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
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
        </div>
      </div>
    </nav>
  )
}
