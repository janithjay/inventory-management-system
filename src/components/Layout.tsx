import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, BarChart2, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from './ui/button'

function Layout() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-sky-300 to-indigo-400 shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-black">Inventory MS</h1>
          <p className="text-l text-gray-800 mt-1">Welcome, {user?.username}</p>
        </div>
        
        <nav className="mt-8">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => navigate('/')}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => navigate('/products')}
          >
            <Package className="mr-2 h-5 w-5" />
            Products
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-left"
            onClick={() => navigate('/analytics')}
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Analytics
          </Button>
        </nav>

        <div className="absolute bottom-4 w-64 px-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout