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
    <div className="min-h-screen bg-gray-20 flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-sky-300 to-indigo-400 shadow-lg z-10 ">
        <div className="p-4">
        <img src="./src/img/logo.jpg" alt="logo"  className=" size-20 rounded-full "/>
          <h1 className="text-2xl font-bold text-black">Inventory Management System</h1>
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

        <div className="absolute bottom-4 w-64 px-4 ">
          <Button
            
            className="w-full justify-start rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white border-2 border-black "
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