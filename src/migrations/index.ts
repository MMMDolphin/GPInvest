import * as migration_20251109_102553_add_parent_to_categories from './20251109_102553_add_parent_to_categories';
import * as migration_20251211_055911_add_currency_settings from './20251211_055911_add_currency_settings';
import * as migration_20251211_060428_add_custom_vat_field from './20251211_060428_add_custom_vat_field';
import * as migration_20251211_061807_add_seo_fields from './20251211_061807_add_seo_fields';

export const migrations = [
  {
    up: migration_20251109_102553_add_parent_to_categories.up,
    down: migration_20251109_102553_add_parent_to_categories.down,
    name: '20251109_102553_add_parent_to_categories',
  },
  {
    up: migration_20251211_055911_add_currency_settings.up,
    down: migration_20251211_055911_add_currency_settings.down,
    name: '20251211_055911_add_currency_settings',
  },
  {
    up: migration_20251211_060428_add_custom_vat_field.up,
    down: migration_20251211_060428_add_custom_vat_field.down,
    name: '20251211_060428_add_custom_vat_field',
  },
  {
    up: migration_20251211_061807_add_seo_fields.up,
    down: migration_20251211_061807_add_seo_fields.down,
    name: '20251211_061807_add_seo_fields'
  },
];
