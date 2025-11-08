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
      name: 'brand',
      type: 'text',
      required: true,
      label: 'Марка / Производител',
      admin: {
        description: 'Brand or manufacturer name (e.g., Datecs, Tremol)',
      },
    },
    {
      name: 'model',
      type: 'text',
      label: 'Модел',
      admin: {
        description: 'Product model number (e.g., Daisy Compact S 01)',
      },
    },
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
      label: 'Цена (лв с ДДС)',
      min: 0,
    },
    {
      name: 'vatRate',
      type: 'number',
      label: 'ДДС (%)',
      defaultValue: 20,
      min: 0,
      max: 100,
      admin: {
        description: 'VAT rate percentage (default 20%)',
      },
    },
    {
      name: 'warrantyMonths',
      type: 'number',
      label: 'Гаранция (месеци)',
      defaultValue: 12,
      min: 0,
      admin: {
        description: 'Warranty period in months',
      },
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
      name: 'highlights',
      type: 'array',
      label: 'Ключови предимства (3-5)',
      maxRows: 5,
      admin: {
        description: 'Short bullet points highlighting key product benefits',
      },
      fields: [
        {
          name: 'highlight',
          type: 'text',
          required: true,
          label: 'Предимство',
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
      name: 'includedServices',
      type: 'array',
      label: 'Включени услуги',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
          label: 'Услуга',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Сертификати',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Име на сертификат',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение на сертификат',
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      label: 'Доверителни бадж-ове',
      maxRows: 5,
      admin: {
        description: 'Trust indicators (e.g., "Безплатна консултация", "Гаранция 12 месеца")',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          required: true,
          label: 'Бадж',
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
