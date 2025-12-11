import 'dotenv/config'
import { getPayloadClient } from '../src/lib/getPayloadClient'
import fs from 'fs'
import path from 'path'

const PRODUCTS_DIR = process.env.PRODUCTS_DIR || '/root/GPInvest/import_data'

// Category mapping based on folder names
const CATEGORY_MAP: Record<string, string> = {
  '01_Фискални_принтери': 'fiskalni-printeri',
  '02_Етикетиращи_принтери': 'label-printeri',
  '03_POS_принтери': 'escpos-printeri',
  '04_Електронни_везни': 'elektronni-vezni',
  '05_Етикетиращи_везни': 'elektronni-vezni',
  '06_Касови_апарати_Compact': 'kasovi-aparati',
  '07_Касови_апарати_eXpert': 'kasovi-aparati',
  '08_Касови_апарати_Perfect': 'kasovi-aparati',
}

interface ProductData {
  name: string
  model: string
  priceEur: number
  description: string
  slug: string
  categorySlug: string
  images: string[]
  seo: {
    metaTitle?: string
    metaDescription?: string
  }
}

function parseOriginalBg(content: string): { name: string; priceEur: number; description: string } {
  const lines = content.trim().split('\n')
  const name = lines[0].trim()

  // Parse price - extract EUR value
  const priceLine = lines[1] || ''
  const eurMatch = priceLine.match(/€([\d.,]+)/)
  const priceEur = eurMatch ? parseFloat(eurMatch[1].replace(',', '.')) : 0

  // Description is the rest
  const description = lines.slice(2).join('\n').trim()

  return { name, priceEur, description }
}

function parseSeoTxt(content: string): { metaTitle?: string; metaDescription?: string; slug?: string } {
  const result: { metaTitle?: string; metaDescription?: string; slug?: string } = {}

  // Extract SEO title
  const titleMatch = content.match(/1\. SEO ЗАГЛАВИЕ[^:]*:\s*\n([^\n]+)/)
  if (titleMatch) {
    result.metaTitle = titleMatch[1].trim()
  }

  // Extract meta description
  const descMatch = content.match(/2\. META ОПИСАНИЕ[^:]*:\s*\n([^\n]+)/)
  if (descMatch) {
    result.metaDescription = descMatch[1].trim()
  }

  // Extract slug
  const slugMatch = content.match(/8\. CANONICAL URL SLUG:\s*\n([^\n]+)/)
  if (slugMatch) {
    result.slug = slugMatch[1].trim()
  }

  return result
}

function getImageFiles(productDir: string): string[] {
  const files = fs.readdirSync(productDir)
  return files.filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f)).map(f => path.join(productDir, f))
}

async function importProducts() {
  const payload = await getPayloadClient()

  // Get Daisy brand
  const brandsResult = await payload.find({
    collection: 'brands',
    where: { slug: { equals: 'daisy' } },
  })

  if (brandsResult.docs.length === 0) {
    console.error('Daisy brand not found!')
    process.exit(1)
  }
  const brandId = brandsResult.docs[0].id
  console.log(`Found Daisy brand with ID: ${brandId}`)

  // Get all categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    limit: 100,
  })
  const categoryMap = new Map(categoriesResult.docs.map(c => [c.slug, c.id]))
  console.log(`Found ${categoryMap.size} categories`)

  // Process each category folder
  const categoryFolders = fs.readdirSync(PRODUCTS_DIR).filter(f => {
    const fullPath = path.join(PRODUCTS_DIR, f)
    return fs.statSync(fullPath).isDirectory() && !f.startsWith('.')
  })

  for (const categoryFolder of categoryFolders) {
    const categorySlug = CATEGORY_MAP[categoryFolder]
    if (!categorySlug) {
      console.log(`Skipping unknown category: ${categoryFolder}`)
      continue
    }

    const categoryId = categoryMap.get(categorySlug)
    if (!categoryId) {
      console.log(`Category not found in database: ${categorySlug}`)
      continue
    }

    console.log(`\nProcessing category: ${categoryFolder} -> ${categorySlug}`)

    const categoryPath = path.join(PRODUCTS_DIR, categoryFolder)
    const productFolders = fs.readdirSync(categoryPath).filter(f => {
      const fullPath = path.join(categoryPath, f)
      return fs.statSync(fullPath).isDirectory() && !f.startsWith('_')
    })

    for (const productFolder of productFolders) {
      const productPath = path.join(categoryPath, productFolder)
      console.log(`  Processing product: ${productFolder}`)

      try {
        // Read product data
        const originalBgPath = path.join(productPath, 'original_bg.txt')
        const seoPath = path.join(productPath, 'seo.txt')

        if (!fs.existsSync(originalBgPath)) {
          console.log(`    Skipping: no original_bg.txt`)
          continue
        }

        const originalBg = fs.readFileSync(originalBgPath, 'utf-8')
        const { name, priceEur, description } = parseOriginalBg(originalBg)

        let seo: { metaTitle?: string; metaDescription?: string; slug?: string } = {}
        if (fs.existsSync(seoPath)) {
          seo = parseSeoTxt(fs.readFileSync(seoPath, 'utf-8'))
        }

        // Generate slug if not in SEO file
        const slug = seo.slug || productFolder.toLowerCase().replace(/_/g, '-')

        // Extract model from folder name (e.g., "Daisy_Compact_S01" -> "Compact S01")
        const model = productFolder.replace(/^Daisy_/, '').replace(/_/g, ' ')

        // Get image files
        const imageFiles = getImageFiles(productPath)
        if (imageFiles.length === 0) {
          console.log(`    Skipping: no images found`)
          continue
        }

        // Upload main image
        const mainImagePath = imageFiles[0]
        const mainImageBuffer = fs.readFileSync(mainImagePath)
        const mainImageName = path.basename(mainImagePath)

        console.log(`    Uploading image: ${mainImageName}`)
        const mediaResult = await payload.create({
          collection: 'media',
          data: {
            alt: name,
          },
          file: {
            data: mainImageBuffer,
            name: mainImageName,
            mimetype: mainImageName.endsWith('.png') ? 'image/png' : 'image/jpeg',
            size: mainImageBuffer.length,
          },
        })

        // Create product
        console.log(`    Creating product: ${name}`)
        await payload.create({
          collection: 'products',
          data: {
            brand: brandId,
            model,
            name,
            slug,
            description: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: description }],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            shortDescription: description.substring(0, 200) + (description.length > 200 ? '...' : ''),
            category: categoryId,
            price: priceEur,
            image: mediaResult.id,
            inStock: true,
            featured: false,
            seo: {
              metaTitle: seo.metaTitle,
              metaDescription: seo.metaDescription,
            },
          },
        })

        console.log(`    ✓ Created: ${name}`)

        // Upload gallery images if more than one
        if (imageFiles.length > 1) {
          console.log(`    Uploading ${imageFiles.length - 1} gallery images...`)
          // TODO: Add gallery images
        }

      } catch (error) {
        console.error(`    Error processing ${productFolder}:`, error)
      }
    }
  }

  console.log('\nImport complete!')
}

importProducts().catch(console.error)
