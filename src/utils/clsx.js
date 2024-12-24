import { clsx as cl } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function clsx(...args) {
  return twMerge(cl(args))
}
