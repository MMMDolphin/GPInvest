import type { CollectionConfig } from 'payload'

export const EmailNewsletter: CollectionConfig = {
  slug: 'email-newsletter',
  labels: {
    singular: 'Email Newsletter',
    plural: 'Email Newsletter',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'subscribedAt', 'status'],
    description: 'Newsletter email subscriptions',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
      admin: {
        description: 'Subscriber email address',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      options: [
        {
          label: 'Subscribed',
          value: 'subscribed',
        },
        {
          label: 'Unsubscribed',
          value: 'unsubscribed',
        },
      ],
      admin: {
        description: 'Subscription status',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      label: 'Subscribed At',
      admin: {
        description: 'Date and time of subscription',
        date: {
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'website',
      admin: {
        description: 'Where the subscription came from',
      },
    },
  ],
}
