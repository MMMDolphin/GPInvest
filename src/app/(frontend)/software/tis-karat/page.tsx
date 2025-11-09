import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import '../software.css'

export default async function TISKaratPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const categoriesData = await payload.find({
    collection: 'categories',
    limit: 50,
  })

  const categories = categoriesData.docs.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
  }))

  const logo = siteSettings.logo && typeof siteSettings.logo === 'object' ? {
    url: siteSettings.logo.url,
    alt: siteSettings.logo.alt || siteSettings.companyName,
  } : null

  return (
    <>
      <Navigation companyName={siteSettings.companyName} logo={logo} categories={categories} />

      <div className="software-detail-hero">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Търговски Софтуер', href: '/software' },
              { label: 'ТИС Карат' }
            ]}
          />
          <h1>ТИС Карат</h1>
          <p className="lead">
            Търговска информационна система за автоматизирано управление на продажби, складови наличности и парични потоци
          </p>
        </div>
      </div>

      <div className="software-content">
        <div className="container">
          <div className="software-content-section">
            <h2>Общо описание</h2>
            <p>
              ТИС Карат е търговска информационна система, предназначена за автоматизирано управление на продажбите,
              складовите наличности и паричните потоци в търговски обекти. Тя е разработена от българската компания
              Карат Сервиз и е регистрирана в НАП, отговаряйки на изискванията на Наредба Н-18 за софтуер за
              управление на продажбите в търговските обекти (СУПТО).
            </p>
          </div>

          <div className="software-content-section">
            <h2>Основни модули</h2>

            <h3>Модул Back Office</h3>
            <p>
              Основен модул за управление на цялата бизнес дейност, включващ:
            </p>
            <ul>
              <li>Управление на номенклатури и артикули</li>
              <li>Складови операции</li>
              <li>Финансови справки и отчети</li>
              <li>Настройки на системата</li>
              <li>Управление на потребители и права за достъп</li>
            </ul>

            <h3>Модул POS</h3>
            <p>
              Реализира пълна функционалност за продажби в POS режим:
            </p>
            <ul>
              <li>Бързо и лесно обслужване на клиенти</li>
              <li>Поддръжка на различни видове плащания</li>
              <li>Интеграция с фискални устройства</li>
              <li>Управление на отстъпки и промоции</li>
              <li>Печат на фискални бонове</li>
            </ul>
          </div>

          <div className="software-content-section">
            <h2>Ключови функционалности</h2>

            <h3>Многоскладова поддръжка</h3>
            <p>
              Възможност за работа с един или повече складове, с възможност за трансфери между тях. Идеално решение
              за компании с множество търговски обекти или складове на различни локации.
            </p>

            <h3>Поддръжка на TouchScreen</h3>
            <p>
              Системата е оптимизирана за работа със сензорни екрани, което я прави особено подходяща за заведения
              за обществено хранене, барове и ресторанти.
            </p>

            <h3>Интеграция с фискални устройства</h3>
            <p>
              Поддържа всички фискални устройства, сертифицирани от НАП, включително тези на:
            </p>
            <ul>
              <li>Datecs</li>
              <li>Daisy</li>
              <li>Tremol</li>
              <li>ZIT</li>
              <li>ISL</li>
              <li>Incotex</li>
              <li>И други производители</li>
            </ul>
          </div>

          <div className="software-content-section">
            <h2>Допълнителни модули</h2>
            <p>
              Възможност за добавяне на допълнителни модули за специализирани функции:
            </p>
            <ul>
              <li><strong>Зареждане на везни:</strong> Автоматично зареждане на артикули и цени във везни</li>
              <li><strong>Фискален спулер:</strong> Управление на опашка от фискални документи</li>
              <li><strong>Производство:</strong> Управление на производствени процеси и рецепти</li>
              <li><strong>Серийни/Партидни номера:</strong> Проследяване на артикули по партиди и серийни номера</li>
              <li><strong>Разширени отстъпки:</strong> Гъвкава система за отстъпки и промоции</li>
              <li><strong>Happy Hour:</strong> Специални цени за определени часове</li>
              <li><strong>Collector:</strong> Събиране на данни от отдалечени обекти</li>
              <li><strong>Отдалечен достъп:</strong> Управление на системата от разстояние</li>
            </ul>
          </div>

          <div className="software-content-section">
            <h2>Подходящи обекти</h2>
            <p>
              ТИС Карат е подходяща за разнообразни търговски обекти:
            </p>
            <ul>
              <li>Магазини за хранителни стоки</li>
              <li>Магазини за промишлени стоки</li>
              <li>Павилиони и киоски</li>
              <li>Складове</li>
              <li>Ресторанти и заведения за бързо хранене</li>
              <li>Офиси</li>
              <li>Цехове за производство</li>
              <li>Разносна търговия</li>
            </ul>
          </div>

          <div className="software-content-section">
            <h2>Предимства</h2>
            <p>
              Системата предлага гъвкавост и мащабируемост, което я прави подходяща както за малки, така и за
              големи търговски обекти. Съответствието с изискванията на НАП гарантира законосъобразност и
              сигурност при работа.
            </p>
          </div>

          <div className="software-content-section">
            <div style={{ textAlign: 'center' }}>
              <h2>Заинтересовани ли сте?</h2>
              <p style={{ marginBottom: 'var(--spacing-xl)' }}>
                Свържете се с нас за демонстрация и персонализирана оферта
              </p>
              <Link href="/contact" className="btn-primary-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <Phone size={20} />
                <span>Свържете се с нас</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
