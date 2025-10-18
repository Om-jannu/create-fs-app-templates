import { UserList } from './components/UserList'

function App() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {{PROJECT_NAME}}
          </h1>
          <p className="text-gray-600">
            MERN Stack with React, Express, MongoDB, and Mongoose
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Frontend</h2>
            <p className="text-gray-600">React 18 with Vite</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Backend</h2>
            <p className="text-gray-600">Express with Mongoose</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Database</h2>
            <p className="text-gray-600">MongoDB</p>
          </div>
        </div>

        <UserList />
      </div>
    </main>
  )
}

export default App
