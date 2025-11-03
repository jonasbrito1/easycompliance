'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth.store'
import { ChartCard } from '@/components/dashboard/ChartCard'
import {
  Shield,
  FileText,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Building2,
  Star,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const COLORS = ['#0066CC', '#00CC66', '#FFCC00', '#FF6B6B', '#0088EE', '#33DD88', '#FFD633', '#FF8888']

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

  // Dados dos gráficos
  const treinamentosData = [
    { name: 'Concluídos', value: 145, color: '#00CC66' },
    { name: 'Em Andamento', value: 32, color: '#0066CC' },
    { name: 'Pendentes', value: 18, color: '#FFCC00' },
    { name: 'Atrasados', value: 5, color: '#FF6B6B' }
  ]

  const documentosData = [
    { name: 'Políticas', value: 45 },
    { name: 'Procedimentos', value: 78 },
    { name: 'Instruções', value: 34 },
    { name: 'Formulários', value: 92 }
  ]

  const assinaturasTipoData = [
    { tipo: 'Política de Privacidade', assinadas: 85, pendentes: 15 },
    { tipo: 'Código de Ética', assinadas: 92, pendentes: 8 },
    { tipo: 'Termo de Confidencialidade', assinadas: 78, pendentes: 22 },
    { tipo: 'Política de Segurança', assinadas: 88, pendentes: 12 }
  ]

  const assinaturasDepartamentoData = [
    { name: 'TI', value: 95 },
    { name: 'RH', value: 88 },
    { name: 'Financeiro', value: 92 },
    { name: 'Comercial', value: 85 },
    { name: 'Operações', value: 90 }
  ]

  const riscosData = [
    { categoria: 'Financeiro', inerente: 85, residual: 45, objetivo: 30 },
    { categoria: 'Operacional', inerente: 75, residual: 50, objetivo: 35 },
    { categoria: 'Tecnologia', inerente: 90, residual: 55, objetivo: 40 },
    { categoria: 'Reputacional', inerente: 70, residual: 40, objetivo: 25 },
    { categoria: 'Compliance', inerente: 65, residual: 35, objetivo: 20 }
  ]

  const diligenciaPJCriticidadeData = [
    { name: 'Alta', value: 12, color: '#FF6B6B' },
    { name: 'Média', value: 34, color: '#FFCC00' },
    { name: 'Baixa', value: 54, color: '#00CC66' }
  ]

  const diligenciaPJStatusData = [
    { name: 'Aprovado', value: 67 },
    { name: 'Em Análise', value: 23 },
    { name: 'Reprovado', value: 10 }
  ]

  const gmudStatusData = [
    { mes: 'Jan', abertos: 15, concluídos: 12, cancelados: 2 },
    { mes: 'Fev', abertos: 18, concluídos: 16, cancelados: 1 },
    { mes: 'Mar', abertos: 22, concluídos: 20, cancelados: 2 },
    { mes: 'Abr', abertos: 19, concluídos: 17, cancelados: 1 },
    { mes: 'Mai', abertos: 24, concluídos: 21, cancelados: 3 },
    { mes: 'Jun', abertos: 20, concluídos: 19, cancelados: 1 }
  ]

  const conflitosInteresseData = [
    { name: 'Pendente', value: 5, color: '#FFCC00' },
    { name: 'Em Análise', value: 3, color: '#0066CC' },
    { name: 'Aprovado', value: 45, color: '#00CC66' },
    { name: 'Recusado', value: 2, color: '#FF6B6B' }
  ]

  const chamadosData = [
    { data: '01/01', chamados: 5 },
    { data: '15/01', chamados: 8 },
    { data: '01/02', chamados: 12 },
    { data: '15/02', chamados: 7 },
    { data: '01/03', chamados: 15 },
    { data: '15/03', chamados: 10 },
    { data: '01/04', chamados: 9 },
    { data: '15/04', chamados: 14 }
  ]

  return (
    <div className="space-y-6">
      {/* Treinamentos e Documentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Treinamentos">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={treinamentosData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {treinamentosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {treinamentosData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Documentos">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={documentosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Assinaturas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Assinaturas por Tipo de Documento">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assinaturasTipoData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="tipo" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="assinadas" fill="#00CC66" name="Assinadas" />
              <Bar dataKey="pendentes" fill="#FFCC00" name="Pendentes" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Assinaturas por Departamento">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={assinaturasDepartamentoData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {assinaturasDepartamentoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Brindes, Doações e Interações - Empty States */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Brindes e Hospitalidades" isEmpty emptyMessage="Nenhum resultado encontrado" />
        <ChartCard title="Doações, Patrocínios e Eventos" isEmpty emptyMessage="Nenhum resultado encontrado" />
        <ChartCard title="Interação Poder Público" isEmpty emptyMessage="Nenhum resultado encontrado" />
      </div>

      {/* Requisições Gerais */}
      <ChartCard title="Requisições Gerais" isEmpty emptyMessage="Nenhum resultado encontrado" />

      {/* Riscos */}
      <ChartCard title="Análise de Riscos (Inerente | Residual | Objetivo)">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={riscosData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="categoria" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Risco Inerente" dataKey="inerente" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.5} />
            <Radar name="Risco Residual" dataKey="residual" stroke="#FFCC00" fill="#FFCC00" fillOpacity={0.5} />
            <Radar name="Risco Objetivo" dataKey="objetivo" stroke="#00CC66" fill="#00CC66" fillOpacity={0.5} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Diligências */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Diligência PJ - Criticidade">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPie>
              <Pie
                data={diligenciaPJCriticidadeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {diligenciaPJCriticidadeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Diligência PJ - Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={diligenciaPJStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Diligência PJ - Tipos">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Fornecedores</span>
              <span className="text-lg font-bold text-primary-600">45</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Parceiros</span>
              <span className="text-lg font-bold text-primary-600">32</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Clientes</span>
              <span className="text-lg font-bold text-primary-600">23</span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Diligências PF */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Diligência PF - Criticidade">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPie>
              <Pie
                data={[
                  { name: 'Alta', value: 8, color: '#FF6B6B' },
                  { name: 'Média', value: 25, color: '#FFCC00' },
                  { name: 'Baixa', value: 67, color: '#00CC66' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {[
                  { name: 'Alta', value: 8, color: '#FF6B6B' },
                  { name: 'Média', value: 25, color: '#FFCC00' },
                  { name: 'Baixa', value: 67, color: '#00CC66' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Diligência PF - Status">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Aprovado', value: 78 },
              { name: 'Em Análise', value: 15 },
              { name: 'Reprovado', value: 7 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0066CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Diligência PF - Tipos">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Colaboradores</span>
              <span className="text-lg font-bold text-primary-600">85</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Terceiros</span>
              <span className="text-lg font-bold text-primary-600">15</span>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* GMUD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="GMUD - Status">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gmudStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="abertos" stroke="#0066CC" strokeWidth={2} name="Abertos" />
              <Line type="monotone" dataKey="concluídos" stroke="#00CC66" strokeWidth={2} name="Concluídos" />
              <Line type="monotone" dataKey="cancelados" stroke="#FF6B6B" strokeWidth={2} name="Cancelados" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="GMUD - Criticidade">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { nivel: 'Crítica', quantidade: 5 },
              { nivel: 'Alta', quantidade: 12 },
              { nivel: 'Média', quantidade: 28 },
              { nivel: 'Baixa', quantidade: 45 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nivel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#0066CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* NC - Não Conformidades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="NC - Status"
          isEmpty
          emptyMessage="Ative o módulo Gestão de Não Conformidades para ter acesso a este gráfico"
        />
        <ChartCard
          title="NC - Criticidade"
          isEmpty
          emptyMessage="Ative o módulo Gestão de Não Conformidades para ter acesso a este gráfico"
        />
      </div>

      {/* Chamados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Aberturas de Chamados - 01/01/25 a 29/10/25">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chamadosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="chamados" stroke="#0066CC" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Status do Chamado">
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={[
                  { name: 'Abertos', value: 12, color: '#FFCC00' },
                  { name: 'Em Atendimento', value: 8, color: '#0066CC' },
                  { name: 'Resolvidos', value: 45, color: '#00CC66' },
                  { name: 'Fechados', value: 2, color: '#0088EE' }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { name: 'Abertos', value: 12, color: '#FFCC00' },
                  { name: 'Em Atendimento', value: 8, color: '#0066CC' },
                  { name: 'Resolvidos', value: 45, color: '#00CC66' },
                  { name: 'Fechados', value: 2, color: '#0088EE' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tipo de Chamado */}
      <ChartCard title="Tipo de Chamado">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { tipo: 'Dúvida', quantidade: 25 },
            { tipo: 'Suporte Técnico', quantidade: 18 },
            { tipo: 'Reclamação', quantidade: 8 },
            { tipo: 'Sugestão', quantidade: 12 },
            { tipo: 'Outros', quantidade: 4 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tipo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#0066CC" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Conflito de Interesse */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Conflito de Interesse">
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPie>
              <Pie
                data={conflitosInteresseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {conflitosInteresseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPie>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Conflito - Status">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm font-medium text-green-700">Aprovados</span>
              <span className="text-xl font-bold text-green-600">45</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Em Análise</span>
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-sm font-medium text-yellow-700">Pendentes</span>
              <span className="text-xl font-bold text-yellow-600">5</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-sm font-medium text-red-700">Recusados</span>
              <span className="text-xl font-bold text-red-600">2</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Conflito por Departamento">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { dept: 'TI', total: 12 },
              { dept: 'Comercial', total: 18 },
              { dept: 'RH', total: 8 },
              { dept: 'Financeiro', total: 10 },
              { dept: 'Outros', total: 7 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#0066CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Plano de Ação */}
      <ChartCard title="Plano de Ação" isEmpty emptyMessage="Nenhum resultado encontrado" />
    </div>
  )
}
