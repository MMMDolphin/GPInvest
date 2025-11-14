import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/payload/hooks/revalidate'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'active'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
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
      admin: {
        description: 'Full-width background image for the slide',
      },
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Продуктово изображение',
      admin: {
        description: 'Product image displayed on the right side of the slide',
      },
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
