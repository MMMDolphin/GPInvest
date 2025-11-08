import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './services.css'

export default async function ServicesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return (
    <>
      <Navigation companyName={siteSettings.companyName} />

      <div className="page-header">
        <div className="container">
          <h1>Услуги</h1>
          <p className="page-subtitle">Цялостни решения за вашия бизнес</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Продажби и доставки */}
          <div className="service-section">
            <h2 className="service-title">Продажби и доставки</h2>
            <p className="service-intro">
              Предлагаме широк спектър от фискални устройства, POS оборудване и софтуерни
              решения за всички видове търговски обекти.
            </p>

            <div className="services-grid">
              <div className="service-card">
                <h3>Фискални устройства и POS хардуер</h3>
                <ul>
                  <li>Касови апарати и фискални принтери</li>
                  <li>ФУВАС (фискални устройства за виртуални автоматични системи)</li>
                  <li>Електронни везни</li>
                  <li>Етикетни и POS принтери</li>
                  <li>Клиентски дисплеи</li>
                  <li>Касови чекмеджета</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>Баркод скенери и четци</h3>
                <ul>
                  <li>Баркод скенери - жични и безжични</li>
                  <li>Четци за магнитни карти</li>
                  <li>Четци за безконтактни карти</li>
                  <li>2D скенери</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>Търговско оборудване</h3>
                <ul>
                  <li>Стелажи и щендери</li>
                  <li>Касови модули</li>
                  <li>Колички и кошници</li>
                  <li>Торбички и опаковъчни материали</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>Видеонаблюдение</h3>
                <ul>
                  <li>IP камери</li>
                  <li>Видеорекордери (DVR/NVR)</li>
                  <li>Захранвания и UPS</li>
                  <li>Кабели и аксесоари</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>Търговски софтуер</h3>
                <ul>
                  <li>Mistral - софтуер за магазини</li>
                  <li>Zamboo - ресторантски софтуер</li>
                  <li>TIS КАРАТ - складово счетоводство</li>
                  <li>I-Cash - касов софтуер</li>
                </ul>
              </div>

              <div className="service-card">
                <h3>Консумативи</h3>
                <ul>
                  <li>Хартиени ролки за фискални устройства</li>
                  <li>Самозалепващи етикети</li>
                  <li>Рибони за принтери</li>
                  <li>Етикети за маркер-клещи</li>
                  <li>Касови ленти</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Абонаментна поддръжка */}
          <div className="service-section">
            <h2 className="service-title">Абонаментна поддръжка</h2>
            <p className="service-intro">
              Осигуряваме непрекъсната работа на вашите фискални устройства със специализирани
              абонаментни планове.
            </p>

            <div className="pricing-grid">
              <div className="pricing-card">
                <h3>12-месечен договор</h3>
                <div className="price">100 лв</div>
                <p className="price-note">при подписване в сервиза</p>
                <ul className="pricing-features">
                  <li>Редовна профилактика</li>
                  <li>Приоритетна поддръжка</li>
                  <li>Безплатни консултации</li>
                  <li>Отстъпки при ремонт</li>
                </ul>
                <p className="price-additional">
                  + Такса за поддръжка на връзка с НАП: 90 лв
                </p>
              </div>

              <div className="pricing-card">
                <h3>6-месечен договор</h3>
                <div className="price">60 лв</div>
                <p className="price-note">при подписване в сервиза</p>
                <ul className="pricing-features">
                  <li>Редовна профилактика</li>
                  <li>Техническа поддръжка</li>
                  <li>Консултации</li>
                </ul>
                <p className="price-additional">
                  + Такса за поддръжка на връзка с НАП: 45 лв
                </p>
              </div>

              <div className="pricing-card highlighted">
                <div className="badge">Популярен избор</div>
                <h3>Договор на адрес</h3>
                <div className="price">150 лв</div>
                <p className="price-note">включва посещение на място</p>
                <ul className="pricing-features">
                  <li>Обслужване на адрес на клиента</li>
                  <li>Кратко обучение на персонал</li>
                  <li>Програмиране на данни</li>
                  <li>Приоритетна поддръжка</li>
                </ul>
              </div>
            </div>

            <div className="service-note">
              <p>
                <strong>Активация на SIM карта:</strong> За свързване на устройството към НАП
                се заплаща еднократна такса за активация.
              </p>
            </div>
          </div>

          {/* Сервизни услуги */}
          <div className="service-section">
            <h2 className="service-title">Сервизни услуги</h2>

            <div className="services-columns">
              <div className="service-column">
                <h3>Услуги на място и в сервиза</h3>
                <ul>
                  <li>Общи сервизни услуги</li>
                  <li>Доставка и обучение</li>
                  <li>Програмиране на фирмени данни</li>
                  <li>Въвеждане на департаменти и артикули</li>
                  <li>Смяна на батерии</li>
                  <li>Издаване на дубликати на документи</li>
                  <li>Ремонт на компоненти</li>
                </ul>
              </div>

              <div className="service-column">
                <h3>Услуги само в сервиза</h3>
                <ul>
                  <li>Смяна на КЛЕН (контролна лента с ел. носител)</li>
                  <li>Смяна на фискална памет</li>
                  <li>Бракуване на касови апарати</li>
                  <li>Почистване и профилактика</li>
                  <li>Подмяна на фискални компоненти</li>
                  <li>Програмиране на лого</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Компютърни услуги */}
          <div className="service-section">
            <h2 className="service-title">Компютърни услуги</h2>

            <div className="services-grid">
              <div className="service-card">
                <h3>Монтаж и настройка</h3>
                <p>Инсталация и конфигурация на хардуер и софтуер</p>
              </div>

              <div className="service-card">
                <h3>Изграждане на мрежи</h3>
                <p>Проектиране и внедряване на компютърни мрежи</p>
              </div>

              <div className="service-card">
                <h3>Ремонт на техника</h3>
                <p>Гаранционен и следгаранционен ремонт</p>
              </div>

              <div className="service-card">
                <h3>Диагностика</h3>
                <p>Профилактика на компютри и лаптопи</p>
              </div>
            </div>
          </div>

          {/* Допълнителни услуги */}
          <div className="service-section">
            <h2 className="service-title">Допълнителни услуги</h2>

            <div className="additional-services">
              <div className="additional-service">
                <h3>Обучение на персонал</h3>
                <p>
                  Предоставяме професионално обучение за работа с фискални устройства,
                  търговски софтуер и POS системи.
                </p>
              </div>

              <div className="additional-service">
                <h3>Проектиране и интеграция</h3>
                <p>
                  Проектираме и изграждаме цялостни фискални системи, инсталираме и
                  поддържаме търговски софтуер, изграждаме системи за видеонаблюдение.
                </p>
              </div>

              <div className="additional-service">
                <h3>Консултации</h3>
                <p>
                  Експертни консултации относно избор на подходящо оборудване и софтуер
                  според спецификата на вашия бизнес.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer
        companyName={siteSettings.companyName}
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
