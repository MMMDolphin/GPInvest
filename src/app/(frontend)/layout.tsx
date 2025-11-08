import React from 'react'
import { Montserrat } from 'next/font/google'
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

  return (
    <html lang="bg">
      <body className={montserrat.className}>
        <main>{children}</main>
      </body>
    </html>
  )
}
