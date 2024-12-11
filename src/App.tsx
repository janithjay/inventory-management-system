import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Layout from './components/Layout'
import { useAuthStore } from './store/useAuthStore'

const queryClient = new QueryClient()

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {isAuthenticated ? (
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App