import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.fullName?.trim()) {
      return NextResponse.json(
        { error: 'Моля, въведете вашите имена' },
        { status: 400 }
      )
    }

    if (!data.company?.trim()) {
      return NextResponse.json(
        { error: 'Моля, въведете име на фирмата' },
        { status: 400 }
      )
    }

    if (!data.phone?.trim()) {
      return NextResponse.json(
        { error: 'Моля, въведете телефонен номер' },
        { status: 400 }
      )
    }

    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Моля, въведете валиден имейл адрес' },
        { status: 400 }
      )
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Create order in Payload
    await payload.create({
      collection: 'orders',
      data: {
        fullName: data.fullName.trim(),
        company: data.company.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        product: data.product?.trim() || null,
        productUrl: data.productUrl?.trim() || null,
        additionalInfo: data.additionalInfo?.trim() || null,
        status: 'new',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Благодарим ви за запитването! Ще се свържем с вас скоро.',
    })
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json(
      { error: 'Възникна грешка при изпращането. Моля, опитайте отново.' },
      { status: 500 }
    )
  }
}
