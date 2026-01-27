import React from 'react'
import { Montserrat } from 'next/font/google'
import { Metadata, Viewport } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { fetchSiteData } from '@/lib/getSiteData'
import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://gpinvest.bg'),
  title: {
    default: 'GP Invest - Касови апарати, POS системи и софтуер за търговия',
    template: '%s | GP Invest',
  },
  description: 'GP Invest - Вашият надежден партньор за касови апарати, фискални принтери, POS терминали и софтуер за търговия. Професионални решения за Вашия бизнес.',
  keywords: ['касови апарати', 'фискални принтери', 'POS системи', 'софтуер за търговия', 'търговски софтуер', 'Мистрал V3', 'Zamboo', 'ТИС Карат', 'България'],
  authors: [{ name: 'GP Invest' }],
  creator: 'GP Invest',
  publisher: 'GP Invest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://gpinvest.bg',
    siteName: 'GP Invest',
    title: 'GP Invest - Касови апарати, POS системи и софтуер за търговия',
    description: 'GP Invest - Вашият надежден партньор за касови апарати, фискални принтери, POS терминали и софтуер за търговия.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1536,
        height: 1024,
        alt: 'GP Invest - Професионални решения за търговия',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GP Invest - Касови апарати, POS системи и софтуер за търговия',
    description: 'GP Invest - Вашият надежден партньор за касови апарати, фискални принтери, POS терминали и софтуер за търговия.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { siteSettings, categories, logo } = await fetchSiteData()

  return (
    <html lang="bg">
      <body className={montserrat.className}>
        <a href="#main-content" className="skip-to-content">
          Премини към съдържанието
        </a>
        <Navigation companyName={siteSettings.companyName} logo={logo} />
        <main id="main-content">{children}</main>
        <Footer
          companyName={siteSettings.companyName}
          logo={logo}
          tagline={siteSettings.tagline}
          email={siteSettings.email}
          phone={siteSettings.phone}
          address={siteSettings.address}
          workingHours={siteSettings.workingHours}
          facebook={siteSettings.facebook}
          instagram={siteSettings.instagram}
          linkedin={siteSettings.linkedin}
          remoteAssistanceUrl={siteSettings.remoteAssistanceUrl}
          remoteAssistanceLabel={siteSettings.remoteAssistanceLabel}
          remoteAssistanceIcon={siteSettings.remoteAssistanceIcon}
        />
        <CookieConsent />
      </body>
    </html>
  )
}
