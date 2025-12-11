import type { Category, SiteSetting } from '@/payload-types'
import { normalizeLogo, type LogoData } from './normalizeLogo'
import { getPayloadClient } from './getPayloadClient'
import { type CurrencySettings, getDefaultCurrencySettings } from './currency'

export type SiteCategory = {
  id: string
  name: string
  slug: string
  description?: string
}

export interface SiteData {
  siteSettings: SiteSetting
  categories: SiteCategory[]
  logo: LogoData | null
  currencySettings: CurrencySettings
}

export const fetchSiteData = async (): Promise<SiteData> => {
  const payload = await getPayloadClient()

  const [siteSettings, categoriesResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }) as Promise<SiteSetting>,
    payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'name',
    }) as Promise<{ docs: Category[] }>,
  ])

  const categories: SiteCategory[] = categoriesResult.docs.map((category) => ({
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    description: category.description ?? undefined,
  }))

  // Get currency settings from site settings with fallback to defaults
  const defaultCurrency = getDefaultCurrencySettings()
  const currencySettings: CurrencySettings = {
    eurToBgnRate: siteSettings.eurToBgnRate ?? defaultCurrency.eurToBgnRate,
    showBgnPrice: siteSettings.showBgnPrice ?? defaultCurrency.showBgnPrice,
  }

  return {
    siteSettings,
    categories,
    logo: normalizeLogo(siteSettings.logo, siteSettings.companyName),
    currencySettings,
  }
}
