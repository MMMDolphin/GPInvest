import type { CollectionConfig } from 'payload'

export const TrustBadges: CollectionConfig = {
  slug: 'trust-badges',
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
      label: 'Име на бадж',
      admin: {
        description: 'e.g., "Безплатна консултация", "Гаранция 12 месеца"',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      options: [
        { label: 'Гаранция', value: 'warranty' },
        { label: 'Безплатна услуга', value: 'free-service' },
        { label: 'Сервиз', value: 'service' },
        { label: 'Доставка', value: 'delivery' },
        { label: 'Друго', value: 'other' },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Икона',
      options: [
        { label: '✓ Чекмарк', value: 'check' },
        { label: '🛡️ Щит', value: 'shield' },
        { label: '🚚 Камион', value: 'truck' },
        { label: '⚙️ Настройки', value: 'settings' },
        { label: '📞 Телефон', value: 'phone' },
        { label: '⭐ Звезда', value: 'star' },
      ],
      defaultValue: 'check',
    },
  ],
}
