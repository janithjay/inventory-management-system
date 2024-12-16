import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, BarChart2, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

function Layout() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-20 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-gradient-to-r from-sky-300 to-indigo-400 shadow-lg fixed h-full flex flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
        style={{ minHeight: isCollapsed ? '88px' : 'auto' }}
      >
        <div className="p-4 flex flex-col items-start relative">
          <div className="flex items-center w-full">
            <h1 className={cn("text-2xl font-bold text-black transition-opacity duration-300", isCollapsed ? "opacity-0 w-0" : "opacity-100")}>
              IMS
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute right-2 top-2", isCollapsed ? "rotate-180" : "")}
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <p className={cn("text-sm text-gray-800 mt-1 transition-opacity duration-300", isCollapsed ? "opacity-0" : "opacity-100")}>
            Welcome, {user?.username}
          </p>
        </div>
        
        <nav className="mt-8 flex-grow overflow-y-auto">
          <Button
            variant="ghost"
            className={cn("w-full justify-start px-4 py-2 text-left", isCollapsed && "justify-center")}
            onClick={() => navigate('/')}
          >
            <LayoutDashboard className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn("w-full justify-start px-4 py-2 text-left", isCollapsed && "justify-center")}
            onClick={() => navigate('/products')}
          >
            <Package className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Products</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn("w-full justify-start px-4 py-2 text-left", isCollapsed && "justify-center")}
            onClick={() => navigate('/analytics')}
          >
            <BarChart2 className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Analytics</span>}
          </Button>
        </nav>

        <div className="p-4">
          <Button
            variant="outline"
            className={cn("w-full", isCollapsed ? "justify-center px-0" : "justify-start")}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout

