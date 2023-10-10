import { useState } from 'react'
import { useLocation, Form } from '@remix-run/react'
import {
  X,
  Home,
  ChevronRight,
  LayoutPanelLeft,
  BookCopy,
  UserCircle,
  LogOut,
} from 'lucide-react'
import { cn } from '@@/lib'
import Logo from '@@/assets/img/logo-white.svg'
import LogoSq from '@@/assets/img/logo-sq.svg'
import LogoSqW from '@@/assets/img/logo-sq-white.svg'
import { Outlet } from '@remix-run/react'
import type { LoaderFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({
  request,
  context,
}: LoaderFunctionArgs) => {
  const authenticator = getAuthenticator(context)
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })
}

export default function AppLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

const MENU_ITEMS = [
  { name: 'Dashboard', href: '/', icon: <Home /> },
  { name: 'My Apps', href: '/apps', icon: <LayoutPanelLeft /> },
  { name: 'Recipes', href: '/recipes', icon: <BookCopy /> },
]

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const [sideBarFull, setSideBarFull] = useState<boolean>(true)

  return (
    <>
      <Menu
        navOpen={navOpen}
        sideBarFull={sideBarFull}
        setSideBarFull={setSideBarFull}
      />
      <nav
        className={cn(
          'fixed bg-foreground/60 backdrop-blur-sm top-0 right-0 left-0 h-16 border-b border-primary z-40 flex sm:hidden items-center justify-between'
        )}
      >
        <img className="block md:hidden" src={LogoSq} width={54} alt="FRKT" />
        <HeaderButton navOpen={navOpen} setNavOpen={setNavOpen} />
      </nav>
      <main
        className={cn(
          'mt-16 sm:mt-0 fixed top-0 right-0 bottom-0 left-0 ml-0 overflow-y-scroll',
          sideBarFull ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {children}
      </main>
    </>
  )
}

const Menu = ({
  navOpen,
  sideBarFull,
  setSideBarFull,
}: {
  navOpen: boolean
  sideBarFull: boolean
  setSideBarFull: Function
}) => (
  <div
    className={cn(
      'h-screen bg-primary transition-all duration-300 fixed sm:relative z-50',
      sideBarFull ? 'w-64' : 'w-64 sm:w-20',
      navOpen ? 'top-0 left-0' : 'top-0 -left-64 sm:left-0'
    )}
  >
    <h1
      className={cn(
        'text-foreground font-bold flex items-center justify-center border-b border-slate-500 h-16',
        sideBarFull ? 'px-4' : 'px-1'
      )}
    >
      <img
        className="mx-auto"
        src={sideBarFull || navOpen ? Logo : LogoSqW}
        width={sideBarFull || navOpen ? 80 : 54}
        alt="FRKT"
      />
    </h1>
    <ul>
      <button
        onClick={() => setSideBarFull(!sideBarFull)}
        className="hidden sm:block focus:outline-none absolute p-1 -right-3 top-5 bg-primary rounded-full shadow-xl"
      >
        <ChevronRight
          strokeWidth={4}
          className={cn(
            'h-4 w-4 transition-all duration-300 text-foreground transform',
            sideBarFull ? '' : 'rotate-180'
          )}
        />
      </button>
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.name.toLowerCase()}
          name={item.name}
          href={item.href}
          icon={item.icon}
          sideBarFull={sideBarFull}
        />
      ))}
    </ul>
    <ul className="absolute bottom-0 right-0 left-0">
      <li
        className={cn(
          'h-16 px-6 text-foreground relative flex items-center hover:bg-gray-800 border-slate-500 border-t',
          sideBarFull ? 'justify-start' : 'sm:justify-center'
        )}
      >
        <UserCircle />
        <span className={cn('ml-6', sideBarFull ? '' : 'sm:hidden')}>
          Profile
        </span>
      </li>
      <li
        className={cn(
          'h-16 text-foreground relativehover:bg-gray-800 border-slate-500 border-t',
          sideBarFull ? 'justify-start' : 'sm:justify-center'
        )}
      >
        <Form method="post" action="/auth/logout" className="h-full w-full">
          <button className="px-6 flex items-center h-full w-full">
            <LogOut />
            <span className={cn('ml-6', sideBarFull ? '' : 'sm:hidden')}>
              LogOut
            </span>
          </button>
        </Form>
      </li>
    </ul>
  </div>
)

const MenuItem = ({
  name,
  href,
  icon,
  sideBarFull,
  position = 'top',
}: {
  name: string
  href: string
  icon: React.ReactNode
  sideBarFull: boolean
  position?: 'top' | 'bottom'
}) => {
  const { pathname } = useLocation()

  return (
    <li>
      <a
        href={href}
        className={cn(
          'h-16 px-6 text-foreground relative flex items-center hover:bg-gray-800 border-slate-500',
          sideBarFull ? 'justify-start' : 'sm:justify-center',
          pathname === href && 'font-bold',
          position === 'top' ? 'border-b' : 'border-t'
        )}
      >
        {icon}
        <span className={cn('ml-6', sideBarFull ? '' : 'sm:hidden')}>
          {name}
        </span>
      </a>
    </li>
  )
}

const HeaderButton = ({
  navOpen,
  setNavOpen,
}: {
  navOpen: boolean
  setNavOpen: Function
}) => (
  <>
    <button
      className="sm:hidden absolute top-5 right-5 focus:outline-none"
      onClick={() => setNavOpen(!navOpen)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${navOpen ? 'hidden' : ''}`}
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
      <X className={`h-6 w-6 ${navOpen ? '' : 'hidden'}`} />
    </button>
  </>
)
