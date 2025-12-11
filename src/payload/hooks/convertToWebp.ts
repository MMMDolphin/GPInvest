import sharp from 'sharp'
import path from 'path'
import type { CollectionBeforeOperationHook } from 'payload'

const CONVERTIBLE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/tiff']
const WEBP_QUALITY = 85

/**
 * Converts uploaded images to WebP format automatically
 * Skips images that are already WebP or AVIF
 */
export const convertToWebp: CollectionBeforeOperationHook = async ({ args, operation }) => {
  // Only process create and update operations
  if (operation !== 'create' && operation !== 'update') {
    return args
  }

  const { req } = args
  const file = req.file

  // Skip if no file or not an image that should be converted
  if (!file || !file.data || !file.mimetype) {
    return args
  }

  // Skip if already WebP, AVIF, or SVG
  if (!CONVERTIBLE_FORMATS.includes(file.mimetype.toLowerCase())) {
    return args
  }

  try {
    // Convert to WebP using Sharp
    const webpBuffer = await sharp(file.data)
      .webp({ quality: WEBP_QUALITY })
      .toBuffer()

    // Update file properties
    const originalName = file.name || 'image'
    const nameWithoutExt = path.parse(originalName).name

    file.data = webpBuffer
    file.mimetype = 'image/webp'
    file.name = `${nameWithoutExt}.webp`
    file.size = webpBuffer.length

    console.log(`[WebP Converter] Converted ${originalName} to ${file.name} (${Math.round(webpBuffer.length / 1024)}KB)`)
  } catch (error) {
    console.error('[WebP Converter] Failed to convert image:', error)
    // Return original file if conversion fails
  }

  return args
}
