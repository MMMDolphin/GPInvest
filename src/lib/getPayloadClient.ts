import { cache } from 'react'
import { getPayload } from 'payload'
import payloadConfigPromise from '@/payload.config'

export const getPayloadClient = cache(async () => {
  const payloadConfig = await payloadConfigPromise
  return getPayload({ config: payloadConfig })
})
