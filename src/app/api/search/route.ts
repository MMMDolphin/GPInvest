import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim()

    if (!query || query.length < 2) {
      return NextResponse.json({ products: [] })
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Search products by name
    const productsData = await payload.find({
      collection: 'products',
      limit: 8,
      where: {
        or: [
          {
            name: {
              contains: query,
            },
          },
          {
            shortDescription: {
              contains: query,
            },
          },
        ],
      },
    })

    const products = productsData.docs.map((product: any) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: typeof product.image === 'object' ? product.image.url : null,
    }))

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ products: [], error: 'Search failed' }, { status: 500 })
  }
}
