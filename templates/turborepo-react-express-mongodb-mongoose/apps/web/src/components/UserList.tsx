import { useEffect, useState } from 'react'
import type { User, ApiResponse } from '{{PROJECT_NAME}}-shared'

export function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users')
        const data: ApiResponse<User[]> = await response.json()
        
        if (data.success && data.data) {
          setUsers(data.data)
        } else {
          setError(data.error || 'Failed to fetch users')
        }
      } catch (err) {
        setError('Failed to connect to API')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Users</h2>
        <p className="text-gray-600">Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Users</h2>
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-gray-500 mt-2">
          Make sure the API is running on http://localhost:3001
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found. Create one via the API!</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user._id} className="p-4 border border-gray-200 rounded-md">
              <p className="font-medium text-gray-900">{user.name || 'No name'}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

