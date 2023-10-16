'use client'
import { usePathname } from 'next/navigation'
import {
  X,
  Home,
  ChevronRight,
  LayoutPanelLeft,
  BookCopy,
  UserCircle,
} from 'lucide-react'
import { useAtom, useAtomValue } from 'jotai'
import UserDialog from '~components/UserDialog'
import WagmiWrapper from '~components/WagmiWrapper'
import { sidebarAtom } from '~store/index'
import { cn } from '@@/lib/utils'
import LogoSquare from '@@/components/svgs/LogoSquare'
import Logo from '@@/components/svgs/Logo'
import Toaster from '@@/components/Toaster'

const MENU_ITEMS = [
  {
    name: 'Dashboard',
    href: '/home',
    icon: <Home strokeWidth={1} />,
    activeIcon: <Home strokeWidth={2} />,
  },
  {
    name: 'My Apps',
    href: '/my-apps',
    icon: <LayoutPanelLeft strokeWidth={1} />,
    activeIcon: <LayoutPanelLeft strokeWidth={2} />,
  },
  {
    name: 'Recipes',
    href: '/recipes',
    icon: <BookCopy strokeWidth={1} />,
    activeIcon: <BookCopy strokeWidth={2} />,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sidebar = useAtomValue(sidebarAtom)

  return (
    <WagmiWrapper>
      <Menu />
      <nav
        className={cn(
          'fixed bg-background/80 backdrop-blur-sm top-0 right-0 left-0 h-16 border-b border-foreground z-40 flex sm:hidden items-center justify-between'
        )}
      >
        <LogoSquare size={54} />
        <HeaderButton />
      </nav>
      <main
        className={cn(
          'mt-16 sm:mt-0 fixed top-0 right-0 bottom-0 left-0 ml-0 overflow-y-scroll',
          sidebar.isFull ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {children}
      </main>
      <Toaster />
    </WagmiWrapper>
  )
}

const Menu = () => {
  const [sidebar, setSideBar] = useAtom(sidebarAtom)

  return (
    <div
      className={cn(
        'h-screen bg-zinc-800 transition-all duration-300 fixed sm:relative z-50',
        sidebar.isFull ? 'w-64' : 'w-64 sm:w-20',
        sidebar.navOpen ? 'top-0 left-0' : 'top-0 -left-64 sm:left-0'
      )}
    >
      <h1
        className={cn(
          'text-white font-bold flex items-center justify-center border-b border-zinc-600 h-16',
          sidebar.isFull ? 'px-4' : 'px-1'
        )}
      >
        {sidebar.isFull || sidebar.navOpen ? (
          <Logo size={80} />
        ) : (
          <LogoSquare size={60} />
        )}
      </h1>
      <ul>
        <button
          onClick={() => setSideBar({ ...sidebar, isFull: !sidebar.isFull })}
          className="hidden sm:block focus:outline-none absolute p-1 -right-3 top-5 bg-zinc-800 rounded-full shadow-xl"
        >
          <ChevronRight
            strokeWidth={4}
            className={cn(
              'h-4 w-4 transition-all duration-300 text-white transform',
              sidebar.isFull ? '' : 'rotate-180'
            )}
          />
        </button>
        {MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.name.toLowerCase()}
            name={item.name}
            href={item.href}
            icon={item.icon}
            activeIcon={item.activeIcon}
          />
        ))}
      </ul>
      <ul className="absolute bottom-0 right-0 left-0">
        <li
          className={cn(
            'h-16 px-6 text-white relative hover:bg-zinc-600 border-zinc-600 border-t',
            sidebar.isFull ? 'justify-start' : 'sm:justify-center'
          )}
        >
          <UserDialog>
            <UserCircle />
            <span className={cn('ml-6', sidebar.isFull ? '' : 'sm:hidden')}>
              Profile
            </span>
          </UserDialog>
        </li>
      </ul>
    </div>
  )
}

const MenuItem = ({
  name,
  href,
  icon,
  activeIcon,
  position = 'top',
}: {
  name: string
  href: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  position?: 'top' | 'bottom'
}) => {
  const pathname = usePathname()
  const sidebar = useAtomValue(sidebarAtom)

  return (
    <li>
      <a
        href={href}
        className={cn(
          'h-16 px-6 text-white relative flex items-center hover:bg-zinc-600 border-zinc-600',
          sidebar.isFull ? 'justify-start' : 'sm:justify-center',
          pathname === href && 'font-bold',
          position === 'top' ? 'border-b' : 'border-t'
        )}
      >
        {pathname === href ? activeIcon : icon}
        <span className={cn('ml-6', sidebar.isFull ? '' : 'sm:hidden')}>
          {name}
        </span>
      </a>
    </li>
  )
}

const HeaderButton = () => {
  const [sidebar, setSideBar] = useAtom(sidebarAtom)

  return (
    <>
      <button
        className="sm:hidden absolute top-5 right-5 focus:outline-none"
        onClick={() => setSideBar({ ...sidebar, navOpen: !sidebar.navOpen })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${sidebar.navOpen ? 'hidden' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <X className={`h-6 w-6 ${sidebar.navOpen ? '' : 'hidden'}`} />
      </button>
    </>
  )
}
