import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

type Payload = {
  paths: string[]
}

const sanitizePaths = (paths: unknown): string[] => {
  if (!Array.isArray(paths)) return []
  const set = new Set<string>()
  paths.forEach((path) => {
    if (typeof path !== 'string' || !path.trim()) return
    const normalized = path.startsWith('/') ? path : `/${path}`
    set.add(normalized)
  })
  return Array.from(set)
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  const configuredSecret = process.env.REVALIDATE_SECRET

  if (!configuredSecret || secret !== configuredSecret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: Payload | null = null

  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const paths = sanitizePaths(body?.paths)

  if (!paths.length) {
    return NextResponse.json({ message: 'No paths to revalidate' }, { status: 400 })
  }

  paths.forEach((path) => revalidatePath(path))

  return NextResponse.json({ revalidated: paths })
}
