import { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // Create Categories
  payload.logger.info('Creating categories...')

  const categoryFiscalDevices = await payload.create({
    collection: 'categories',
    data: {
      name: 'Касови апарати и фискални устройства',
      slug: 'kasovi-aparati-fiskalni-ustroistva',
      description: 'Фискални касови апарати, фискални принтери и ФУВАС',
      icon: 'cash-register',
    },
  })

  const categoryPOSHardware = await payload.create({
    collection: 'categories',
    data: {
      name: 'POS оборудване',
      slug: 'pos-oborudvane',
      description: 'Електронни везни, етикетни и POS принтери, клиентски дисплеи, касови чекмеджета',
      icon: 'pos-terminal',
    },
  })

  const categorySoftware = await payload.create({
    collection: 'categories',
    data: {
      name: 'Търговски софтуер',
      slug: 'targovski-softuer',
      description: 'Софтуер за управление на продажби и складови наличности',
      icon: 'software',
    },
  })

  const categoryAccessories = await payload.create({
    collection: 'categories',
    data: {
      name: 'Баркод скенери и четци',
      slug: 'barkod-skeneri-chetci',
      description: 'Баркод скенери и четци за магнитни/безконтактни карти',
      icon: 'accessories',
    },
  })

  const categoryConsumables = await payload.create({
    collection: 'categories',
    data: {
      name: 'Консумативи',
      slug: 'konsumativti',
      description: 'Хартиени ролки, самозалепващи етикети, рибони и други консумативи',
      icon: 'accessories',
    },
  })

  payload.logger.info('Categories created successfully')

  // Update Site Settings
  payload.logger.info('Updating site settings...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Джи Пи Инвест ЕООД',
      tagline: 'Професионални решения за вашия бизнес',
      description: 'Българска фирма със седалище в София, специализирана във фискални устройства и търговски системи. Предлагаме продажба, монтаж и поддръжка на касови апарати, както и софтуерни решения за магазини, ресторанти и хотели.',
      email: 'office@gpinvest.bg',
      phone: '+359 2 XXX XXXX',
      address: 'София, България',
      workingHours: 'Понеделник - Петък: 9:00 - 18:00',
    },
  })

  payload.logger.info('Site settings updated successfully')

  payload.logger.info('Seeding completed!')
}
