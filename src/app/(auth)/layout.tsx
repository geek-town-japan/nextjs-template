import { ModeToggle } from "@/components/mode-toggle"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="fixed top-5 left-5">
        <ModeToggle />
      </div>
      {children}
    </main>
  )
}
