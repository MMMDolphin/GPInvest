import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from '@/payload/hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
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
        { label: 'Cash Register', value: 'CashRegister' },
        { label: 'Shopping Cart', value: 'ShoppingCart' },
        { label: 'Laptop', value: 'Laptop' },
        { label: 'Wrench', value: 'Wrench' },
        { label: 'Package', value: 'Package' },
        { label: 'Smartphone', value: 'Smartphone' },
        { label: 'Monitor', value: 'Monitor' },
        { label: 'Printer', value: 'Printer' },
        { label: 'HardDrive', value: 'HardDrive' },
        { label: 'Scale', value: 'Scale' },
        { label: 'Barcode', value: 'Barcode' },
      ],
      admin: {
        description: 'Иконата се показва на началната страница',
      },
    },
  ],
}
