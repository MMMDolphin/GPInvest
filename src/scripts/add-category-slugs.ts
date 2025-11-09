/**
 * Script to add slugs to existing categories
 * Run with: npx tsx src/scripts/add-category-slugs.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

async function addSlugsToCategories() {
  console.log('Starting to add slugs to categories...')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  console.log(`Found ${categories.docs.length} categories`)

  for (const category of categories.docs) {
    if (!category.slug && category.name) {
      // Generate slug from name
      const slug = category.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/-+/g, '-') // Replace multiple dashes with single dash
        .trim()

      console.log(`Updating category "${category.name}" with slug: "${slug}"`)

      try {
        await payload.update({
          collection: 'categories',
          id: category.id,
          data: {
            slug: slug,
          },
        })
        console.log(`✓ Updated ${category.name}`)
      } catch (error) {
        console.error(`✗ Failed to update ${category.name}:`, error)
      }
    } else if (category.slug) {
      console.log(`- Category "${category.name}" already has slug: "${category.slug}"`)
    }
  }

  console.log('Done!')
  process.exit(0)
}

addSlugsToCategories().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
