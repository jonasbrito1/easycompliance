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
      { id: 'novo-risco', label: 'Novo Risco', icon: <Shield className="w-4 h-4" />, href: '/dashboard/riscos/novo' },
      { id: 'matriz', label: 'Matriz de Riscos', icon: <LayoutDashboard className="w-4 h-4" />, href: '/gestao-riscos/matriz' }
    ]
  },
  {
    id: 'gestao-mudancas',
    label: 'Gestão de Mudanças',
    icon: <GitCompare className="w-5 h-5" />,
    href: '/gestao-mudancas'
  },
  {
    id: 'diligencias',
    label: 'Diligências',
    icon: <Search className="w-5 h-5" />,
    href: '/diligencias',
    submenu: [
      { id: 'terceiros', label: 'Terceiros', icon: <User className="w-4 h-4" />, href: '/diligencias/terceiros' },
      { id: 'fornecedores', label: 'Fornecedores', icon: <User className="w-4 h-4" />, href: '/diligencias/fornecedores' }
    ]
  },
  {
    id: 'planos-acao',
    label: 'Planos de Ação',
    icon: <ClipboardList className="w-5 h-5" />,
    href: '/planos-acao'
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/reportes',
    submenu: [
      { id: 'relatorios', label: 'Relatórios', icon: <FileText className="w-4 h-4" />, href: '/reportes/relatorios' },
      { id: 'exports', label: 'Exportações', icon: <FileSpreadsheet className="w-4 h-4" />, href: '/reportes/exports' }
    ]
  },
  {
    id: 'requisicoes',
    label: 'Requisições',
    icon: <FileQuestion className="w-5 h-5" />,
    href: '/requisicoes'
  },
  {
    id: 'beforms',
    label: 'BeForms',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    href: '/beforms'
  },
  {
    id: 'universidade',
    label: 'Universidade',
    icon: <GraduationCap className="w-5 h-5" />,
    href: '/universidade',
    submenu: [
      { id: 'treinamentos', label: 'Treinamentos', icon: <BookOpen className="w-4 h-4" />, href: '/universidade/treinamentos' },
      { id: 'cursos', label: 'Cursos', icon: <GraduationCap className="w-4 h-4" />, href: '/universidade/cursos' }
    ]
  },
  {
    id: 'atividades',
    label: 'Atividades',
    icon: <Activity className="w-5 h-5" />,
    href: '/atividades',
    submenu: [
      { id: 'minhas', label: 'Minhas Atividades', icon: <Activity className="w-4 h-4" />, href: '/atividades/minhas' },
      { id: 'equipe', label: 'Equipe', icon: <User className="w-4 h-4" />, href: '/atividades/equipe' }
    ]
  },
  {
    id: 'biblioteca',
    label: 'Biblioteca',
    icon: <BookOpen className="w-5 h-5" />,
    href: '/biblioteca',
    submenu: [
      { id: 'documentos', label: 'Documentos', icon: <FileText className="w-4 h-4" />, href: '/biblioteca/documentos' },
      { id: 'modelos', label: 'Modelos', icon: <FileSpreadsheet className="w-4 h-4" />, href: '/biblioteca/modelos' }
    ]
  },
  {
    id: 'ajuda',
    label: 'Ajuda',
    icon: <HelpCircle className="w-5 h-5" />,
    href: '/ajuda'
  },
  {
    id: 'configurar-logins',
    label: 'Configurar Logins',
    icon: <Lock className="w-5 h-5" />,
    href: '/configurar-logins'
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    icon: <Settings className="w-5 h-5" />,
    href: '/configuracoes'
  },
  {
    id: 'fluxos-aprovacao',
    label: 'Fluxos de aprovação',
    icon: <GitBranch className="w-5 h-5" />,
    href: '/fluxos-aprovacao'
  },
  {
    id: 'acessibilidade',
    label: 'Acessibilidade',
    icon: <Eye className="w-5 h-5" />,
    href: '/acessibilidade'
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

  const toggleSubmenu = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const isActive = (href: string) => pathname === href

  const renderMenuItem = (item: MenuItem) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const active = isActive(item.href)

    return (
      <div key={item.id}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
              'hover:bg-primary-50 text-gray-700 hover:text-primary-600',
              active && 'bg-primary-100 text-primary-700 font-medium',
              !isOpen && 'lg:justify-center'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0">{item.icon}</div>
              <span className={cn(
                'text-sm truncate transition-all duration-200',
                !isOpen && 'lg:opacity-0 lg:w-0 lg:hidden'
              )}>
                {item.label}
              </span>
            </div>
            {isOpen && (
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200 flex-shrink-0',
                  isExpanded && 'rotate-180'
                )}
              />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
              'hover:bg-primary-50 text-gray-700 hover:text-primary-600',
              active && 'bg-primary-100 text-primary-700 font-medium',
              !isOpen && 'lg:justify-center'
            )}
            title={!isOpen ? item.label : undefined}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className={cn(
              'text-sm truncate transition-all duration-200',
              !isOpen && 'lg:opacity-0 lg:w-0 lg:hidden'
            )}>
              {item.label}
            </span>
          </Link>
        )}

        {hasSubmenu && isExpanded && isOpen && (
          <div className="ml-8 mt-1 space-y-1 overflow-hidden">
            {item.submenu?.map(subitem => (
              <Link
                key={subitem.id}
                href={subitem.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm',
                  'hover:bg-primary-50 text-gray-600 hover:text-primary-600',
                  isActive(subitem.href) && 'bg-primary-50 text-primary-700 font-medium'
                )}
              >
                {subitem.icon}
                <span className="truncate">{subitem.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-500 text-white rounded-lg shadow-lg hover:bg-primary-600 transition-colors"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-40',
          'flex flex-col',
          isOpen ? 'w-64' : 'w-20',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50",
          !isOpen && 'lg:justify-center'
        )}>
          <div className={cn(
            'flex items-center gap-2 min-w-0',
            !isOpen && 'lg:justify-center'
          )}>
            <div className="bg-primary-500 p-2 rounded-lg flex-shrink-0 shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className={cn(
              'transition-all duration-200 overflow-hidden',
              !isOpen && 'lg:w-0 lg:opacity-0'
            )}>
              <h1 className="text-base font-bold text-primary-600 whitespace-nowrap">EasyCompliance</h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">Sistema de Compliance</p>
            </div>
          </div>

          {/* Toggle Button - Desktop */}
          <button
            onClick={onToggle}
            className={cn(
              "hidden lg:flex items-center justify-center p-1.5 hover:bg-white/80 rounded-lg transition-all duration-200",
              "text-gray-600 hover:text-primary-600",
              !isOpen && 'lg:absolute lg:right-2'
            )}
            title={isOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Footer - User Info */}
        <div className={cn(
          "border-t border-gray-200 p-3 bg-gray-50",
          !isOpen && 'lg:justify-center'
        )}>
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors cursor-pointer",
            !isOpen && 'lg:justify-center'
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              AD
            </div>
            <div className={cn(
              'transition-all duration-200 overflow-hidden min-w-0',
              !isOpen && 'lg:w-0 lg:opacity-0'
            )}>
              <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">Administrador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
