import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заглавие',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаглавие',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Текст на бутона',
      defaultValue: 'Разгледай продукта',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Линк на бутона',
      admin: {
        description: 'URL to redirect when button is clicked',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Фоново изображение',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
      label: 'Ред',
      admin: {
        description: 'Order in the carousel (1, 2, 3...)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активен',
    },
  ],
}
