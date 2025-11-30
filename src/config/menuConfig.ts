export interface SubMenuItem {
  label: string
  href: string
}

export interface MenuItem {
  label: string
  href: string
  children?: SubMenuItem[]
}

export const menuItems: MenuItem[] = [
  { label: 'НАЧАЛО', href: '/' },
  {
    label: 'ФИСКАЛНИ УСТРОЙСТВА',
    href: '/fiskalni-ustroystva',
    children: [
      { label: 'Касови апарати', href: '/products/category/kasovi-aparati' },
      { label: 'Фискални принтери', href: '/products/category/fiskalni-printeri' },
      { label: 'ФУВАС', href: '/products/category/fuvas' },
    ],
  },
  { label: 'СОФТУЕР', href: '/software' },
  {
    label: 'POS ОБОРУДВАНЕ',
    href: '/pos-oborudvane',
    children: [
      { label: 'ЕЛЕКТРОННИ ВЕЗНИ', href: '/products/category/elektronni-vezni' },
      { label: 'ESC/POS принтери', href: '/products/category/escpos-printeri' },
      { label: 'LABEL принтери', href: '/products/category/label-printeri' },
      { label: 'Баркод скенери', href: '/products/category/barkod-skeneri' },
      { label: 'Периферни устройства', href: '/products/category/periferni-ustroystva' },
    ],
  },
  { label: 'ПОС ТЕРМИНАЛИ', href: '/pos-terminali' },
  { label: 'УСЛУГИ', href: '/services' },
  { label: 'КОНСУМАТИВИ', href: '/consumables' },
  { label: 'ЗА НАС', href: '/about' },
  { label: 'КОНТАКТИ', href: '/contact' },
]
