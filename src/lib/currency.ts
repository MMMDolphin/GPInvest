/**
 * Currency conversion and formatting utilities
 *
 * Преходен период (двойно обозначаване):
 * - Еврото е водещо
 * - Левът е в скоби с фиксирания курс 1 EUR = 1.95583 BGN
 * - Пример: 49,99 € (97,77 лв.)
 */

// Официален фиксиран курс за въвеждане на еврото в България
export const FIXED_EUR_BGN_RATE = 1.95583

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
 * Format number in European style (comma as decimal separator)
 */
function formatEuropeanNumber(amount: number): string {
  return amount.toFixed(2).replace('.', ',')
}

/**
 * Format price in EUR (European format: 49,99 €)
 */
export function formatEur(amount: number): string {
  return `${formatEuropeanNumber(amount)} €`
}

/**
 * Format price in BGN (European format: 97,77 лв.)
 */
export function formatBgn(amount: number): string {
  return `${formatEuropeanNumber(amount)} лв.`
}

/**
 * Format dual price display for transition period
 * Format: "49,99 € (97,77 лв.)"
 */
export function formatDualPrice(eurAmount: number, settings: CurrencySettings): string {
  if (eurAmount === 0) {
    return 'Получи оферта'
  }

  const eurFormatted = formatEur(eurAmount)

  if (settings.showBgnPrice) {
    const bgnAmount = eurToBgn(eurAmount, settings.eurToBgnRate)
    const bgnFormatted = formatBgn(bgnAmount)
    return `${eurFormatted} (${bgnFormatted})`
  }

  return eurFormatted
}

/**
 * Format price with both currencies if showBgn is enabled
 * Returns "Получи оферта" for products with price = 0
 */
export function formatPrice(
  eurAmount: number,
  settings: CurrencySettings
): { eur: string; bgn: string | null; bgnAmount: number | null; isQuoteOnly: boolean; dual: string } {
  // Handle "get a quote" products (price = 0)
  if (eurAmount === 0) {
    return {
      eur: 'Получи оферта',
      bgn: null,
      bgnAmount: null,
      isQuoteOnly: true,
      dual: 'Получи оферта',
    }
  }

  const eur = formatEur(eurAmount)

  if (settings.showBgnPrice) {
    const bgnAmount = eurToBgn(eurAmount, settings.eurToBgnRate)
    const bgn = formatBgn(bgnAmount)
    return {
      eur,
      bgn,
      bgnAmount,
      isQuoteOnly: false,
      dual: `${eur} (${bgn})`,
    }
  }

  return { eur, bgn: null, bgnAmount: null, isQuoteOnly: false, dual: eur }
}

/**
 * Get default currency settings (used as fallback)
 * Uses official fixed exchange rate for Euro adoption
 */
export function getDefaultCurrencySettings(): CurrencySettings {
  return {
    eurToBgnRate: FIXED_EUR_BGN_RATE,
    showBgnPrice: true,
  }
}
