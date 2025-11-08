import React from 'react'
import Link from 'next/link'
import './Breadcrumb.css'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/">Начало</Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              <span className="breadcrumb-separator">/</span>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="breadcrumb-current">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
