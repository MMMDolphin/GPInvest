import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/payload/hooks/revalidate'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'inStock'],
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
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      label: 'Марка / Производител',
      admin: {
        description: 'Select brand from the list (e.g., Datecs, Tremol)',
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
      label: 'Цена (EUR с ДДС)',
      min: 0,
      admin: {
        description: 'Въведете цената в евро. Цената в лева се изчислява автоматично.',
        step: 0.01,
      },
    },
    {
      name: 'customVat',
      type: 'checkbox',
      defaultValue: false,
      label: 'Различно ДДС',
      admin: {
        description: 'Включете ако продуктът има различна ДДС ставка от стандартните 20%',
      },
    },
    {
      name: 'vatRate',
      type: 'number',
      label: 'ДДС ставка (%)',
      min: 0,
      max: 100,
      admin: {
        description: 'Въведете ДДС ставка (стандартна е 20%)',
        condition: (data) => data?.customVat === true,
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
      type: 'relationship',
      relationTo: 'certifications',
      hasMany: true,
      label: 'Сертификати',
      admin: {
        description: 'Select certifications from the global list',
      },
    },
    {
      name: 'trustBadges',
      type: 'relationship',
      relationTo: 'trust-badges',
      hasMany: true,
      label: 'Доверителни бадж-ове',
      admin: {
        description: 'Select trust badges from the global list',
      },
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
      name: 'specificationFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Файл със спецификация (PDF)',
      admin: {
        description: 'PDF file with technical specifications for download',
      },
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
