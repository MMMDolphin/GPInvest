import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Име на сертификат',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'CE', value: 'ce' },
        { label: 'ISO', value: 'iso' },
        { label: 'НАП одобрение', value: 'nap' },
        { label: 'Друго', value: 'other' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение на сертификат',
    },
  ],
}
