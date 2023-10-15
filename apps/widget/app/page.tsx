import Logo from '@@/components/svgs/LogoSquare'

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center flex-col text-4xl -mt-8 text-blue-700">
      <Logo size={256} />
      widget
    </main>
  )
}
