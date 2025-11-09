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
      name: 'showOnHomepage',
      type: 'checkbox',
      label: 'Покажи на начална страница',
      defaultValue: false,
      admin: {
        description: 'Тази категория ще се показва в секцията с категории на началната страница',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Икона (за начална страница)',
      required: false,
      options: [
        { label: 'Shopping Cart (Касов апарат)', value: 'ShoppingCart' },
        { label: 'Laptop (Компютър)', value: 'Laptop' },
        { label: 'Wrench (Инструменти)', value: 'Wrench' },
        { label: 'Package (Пакет)', value: 'Package' },
        { label: 'Smartphone (Телефон)', value: 'Smartphone' },
        { label: 'Monitor (Монитор)', value: 'Monitor' },
        { label: 'Printer (Принтер)', value: 'Printer' },
        { label: 'HardDrive (Диск)', value: 'HardDrive' },
        { label: 'Scale (Везна)', value: 'Scale' },
        { label: 'Barcode (Баркод)', value: 'Barcode' },
      ],
      admin: {
        description: 'Изберете икона, която ще се показва на началната страница (ако е активирана)',
        condition: (data) => data.showOnHomepage === true,
      },
    },
    {
      name: 'homepageOrder',
      type: 'number',
      label: 'Ред на начална страница',
      defaultValue: 0,
      admin: {
        description: 'По-нисък номер = по-отгоре. (0, 1, 2, 3...)',
        condition: (data) => data.showOnHomepage === true,
      },
    },
  ],
}
