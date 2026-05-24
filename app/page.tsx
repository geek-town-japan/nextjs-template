import { UserManagement } from "@/components/users/user-management";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-3 border-b border-zinc-200 pb-6">
          <p className="text-sm font-medium text-zinc-500">
            Prisma PostgreSQL CRUD
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            ユーザー管理
          </h1>
        </header>
        <UserManagement />
      </div>
    </main>
  );
}
