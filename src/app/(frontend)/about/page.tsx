import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import './about.css'

export default async function AboutPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Transform logo data
  const logo = siteSettings.logo && typeof siteSettings.logo === 'object' ? {
    url: siteSettings.logo.url,
    alt: siteSettings.logo.alt || siteSettings.companyName,
  } : null

  return (
    <>
      <Navigation companyName={siteSettings.companyName} logo={logo} />

      <div className="page-header">
        <div className="container">
          <Breadcrumb items={[{ label: 'За нас' }]} />
          <h1>За нас</h1>
          <p className="page-subtitle">Дългогодишен опит и надеждни решения</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-intro">
              <h2>Джи Пи Инвест ЕООД</h2>
              <p className="lead">
                Българска фирма със седалище в София, която се специализира във фискални
                устройства и търговски системи.
              </p>
              <p>
                С дългогодишен опит в бранша, ние предлагаме професионални решения за
                вашия бизнес - от продажба и монтаж на касови апарати, до софтуерни
                решения за магазини, ресторанти и хотели.
              </p>
            </div>

            <div className="features-grid-about">
              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3>Дългогодишен опит</h3>
                <p>
                  Натрупан опит в продажбата, монтажа и поддръжката на фискални устройства
                  и търговски системи.
                </p>
              </div>

              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3>Надеждни решения</h3>
                <p>
                  Предлагаме само качествени и сертифицирани продукти от водещи производители
                  на пазара.
                </p>
              </div>

              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3>Бърза поддръжка</h3>
                <p>
                  Осигуряваме навременна техническа поддръжка и абонаментни услуги за
                  непрекъсната работа на вашия бизнес.
                </p>
              </div>

              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3>Обучение на персонал</h3>
                <p>
                  Предоставяме професионално обучение на вашия екип за работа с
                  фискалните устройства и софтуера.
                </p>
              </div>

              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3>Комплексни решения</h3>
                <p>
                  От малки магазини до големи търговски вериги - предлагаме решения,
                  адаптирани към вашите нужди.
                </p>
              </div>

              <div className="feature-card-about">
                <div className="feature-icon-about">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3>Съответствие с НАП</h3>
                <p>
                  Всички наши устройства и услуги отговарят на изискванията на българското
                  законодателство и НАП.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        companyName={siteSettings.companyName}
        logo={logo}
        tagline={siteSettings.tagline}
        email={siteSettings.email}
        phone={siteSettings.phone}
        address={siteSettings.address}
        facebook={siteSettings.facebook}
        instagram={siteSettings.instagram}
        linkedin={siteSettings.linkedin}
      />
    </>
  )
}
