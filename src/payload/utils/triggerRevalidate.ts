const DEFAULT_PATHS = ['/']

const sanitizePaths = (paths: string[]) => {
  const unique = new Set<string>()
  paths.forEach((rawPath) => {
    if (!rawPath) return
    const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`
    unique.add(normalized)
  })
  return Array.from(unique)
}

export const triggerRevalidate = async (paths: string[] = DEFAULT_PATHS) => {
  const secret = process.env.REVALIDATE_SECRET
  const endpoint = process.env.REVALIDATE_URL || process.env.NEXT_PUBLIC_SITE_URL

  if (!secret || !endpoint) {
    console.warn('Skipping revalidation: missing REVALIDATE_SECRET or endpoint')
    return
  }

  const sanitized = sanitizePaths(paths)
  if (!sanitized.length) {
    return
  }

  try {
    const res = await fetch(`${endpoint.replace(/\/$/, '')}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ paths: sanitized }),
    })

    if (!res.ok) {
      console.error('Failed to trigger revalidation', await res.text())
    }
  } catch (error) {
    console.error('Error sending revalidation request', error)
  }
}
