import * as migration_20251109_102553_add_parent_to_categories from './20251109_102553_add_parent_to_categories';

export const migrations = [
  {
    up: migration_20251109_102553_add_parent_to_categories.up,
    down: migration_20251109_102553_add_parent_to_categories.down,
    name: '20251109_102553_add_parent_to_categories'
  },
];
