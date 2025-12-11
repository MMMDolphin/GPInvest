import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`products\` ADD \`seo_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`seo_meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`seo_og_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`seo_no_index\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`products_seo_seo_og_image_idx\` ON \`products\` (\`seo_og_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_id\` integer NOT NULL,
  	\`model\` text,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`short_description\` text,
  	\`category_id\` integer NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`custom_vat\` integer DEFAULT false,
  	\`vat_rate\` numeric,
  	\`warranty_months\` numeric DEFAULT 12,
  	\`image_id\` integer NOT NULL,
  	\`in_stock\` integer DEFAULT true,
  	\`specification_file_id\` integer,
  	\`featured\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`specification_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_products\`("id", "brand_id", "model", "name", "slug", "description", "short_description", "category_id", "price", "custom_vat", "vat_rate", "warranty_months", "image_id", "in_stock", "specification_file_id", "featured", "updated_at", "created_at") SELECT "id", "brand_id", "model", "name", "slug", "description", "short_description", "category_id", "price", "custom_vat", "vat_rate", "warranty_months", "image_id", "in_stock", "specification_file_id", "featured", "updated_at", "created_at" FROM \`products\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`ALTER TABLE \`__new_products\` RENAME TO \`products\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`products_brand_idx\` ON \`products\` (\`brand_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_category_idx\` ON \`products\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`products_image_idx\` ON \`products\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_specification_file_idx\` ON \`products\` (\`specification_file_id\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
}
