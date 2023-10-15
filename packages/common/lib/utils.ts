import ms from 'ms'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DASHBOARD_HOST } from './const'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthCallbackURL = (provider: 'github' | 'google') =>
  `${DASHBOARD_HOST}/auth/${provider.toLocaleLowerCase()}/callback`

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}
