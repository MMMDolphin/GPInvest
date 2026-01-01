import type { GlobalConfig } from 'payload'
import { revalidateGlobalAfterChange } from '@/payload/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки на сайта',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobalAfterChange],
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
              type: 'textarea',
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
        {
          label: 'Валута',
          fields: [
            {
              name: 'eurToBgnRate',
              type: 'number',
              required: true,
              defaultValue: 1.95583,
              label: 'Курс EUR → BGN',
              admin: {
                description: 'Официален фиксиран курс за въвеждане на еврото: 1 EUR = 1.95583 BGN',
                step: 0.00001,
              },
            },
            {
              name: 'showBgnPrice',
              type: 'checkbox',
              defaultValue: true,
              label: 'Показвай цена в лева (BGN)',
              admin: {
                description: 'Преходен период: Двойно обозначаване на цените. Пример: 49,99 € (97,77 лв.)',
              },
            },
          ],
        },
      ],
    },
  ],
}
