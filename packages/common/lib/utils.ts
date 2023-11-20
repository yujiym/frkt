import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { DASHBOARD_HOST } from './const'
import short from 'short-uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthCallbackURL = (provider: 'github' | 'google') =>
  `${DASHBOARD_HOST}/auth/${provider.toLocaleLowerCase()}/callback`

export const newShortId = () => short().new()
export const convShortId2Uuid = (shortId: string) => short().toUUID(shortId)
