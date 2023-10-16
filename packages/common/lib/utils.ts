import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DASHBOARD_HOST } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthCallbackURL = (provider: 'github' | 'google') =>
  `${DASHBOARD_HOST}/auth/${provider.toLocaleLowerCase()}/callback`
