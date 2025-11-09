import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import NewsletterSignup from './NewsletterSignup'
import './Footer.css'

interface FooterProps {
  companyName?: string
  email?: string | null
  phone?: string | null
  address?: string | null
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
}

export default function Footer({
  companyName = 'GP Invest',
  email = 'info@gpinvest.bg',
  phone = '+359 2 123 4567',
  address = 'София, България',
  facebook,
  instagram,
  linkedin,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info Section */}
            <div className="footer-section footer-brand">
              <h3 className="footer-brand-title">{companyName}</h3>
              <p className="footer-tagline">
                Вашият надежден партньор за професионални POS решения и бизнес оборудване
              </p>
              <div className="footer-social">
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-heading">Бързи връзки</h4>
              <ul className="footer-links">
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
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-heading">Контакти</h4>
              <ul className="footer-contact">
                <li>
                  <a href={`mailto:${email}`} className="contact-link">
                    <Mail size={18} />
                    <span>{email}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${phone?.replace(/\s/g, '') || ''}`} className="contact-link">
                    <Phone size={18} />
                    <span>{phone}</span>
                  </a>
                </li>
                <li className="contact-link">
                  <MapPin size={18} />
                  <span>{address}</span>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="footer-section">
              <h4 className="footer-heading">Абонирайте се</h4>
              <p className="footer-newsletter-text">
                Получавайте последни новини и специални оферти
              </p>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} {companyName}. Всички права запазени.
            </p>
            <div className="footer-legal">
              <Link href="/privacy">Политика за поверителност</Link>
              <Link href="/terms">Общи условия</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
