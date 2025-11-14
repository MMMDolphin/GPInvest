import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Revalidates the entire site cache after any collection change
 */
export const revalidateAfterChange: CollectionAfterChangeHook = async () => {
  revalidatePath('/', 'layout')
  return
}

/**
 * Revalidates the entire site cache after any collection deletion
 */
export const revalidateAfterDelete: CollectionAfterDeleteHook = async () => {
  revalidatePath('/', 'layout')
  return
}

/**
 * Revalidates the entire site cache after any global change
 */
export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async () => {
  revalidatePath('/', 'layout')
  return
}
