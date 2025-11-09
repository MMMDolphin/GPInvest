export interface LogoData {
  url: string
  alt?: string
}

type RawLogo = {
  url?: string | null
  alt?: string | null
} | null

const isLogoLike = (value: unknown): value is { url?: unknown; alt?: unknown } =>
  typeof value === 'object' && value !== null && 'url' in value

export const normalizeLogo = (
  logo: RawLogo | unknown,
  fallbackAlt?: string | null,
): LogoData | null => {
  if (!isLogoLike(logo)) {
    return null
  }

  const url = typeof logo.url === 'string' && logo.url.trim().length > 0 ? logo.url : null

  if (!url) {
    return null
  }

  const alt =
    typeof logo.alt === 'string' && logo.alt.trim().length > 0
      ? logo.alt
      : fallbackAlt || undefined

  return {
    url,
    ...(alt ? { alt } : {}),
  }
}
