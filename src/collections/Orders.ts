import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'company', 'phone', 'product', 'status', 'createdAt'],
    group: 'Поръчки',
    description: 'Запитвания и поръчки от клиенти',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Име на клиента',
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      label: 'Фирма',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Имейл',
    },
    {
      name: 'product',
      type: 'text',
      label: 'Продукт',
      admin: {
        description: 'Продукт, за който е направено запитването',
      },
    },
    {
      name: 'productUrl',
      type: 'text',
      label: 'URL на продукта',
      admin: {
        description: 'Линк към продукта',
      },
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Допълнителна информация',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Статус',
      options: [
        { label: 'Ново', value: 'new' },
        { label: 'В обработка', value: 'processing' },
        { label: 'Свързахме се', value: 'contacted' },
        { label: 'Завършено', value: 'completed' },
        { label: 'Отказано', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Вътрешни бележки',
      admin: {
        description: 'Бележки за вътрешно ползване (не се показват на клиента)',
        position: 'sidebar',
      },
    },
  ],
}
