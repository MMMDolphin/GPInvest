import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Име на категорията',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: {
        description: 'URL-friendly version of the name (e.g., "pos-systems")',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' && data?.name && !data?.slug) {
              // Auto-generate slug from name if not provided
              data.slug = data.name
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with dashes
                .replace(/-+/g, '-') // Replace multiple dashes with single dash
                .trim()
            }
            return data
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Икона',
      options: [
        { label: 'Касов апарат', value: 'cash-register' },
        { label: 'Фискален принтер', value: 'printer' },
        { label: 'POS терминал', value: 'pos-terminal' },
        { label: 'Софтуер', value: 'software' },
        { label: 'Аксесоари', value: 'accessories' },
      ],
    },
  ],
}
