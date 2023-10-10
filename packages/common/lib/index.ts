import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HOST } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthCallbackURL = (provider: 'github' | 'google') =>
  `${HOST}/auth/${provider.toLocaleLowerCase()}/callback`
