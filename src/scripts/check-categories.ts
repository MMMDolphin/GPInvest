/**
 * Script to check categories in the database
 * Run with: npx tsx src/scripts/check-categories.ts
 */

import { getPayload } from 'payload'
import config from '../payload.config'

async function checkCategories() {
  console.log('Checking categories in database...\n')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch all categories
  const categories = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  console.log(`Total categories found: ${categories.docs.length}\n`)

  if (categories.docs.length === 0) {
    console.log('❌ No categories found in the database!')
    console.log('\nTo create categories:')
    console.log('1. Go to http://localhost:3000/admin')
    console.log('2. Navigate to Collections > Categories')
    console.log('3. Click "Create New"')
    console.log('4. Fill in the name and slug fields')
  } else {
    console.log('Categories:')
    console.log('━'.repeat(80))
    categories.docs.forEach((category: any, index: number) => {
      console.log(`${index + 1}. ${category.name}`)
      console.log(`   ID: ${category.id}`)
      console.log(`   Slug: ${category.slug || '❌ MISSING SLUG'}`)
      console.log(`   Description: ${category.description || '(none)'}`)
      console.log('━'.repeat(80))
    })
  }

  process.exit(0)
}

checkCategories().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
