import Logo from '@@/components/svgs/LogoSquare'

export default async function Home() {
  return (
    <main className="-mt-8 flex h-screen w-full flex-col items-center justify-center text-4xl font-bold text-blue-700">
      <Logo size={136} />
      <div className="loader-sq mt-2" />
    </main>
  )
}
