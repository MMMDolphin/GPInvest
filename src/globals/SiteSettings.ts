import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки на сайта',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основна информация',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              required: true,
              defaultValue: 'GP Invest',
              label: 'Име на компанията',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Слоган',
              defaultValue: 'Вашият надежден партньор за POS решения',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Описание',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Лого',
            },
          ],
        },
        {
          label: 'Контакти',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Имейл',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Телефон',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Адрес',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Работно време',
            },
          ],
        },
        {
          label: 'Социални мрежи',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook URL',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram URL',
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn URL',
            },
          ],
        },
      ],
    },
  ],
}
