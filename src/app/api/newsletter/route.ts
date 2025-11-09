import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Моля, въведете валиден имейл адрес' },
        { status: 400 }
      )
    }

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'email-newsletter',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (existing.docs.length > 0) {
      // Check if they're already subscribed
      const existingDoc = existing.docs[0]
      if (existingDoc.status === 'subscribed') {
        return NextResponse.json(
          { error: 'Този имейл адрес вече е абониран' },
          { status: 409 }
        )
      } else {
        // Resubscribe if previously unsubscribed
        await payload.update({
          collection: 'email-newsletter',
          id: existingDoc.id,
          data: {
            status: 'subscribed',
            subscribedAt: new Date().toISOString(),
          },
        })
        return NextResponse.json({
          success: true,
          message: 'Благодарим ви! Успешно се абонирахте за нашия бюлетин.',
        })
      }
    }

    // Create new subscription
    await payload.create({
      collection: 'email-newsletter',
      data: {
        email,
        status: 'subscribed',
        subscribedAt: new Date().toISOString(),
        source: 'website',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Благодарим ви! Успешно се абонирахте за нашия бюлетин.',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Възникна грешка. Моля, опитайте отново.' },
      { status: 500 }
    )
  }
}
