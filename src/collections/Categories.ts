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
