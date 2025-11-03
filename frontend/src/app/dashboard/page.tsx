'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/stores/auth.store'
import {
  Shield,
  FileText,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  Star,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
  Bell,
  Activity
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function DashboardHome() {
  const router = useRouter()
  const { user, isAuthenticated, initializeAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
    setIsLoading(false)
  }, [initializeAuth])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const quickStats = [
    {
      title: 'Riscos Identificados',
      value: '24',
      change: '+3 esta semana',
      icon: AlertTriangle,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
      href: '/gestao-riscos'
    },
    {
      title: 'Controles Ativos',
      value: '156',
      change: '+12 este mês',
      icon: CheckCircle2,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      href: '/controles'
    },
    {
      title: 'Documentos Pendentes',
      value: '8',
      change: 'Requer atenção',
      icon: FileText,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      href: '/documentos'
    },
    {
      title: 'Treinamentos Ativos',
      value: '32',
      change: '145 concluídos',
      icon: GraduationCap,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      href: '/universidade'
    }
  ]

  const quickActions = [
    {
      title: 'Ver Analytics Completo',
      description: 'Acesse dashboards e relatórios detalhados',
      icon: BarChart3,
      color: 'from-primary-500 to-primary-600',
      href: '/dashboard/analytics'
    },
    {
      title: 'Avaliar Novo Risco',
      description: 'Identificar e cadastrar riscos',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      href: '/gestao-riscos/novo'
    },
    {
      title: 'Gerenciar Documentos',
      description: 'Upload e gestão de documentação',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      href: '/documentos'
    },
    {
      title: 'Iniciar Treinamento',
      description: 'Criar programa de capacitação',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      href: '/universidade/novo'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Novo risco cadastrado',
      description: 'Risco de segurança da informação identificado',
      time: '2 horas atrás',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 2,
      title: 'Documento aprovado',
      description: 'Política de Privacidade v2.0',
      time: '5 horas atrás',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Treinamento iniciado',
      description: '25 colaboradores em LGPD',
      time: '1 dia atrás',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <span className="text-sm font-medium text-yellow-300">Bem-vindo ao EasyCompliance</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Olá, {user.name}!
            </h1>
            <p className="text-lg opacity-90 mb-4">
              Aqui está um resumo rápido do seu sistema de compliance
            </p>
            <div className="flex items-center gap-4 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="capitalize">{formatDate(new Date())}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>{user.tenant?.name || 'EasyCompliance'}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4">
            <Link
              href="/dashboard/analytics"
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[200px] hover:bg-white/20 transition-all duration-200 cursor-pointer group"
            >
              <BarChart3 className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-sm opacity-90 mb-1">Ver Dashboards</div>
              <div className="text-xs opacity-75">Análises completas</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.lightColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-900 mb-1">{stat.title}</div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Ações Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`group relative overflow-hidden bg-gradient-to-br ${action.color} rounded-xl p-6 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <div className="relative z-10">
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Atividades Recentes</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`${activity.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium text-lg">Nenhuma atividade recente</p>
                <p className="text-sm text-gray-400 mt-2">As atividades do sistema aparecerão aqui</p>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                href="/atividades"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 justify-center"
              >
                Ver todas as atividades
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Status do Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Conformidade</span>
                </div>
                <span className="text-sm font-bold text-green-600">100%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700">Sistema</span>
                </div>
                <span className="text-sm font-bold text-blue-600">Online</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Usuários Ativos</span>
                </div>
                <span className="text-sm font-bold text-green-600">8</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link
                href="/gestao-riscos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-primary-600"
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Gestão de Riscos</span>
              </Link>
              <Link
                href="/documentos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-primary-600"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Documentos</span>
              </Link>
              <Link
                href="/universidade"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-primary-600"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Treinamentos</span>
              </Link>
              <Link
                href="/configuracoes"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-primary-600"
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Configurações</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
