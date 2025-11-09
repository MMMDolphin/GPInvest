import {
  ShoppingCart,
  Laptop,
  Wrench,
  Package,
  Smartphone,
  Monitor,
  Printer,
  HardDrive,
  Scale,
  Barcode,
  Banknote,
} from 'lucide-react'

// Icon mapping for category icons
const iconMap: Record<string, any> = {
  CashRegister: Banknote, // Using Banknote as alternative to CashRegister
  ShoppingCart,
  Laptop,
  Wrench,
  Package,
  Smartphone,
  Monitor,
  Printer,
  HardDrive,
  Scale,
  Barcode,
}

export const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Package // Default to Package if icon not found
}
