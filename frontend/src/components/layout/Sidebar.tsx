'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Shield,
  GitCompare,
  Search,
  ClipboardList,
  BarChart3,
  FileQuestion,
  FileSpreadsheet,
  GraduationCap,
  Activity,
  BookOpen,
  HelpCircle,
  Lock,
  Settings,
  GitBranch,
  ChevronDown,
  Menu,
  X,
  Eye,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  submenu?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'inicio',
    label: 'Início',
    icon: <Home className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: '/dashboard/analytics'
  },
  {
    id: 'canal-etica',
    label: 'Canal de Ética',
    icon: <MessageSquare className="w-5 h-5" />,
    href: '/dashboard/canal-etica',
    submenu: [
      { id: 'lista-denuncias', label: 'Denúncias', icon: <FileText className="w-4 h-4" />, href: '/dashboard/canal-etica' },
      { id: 'nova-denuncia', label: 'Nova Denúncia', icon: <MessageSquare className="w-4 h-4" />, href: '/dashboard/canal-etica/nova' }
    ]
  },
  {
    id: 'documentos',
    label: 'Documentos',
    icon: <FileText className="w-5 h-5" />,
    href: '/dashboard/documentos',
    submenu: [
      { id: 'todos-docs', label: 'Todos os Documentos', icon: <FileText className="w-4 h-4" />, href: '/dashboard/documentos' },
      { id: 'novo-doc', label: 'Novo Documento', icon: <FileText className="w-4 h-4" />, href: '/dashboard/documentos/novo' }
    ]
  },
  {
    id: 'gestao-riscos',
    label: 'Gestão de Riscos',
    icon: <Shield className="w-5 h-5" />,
    href: '/dashboard/riscos',
    submenu: [
      { id: 'riscos', label: 'Riscos', icon: <Shield className="w-4 h-4" />, href: '/dashboard/riscos' },
      { id: 'novo-risco', label: 'Novo Risco', icon: <Shield className="w-4 h-4" />, href: '/dashboard/riscos/novo' }
    ]
  },
  {
    id: 'gestao-mudancas',
    label: 'Gestão de Mudanças',
    icon: <GitCompare className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Gestão de Mudanças'
  },
  {
    id: 'diligencias',
    label: 'Diligências',
    icon: <Search className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Diligências'
  },
  {
    id: 'planos-acao',
    label: 'Planos de Ação',
    icon: <ClipboardList className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Planos de Ação'
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Reportes'
  },
  {
    id: 'requisicoes',
    label: 'Requisições',
    icon: <FileQuestion className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Requisições'
  },
  {
    id: 'easyforms',
    label: 'EasyForms',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=EasyForms'
  },
  {
    id: 'universidade',
    label: 'Universidade',
    icon: <GraduationCap className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Universidade'
  },
  {
    id: 'atividades',
    label: 'Atividades',
    icon: <Activity className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Atividades'
  },
  {
    id: 'biblioteca',
    label: 'Biblioteca',
    icon: <BookOpen className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Biblioteca'
  },
  {
    id: 'ajuda',
    label: 'Ajuda',
    icon: <HelpCircle className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Ajuda'
  },
  {
    id: 'configurar-logins',
    label: 'Configurar Logins',
    icon: <Lock className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Configurar Logins'
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: <Settings className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Configurações'
  },
  {
    id: 'fluxos-aprovacao',
    label: 'Fluxos de aprovação',
    icon: <GitBranch className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Fluxos de Aprovação'
  },
  {
    id: 'acessibilidade',
    label: 'Acessibilidade',
    icon: <Eye className="w-5 h-5" />,
    href: '/dashboard/em-desenvolvimento?modulo=Acessibilidade'
  }
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // Auto expand current section
  useEffect(() => {
    const currentItem = menuItems.find(item =>
      item.href === pathname ||
      item.submenu?.some(sub => sub.href === pathname)
    )
    if (currentItem && currentItem.submenu) {
      setExpandedItems(prev => {
        if (!prev.includes(currentItem.id)) {
          return [...prev, currentItem.id]
        }
        return prev
      })
    }
  }, [pathname])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const active = isActive(item.href)
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedItems.includes(item.id)

    return (
      <div key={item.id}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleExpanded(item.id)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 text-sm transition-colors',
              depth === 0 && 'hover:bg-gray-100',
              active && 'bg-blue-50 text-blue-600 font-medium',
              !active && 'text-gray-700'
            )}
          >
            <div className="flex items-center">
              <span className={cn(depth > 0 && 'ml-4')}>{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'transform rotate-180'
              )}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              'flex items-center px-4 py-3 text-sm transition-colors',
              depth === 0 && 'hover:bg-gray-100',
              depth > 0 && 'pl-12 hover:bg-gray-50',
              active && 'bg-blue-50 text-blue-600 font-medium',
              !active && 'text-gray-700'
            )}
          >
            <span>{item.icon}</span>
            <span className="ml-3">{item.label}</span>
          </Link>
        )}
        {hasSubmenu && isExpanded && (
          <div className="bg-gray-50">
            {item.submenu!.map(subItem => renderMenuItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50',
          isOpen ? 'w-64' : 'w-20',
          'hidden lg:block'
        )}
      >
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {isOpen && (
            <span className="text-xl font-bold text-blue-600">EasyCompliance</span>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {isOpen ? (
            menuItems.map(item => renderMenuItem(item))
          ) : (
            <div className="space-y-2 px-2">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center p-3 rounded-lg transition-colors',
                    isActive(item.href) && 'bg-blue-50 text-blue-600',
                    !isActive(item.href) && 'text-gray-700 hover:bg-gray-100'
                  )}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">EasyCompliance</span>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg lg:hidden z-40"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  )
}
