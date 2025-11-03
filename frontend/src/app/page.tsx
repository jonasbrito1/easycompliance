'use client'

import { Shield, Users, FileCheck, TrendingUp, BarChart3, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-600">EasyCompliance</h1>
                <p className="text-sm text-gray-600">Plataforma de Compliance & Riscos</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/login'}
              className="btn btn-primary"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Gestão de Compliance<br />
            <span className="text-primary-500">Simplificada e Eficiente</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A primeira plataforma B2B2C do mercado que permite consultores gerenciarem
            compliance de múltiplas empresas simultaneamente.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="btn btn-primary text-lg px-8 py-3"
            >
              Começar Agora
            </button>
            <button className="btn btn-outline text-lg px-8 py-3">
              Agendar Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 animate-slide-up">
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">Multi</div>
            <p className="text-gray-600">Tenant Nativo</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-secondary-500 mb-2">100%</div>
            <p className="text-gray-600">Cloud Native</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-accent-500 mb-2">IA</div>
            <p className="text-gray-600">Automação Inteligente</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
            <p className="text-gray-600">Disponibilidade</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Funcionalidades Principais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Multi-Tenant"
              description="Gerencie múltiplas empresas com isolamento completo de dados e troca instantânea."
              color="primary"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Gestão de Riscos"
              description="Matriz de riscos completa com scoring automático e visualização interativa."
              color="secondary"
            />
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" />}
              title="Controles"
              description="Gestão completa de controles preventivos, detectivos e corretivos."
              color="accent"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Analytics"
              description="Dashboards em tempo real com KPIs e indicadores de performance."
              color="primary"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8" />}
              title="Segurança"
              description="LGPD compliant com criptografia ponta-a-ponta e auditoria completa."
              color="secondary"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Compliance"
              description="Conformidade com normas regulatórias e best practices internacionais."
              color="accent"
            />
          </div>
        </div>

        {/* CTA Final */}
        <div className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-12">
          <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-xl mb-8 opacity-90">
            Transforme a gestão de compliance da sua empresa hoje mesmo.
          </p>
          <button className="btn bg-white text-primary-500 hover:bg-gray-100 text-lg px-8 py-3">
            Solicitar Demonstração
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 EasyCompliance. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Plataforma B2B2C de Compliance & Gestão de Riscos
          </p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-600',
    accent: 'bg-accent-100 text-accent-600',
  }

  return (
    <div className="card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <div className={`${colorClasses[color]} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
