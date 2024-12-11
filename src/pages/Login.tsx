import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from '../components/ui/button'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would make an API call here
    login({
      id: '1',
      username: formData.username,
      email: `${formData.username}@example.com`,
      role: 'admin',
    })
    navigate('/')
  }
  const regButtonClick = () => {
    navigate('/register'); // Navigate to the "/another" page
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button className="w-full" onClick={regButtonClick}>
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login