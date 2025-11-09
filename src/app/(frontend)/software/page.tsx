import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import './software.css'

export default async function SoftwarePage() {
  const softwareProducts = [
    {
      id: 1,
      name: 'Мистрал V3',
      slug: 'mistral-v3',
      description: 'Пълнофункционален софтуер с BackOffice и POS модули за цялостно управление на складови операции и продажби',
      highlights: [
        'BackOffice и POS модули',
        'Складово управление',
        'Централизирано управление на отдалечени обекти',
        'Поддръжка на всички видове баркодове',
        'Генератор на справки',
      ],
    },
    {
      id: 2,
      name: 'Zamboo',
      slug: 'zamboo',
      description: 'Интуитивен мултифункционален софтуер за управление на ресторанти, заведения, хотели и магазини',
      highlights: [
        'POS система с KDS интеграция',
        'Web управление',
        'OCR за автоматично въвеждане на доставки',
        'Лоялна програма',
        'Подробни отчети и анализи',
      ],
    },
    {
      id: 3,
      name: 'ТИС Карат',
      slug: 'tis-karat',
      description: 'Търговска информационна система за автоматизирано управление на продажби, складови наличности и парични потоци',
      highlights: [
        'Back Office и POS модули',
        'Многоскладова поддръжка',
        'TouchScreen поддръжка',
        'Интеграция с фискални устройства',
        'Регистрирана в НАП (СУПТО)',
      ],
    },
  ]

  return (
    <>
      <div className="software-hero">
        <div className="container">
          <h1>Търговски Софтуер</h1>
          <p className="hero-subtitle">
            Професионални софтуерни решения за управление на вашия бизнес
          </p>
        </div>
      </div>

      <section className="software-section">
        <div className="container">
          <div className="software-grid">
            {softwareProducts.map((product) => (
              <div key={product.id} className="software-card">
                <div className="software-card-header">
                  <h2>{product.name}</h2>
                  <p className="software-description">{product.description}</p>
                </div>

                <div className="software-highlights">
                  <h3>Основни функционалности:</h3>
                  <ul>
                    {product.highlights.map((highlight, index) => (
                      <li key={index}>
                        <CheckCircle size={18} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/software/${product.slug}`} className="software-cta">
                  <span>Научете повече</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="software-contact-section">
        <div className="container">
          <div className="contact-cta-box">
            <h2>Нуждаете се от консултация?</h2>
            <p>Свържете се с нас за да получите персонализирана оферта и демонстрация на софтуера</p>
            <Link href="/contact" className="btn-primary-gradient">
              Свържете се с нас
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
