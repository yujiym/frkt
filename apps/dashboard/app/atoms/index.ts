import { atom } from 'jotai'
import { atomWithReset, useHydrateAtoms } from 'jotai/utils'

export type Session = {
  id: string | undefined
  address: string | undefined
}

export type SideBarConfig = {
  navOpen: boolean
  isFull: boolean
}

// session
export const sessionLoadedAtom = atom<boolean>(false)
export const sessionAtom = atomWithReset<Session>({
  id: undefined,
  address: undefined,
})

// appConfig
export const sidebarAtom = atom<SideBarConfig>({
  navOpen: false,
  isFull: true,
})
export const loadingAtom = atom<boolean>(false)
