'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Load saved sidebar state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-open')
    if (saved !== null) {
      setSidebarOpen(saved === 'true')
    }
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(prev => {
      const newValue = !prev
      localStorage.setItem('sidebar-open', String(newValue))
      return newValue
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/30">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={cn(
        'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      )}>
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
