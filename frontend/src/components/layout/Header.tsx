'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, User, ChevronDown, Settings, LogOut, Search, ChevronRight, Building2, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const pathname = usePathname()

  // Gerar breadcrumbs do pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)

    const breadcrumbMap: Record<string, string> = {
      dashboard: 'Dashboard',
      'canal-etica': 'Canal de Ética',
      documentos: 'Documentos',
      'gestao-riscos': 'Gestão de Riscos',
      analytics: 'Analytics',
      novo: 'Novo',
      nova: 'Nova',
    }

    return paths.map((path, index) => ({
      label: breadcrumbMap[path] || path.charAt(0).toUpperCase() + path.slice(1),
      href: '/' + paths.slice(0, index + 1).join('/'),
      isLast: index === paths.length - 1,
    }))
  }

  const breadcrumbs = generateBreadcrumbs()

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false)
        setShowSearch(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left Section - Breadcrumbs */}
        <div className="flex items-center gap-3 flex-1">
          {/* Company/Tenant Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
            <Building2 className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Acme Corp</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {/* Divider */}
          {breadcrumbs.length > 0 && (
            <div className="w-px h-6 bg-gray-300" />
          )}

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                {crumb.isLast ? (
                  <span className="text-sm font-medium text-gray-900">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center gap-3">
          {/* Global Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Buscar...</span>
              <kbd className="hidden md:inline-flex items-center px-2 py-0.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Search Modal */}
            {showSearch && (
              <>
                <div
                  className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
                  onClick={() => setShowSearch(false)}
                />
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Buscar documentos, denúncias, políticas..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
                    Digite para buscar em todo o sistema
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Help */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Ajuda"
          >
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300" />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">Admin</span>
                <span className="text-xs text-gray-500">Administrador</span>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">AD</span>
              </div>
              <ChevronDown className={cn(
                'w-4 h-4 text-gray-400 transition-transform duration-200',
                showUserMenu && 'rotate-180'
              )} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">Admin</p>
                    <p className="text-sm text-gray-500">admin@easycompliance.com</p>
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                      Administrador
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/perfil"
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Meu Perfil</span>
                    </Link>
                    <Link
                      href="/configuracoes"
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Configurações</span>
                    </Link>
                    <Link
                      href="/ajuda"
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Central de Ajuda</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 pt-2">
                    <button
                      onClick={() => {
                        // TODO: Implementar logout
                        window.location.href = '/login'
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sair</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
