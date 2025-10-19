import { UserList } from '@/components/UserList'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            my-app
          </h1>
          <p className="text-gray-600">
            Full-stack application with Next.js, NestJS, PostgreSQL, and Prisma
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Frontend</h2>
            <p className="text-gray-600">Next.js 15 with App Router</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Backend</h2>
            <p className="text-gray-600">NestJS with Prisma ORM</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Database</h2>
            <p className="text-gray-600">PostgreSQL</p>
          </div>
        </div>

        <UserList />
      </div>
    </main>
  )
}
