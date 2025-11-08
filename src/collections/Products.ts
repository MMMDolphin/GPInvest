import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'inStock'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Име на продукта',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: {
        description: 'URL-friendly version of the name',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Описание',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Кратко описание',
      admin: {
        description: 'Short description for product cards',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Категория',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Цена (лв)',
      min: 0,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Основно изображение',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Галерия',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Характеристики',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Характеристика',
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      label: 'Технически спецификации',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Име',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Стойност',
        },
      ],
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      label: 'В наличност',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Препоръчан продукт',
      admin: {
        description: 'Show on homepage',
      },
    },
  ],
}
