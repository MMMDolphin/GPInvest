import React from 'react'
import { Montserrat } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { fetchSiteData } from '@/lib/getSiteData'
import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  description: 'GP Invest - Вашият надежден партньор за касови апарати, фискални принтери, POS терминали и софтуер за търговия.',
  title: 'GP Invest - Касови апарати, POS системи и софтуер за търговия',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { siteSettings, categories, logo } = await fetchSiteData()

  return (
    <html lang="bg">
      <body className={montserrat.className}>
        <Navigation companyName={siteSettings.companyName} logo={logo} categories={categories} />
        <main>{children}</main>
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
      </body>
    </html>
  )
}
