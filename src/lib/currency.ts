/**
 * Currency conversion and formatting utilities
 */

export interface CurrencySettings {
  eurToBgnRate: number
  showBgnPrice: boolean
}

/**
 * Convert EUR to BGN
 */
export function eurToBgn(eurAmount: number, rate: number): number {
  return eurAmount * rate
}

/**
 * Format price in EUR
 */
export function formatEur(amount: number): string {
  return `${amount.toFixed(2)} EUR`
}

/**
 * Format price in BGN
 */
export function formatBgn(amount: number): string {
  return `${amount.toFixed(2)} лв`
}

/**
 * Format price with both currencies if showBgn is enabled
 * Returns "Получи оферта" for products with price = 0
 */
export function formatPrice(
  eurAmount: number,
  settings: CurrencySettings
): { eur: string; bgn: string | null; bgnAmount: number | null; isQuoteOnly: boolean } {
  // Handle "get a quote" products (price = 0)
  if (eurAmount === 0) {
    return {
      eur: 'Получи оферта',
      bgn: null,
      bgnAmount: null,
      isQuoteOnly: true,
    }
  }

  const eur = formatEur(eurAmount)

  if (settings.showBgnPrice) {
    const bgnAmount = eurToBgn(eurAmount, settings.eurToBgnRate)
    return {
      eur,
      bgn: formatBgn(bgnAmount),
      bgnAmount,
      isQuoteOnly: false,
    }
  }

  return { eur, bgn: null, bgnAmount: null, isQuoteOnly: false }
}

/**
 * Get default currency settings (used as fallback)
 */
export function getDefaultCurrencySettings(): CurrencySettings {
  return {
    eurToBgnRate: 1.96,
    showBgnPrice: true,
  }
}
