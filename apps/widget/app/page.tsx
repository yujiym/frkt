import Logo from '@@/components/svgs/LogoSquare'

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center flex-col text-4xl -mt-8 text-blue-700 font-bold">
      <Logo size={136} />
      <div className="loader-sq mt-2" />
    </main>
  )
}
