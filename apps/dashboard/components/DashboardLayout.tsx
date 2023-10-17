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
import Providers from '~components/Providers'
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
    <Providers>
      <Menu />
      <nav
        className={cn(
          'bg-background/80 border-foreground fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b backdrop-blur-sm sm:hidden'
        )}
      >
        <LogoSquare size={54} />
        <HeaderButton />
      </nav>
      <main
        className={cn(
          'fixed bottom-0 left-0 right-0 top-0 ml-0 mt-16 overflow-y-scroll sm:mt-0',
          sidebar.isFull ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {children}
      </main>
      <Toaster />
    </Providers>
  )
}

const Menu = () => {
  const [sidebar, setSideBar] = useAtom(sidebarAtom)

  return (
    <div
      className={cn(
        'fixed z-50 h-screen bg-zinc-800 transition-all duration-300 sm:relative',
        sidebar.isFull ? 'w-64' : 'w-64 sm:w-20',
        sidebar.navOpen ? 'left-0 top-0' : '-left-64 top-0 sm:left-0'
      )}
    >
      <h1
        className={cn(
          'flex h-16 items-center justify-center border-b border-zinc-600 font-bold text-white',
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
          className="absolute -right-3 top-5 hidden rounded-full bg-zinc-800 p-1 shadow-xl focus:outline-none sm:block"
        >
          <ChevronRight
            strokeWidth={4}
            className={cn(
              'h-4 w-4 transform text-white transition-all duration-300',
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
      <ul className="absolute bottom-0 left-0 right-0">
        <li
          className={cn(
            'relative h-16 border-t border-zinc-600 px-6 text-white hover:bg-zinc-600',
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
          'relative flex h-16 items-center border-zinc-600 px-6 text-white hover:bg-zinc-600',
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
        className="absolute right-5 top-5 focus:outline-none sm:hidden"
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
