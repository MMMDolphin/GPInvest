import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Navigation from '@/components/Navigation'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import { normalizeLogo } from '@/lib/normalizeLogo'
import './services.css'

export default async function ServicesPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const logo = normalizeLogo(siteSettings.logo, siteSettings.companyName)

  return (
    <>
      <Navigation companyName={siteSettings.companyName} logo={logo} />

      <div className="page-header">
        <div className="container">
          <Breadcrumb items={[{ label: 'Услуги' }]} />
          <h1>Услуги</h1>
          <p className="page-subtitle">Цялостни решения за вашия бизнес</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Table of Contents */}
          <div className="toc-section">
            <h2 className="toc-title">Съдържание</h2>
            <ol className="toc-list">
              <li><a href="#prodajbi-dostavki">Продажби и доставки</a></li>
              <li><a href="#abonamentno-obsluzhvane">Абонаментно обслужване (сервиз на фискални устройства)</a></li>
              <li><a href="#servizni-uslugi">Сервизни услуги</a></li>
              <li><a href="#kompyutarni-uslugi">Компютърни услуги</a></li>
              <li><a href="#dopalnitelni-uslugi">Допълнителни услуги</a></li>
            </ol>
          </div>

          {/* Продажби и доставки */}
          <div id="prodajbi-dostavki" className="service-section">
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
          <div id="abonamentno-obsluzhvane" className="service-section">
            <h2 className="service-title">💼 Абонаментно обслужване (сервиз на фискални устройства)</h2>
            <p className="service-intro">
              Осигуряваме непрекъсната работа на вашите фискални устройства със специализирани
              абонаментни планове и професионално обслужване.
            </p>

            {/* Subscription Services Table */}
            <div className="pricing-table-container">
              <h3 className="table-section-title">1.1. В сервиза:</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="table-cell">Услуга</div>
                  <div className="table-cell">Цена (лв. с ДДС)</div>
                  <div className="table-cell">Цена (€)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Договор за абонаментно обслужване (12 м.) + такса НАП (12 м.)</div>
                  <div className="table-cell price-cell">190.00 лв.</div>
                  <div className="table-cell">97.15 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Договор за абонаментно обслужване (6 м.) + такса НАП (6 м.)</div>
                  <div className="table-cell price-cell">150.00 лв.</div>
                  <div className="table-cell">76.69 €</div>
                </div>
              </div>

              <h3 className="table-section-title">1.2. На адрес на клиента (гр. София):</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="table-cell">Услуга</div>
                  <div className="table-cell">Цена (лв. с ДДС)</div>
                  <div className="table-cell">Цена (€)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">12 месеца + НАП + посещение</div>
                  <div className="table-cell price-cell">214.00 лв.</div>
                  <div className="table-cell">109.42 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">6 месеца + НАП + посещение</div>
                  <div className="table-cell price-cell">174.00 лв.</div>
                  <div className="table-cell">88.96 €</div>
                </div>
              </div>

              <h3 className="table-section-title">1.3. Такси поддръжка връзка с НАП:</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="table-cell">Услуга</div>
                  <div className="table-cell">Цена (лв. с ДДС)</div>
                  <div className="table-cell">Цена (€)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">За 12 месеца</div>
                  <div className="table-cell price-cell">90.00 лв.</div>
                  <div className="table-cell">45.96 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">За 6 месеца</div>
                  <div className="table-cell price-cell">70.00 лв.</div>
                  <div className="table-cell">36.81 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Активация на SIM карта</div>
                  <div className="table-cell price-cell">18.00 лв.</div>
                  <div className="table-cell">9.20 €</div>
                </div>
              </div>
            </div>
          </div>

          {/* Сервизни услуги */}
          <div id="servizni-uslugi" className="service-section">
            <h2 className="service-title">🛠️ Сервизни услуги</h2>

            <div className="pricing-table-container">
              <h3 className="table-section-title">2.1. В сервиза или на адрес на клиента</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="table-cell">Услуга</div>
                  <div className="table-cell">Цена (лв.)</div>
                  <div className="table-cell">Цена (€)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Посещение на адрес (гр. София, до 50 км)</div>
                  <div className="table-cell price-cell">24.00</div>
                  <div className="table-cell">12.27 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Посещение извън София</div>
                  <div className="table-cell price-cell">По договаряне</div>
                  <div className="table-cell">—</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Доставка и кратко обучение (гр. София)</div>
                  <div className="table-cell price-cell">60.00</div>
                  <div className="table-cell">30.68 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Общи услуги (до 30 мин.)</div>
                  <div className="table-cell price-cell">36.00</div>
                  <div className="table-cell">18.41 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Програмиране на клише / име / адрес</div>
                  <div className="table-cell price-cell">24.00</div>
                  <div className="table-cell">12.27 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Програмиране на ДДС номер</div>
                  <div className="table-cell price-cell">24.00</div>
                  <div className="table-cell">12.27 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Програмиране на департамент (до 50 бр.)</div>
                  <div className="table-cell price-cell">30.00</div>
                  <div className="table-cell">15.34 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Програмиране на артикули (до 15 бр.)</div>
                  <div className="table-cell price-cell">36.00</div>
                  <div className="table-cell">18.41 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Всеки следващ артикул</div>
                  <div className="table-cell price-cell">1.00/бр.</div>
                  <div className="table-cell">0.51 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Подмяна на батерии (без комплект)</div>
                  <div className="table-cell price-cell">24.00</div>
                  <div className="table-cell">12.27 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Дубликат на документи</div>
                  <div className="table-cell price-cell">36.00</div>
                  <div className="table-cell">18.41 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Дубликат на паспорт</div>
                  <div className="table-cell price-cell">36.00</div>
                  <div className="table-cell">18.41 €</div>
                </div>
              </div>

              <h3 className="table-section-title">2.2. Само в сервиза</h3>
              <div className="pricing-table">
                <div className="table-header">
                  <div className="table-cell">Услуга</div>
                  <div className="table-cell">Цена (лв.)</div>
                  <div className="table-cell">Цена (€)</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Смяна на КЛЕН</div>
                  <div className="table-cell price-cell">72.00</div>
                  <div className="table-cell">36.81 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Смяна на фискална памет – касов апарат</div>
                  <div className="table-cell price-cell">180.00</div>
                  <div className="table-cell">92.03 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Смяна на фискална памет – фискален принтер</div>
                  <div className="table-cell price-cell">240.00</div>
                  <div className="table-cell">122.71 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Бракуване на касов апарат</div>
                  <div className="table-cell price-cell">120.00</div>
                  <div className="table-cell">61.44 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Почистване (замърсен апарат)</div>
                  <div className="table-cell price-cell">48.00</div>
                  <div className="table-cell">24.54 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Подмяна на компонент (без части)</div>
                  <div className="table-cell price-cell">48.00</div>
                  <div className="table-cell">24.54 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Програмиране на лого (PNG, max 320×120 px)</div>
                  <div className="table-cell price-cell">48.00</div>
                  <div className="table-cell">24.54 €</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Други ремонти</div>
                  <div className="table-cell price-cell">По запитване</div>
                  <div className="table-cell">—</div>
                </div>
              </div>
            </div>
          </div>

          {/* Компютърни услуги */}
          <div id="kompyutarni-uslugi" className="service-section">
            <h2 className="service-title">💻 Компютърни услуги</h2>

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
          <div id="dopalnitelni-uslugi" className="service-section">
            <h2 className="service-title">🎓 Допълнителни услуги</h2>

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
