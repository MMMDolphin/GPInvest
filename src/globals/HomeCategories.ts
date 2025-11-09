import type { GlobalConfig } from 'payload'

export const HomeCategories: GlobalConfig = {
  slug: 'home-categories',
  label: 'Homepage Categories',
  admin: {
    description: 'Manage the categories section displayed on the homepage',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show Categories Section',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide the categories section on homepage',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Категории продукти',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
      defaultValue: 'Разгледайте нашата богата гама от POS решения и оборудване',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      minRows: 2,
      maxRows: 6,
      admin: {
        description: 'Add up to 6 product categories to display on the homepage',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Category Name',
          required: true,
          admin: {
            description: 'e.g., "Фискални устройства"',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          admin: {
            description: 'Short description of the category',
          },
        },
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          options: [
            { label: 'Shopping Cart (Касов апарат)', value: 'ShoppingCart' },
            { label: 'Laptop (Компютър)', value: 'Laptop' },
            { label: 'Wrench (Инструменти)', value: 'Wrench' },
            { label: 'Package (Пакет)', value: 'Package' },
            { label: 'Smartphone (Телефон)', value: 'Smartphone' },
            { label: 'Monitor (Монитор)', value: 'Monitor' },
            { label: 'Printer (Принтер)', value: 'Printer' },
            { label: 'Hard Drive (Диск)', value: 'HardDrive' },
            { label: 'Scale (Везна)', value: 'Scale' },
            { label: 'Barcode (Баркод)', value: 'Barcode' },
          ],
          admin: {
            description: 'Select an icon for this category',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
          required: true,
          admin: {
            description: 'e.g., "/products?category=fiscal-devices" or "/products"',
          },
        },
      ],
    },
  ],
}
