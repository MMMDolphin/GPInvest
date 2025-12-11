import type { CollectionConfig } from 'payload'
import { convertToWebp } from '@/payload/hooks/convertToWebp'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [convertToWebp],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
