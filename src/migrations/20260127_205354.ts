import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Add remote assistance fields to site_settings table
  await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`remote_assistance_url\` text DEFAULT 'https://anydesk.com/bg';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`remote_assistance_label\` text DEFAULT 'Дистанционна помощ';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`remote_assistance_icon\` text DEFAULT 'Headphones';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN directly, so we need to recreate the table
  // This is a rollback migration - removes the remote assistance fields
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text DEFAULT 'GP Invest' NOT NULL,
  	\`tagline\` text DEFAULT 'Вашият надежден партньор за POS решения',
  	\`description\` text,
  	\`logo_id\` integer,
  	\`email\` text,
  	\`phone\` text,
  	\`address\` text,
  	\`working_hours\` text,
  	\`facebook\` text,
  	\`instagram\` text,
  	\`linkedin\` text,
  	\`eur_to_bgn_rate\` numeric DEFAULT 1.95583 NOT NULL,
  	\`show_bgn_price\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "company_name", "tagline", "description", "logo_id", "email", "phone", "address", "working_hours", "facebook", "instagram", "linkedin", "eur_to_bgn_rate", "show_bgn_price", "updated_at", "created_at") SELECT "id", "company_name", "tagline", "description", "logo_id", "email", "phone", "address", "working_hours", "facebook", "instagram", "linkedin", "eur_to_bgn_rate", "show_bgn_price", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
}
