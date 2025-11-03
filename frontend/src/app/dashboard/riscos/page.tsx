'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2
} from 'lucide-react'

interface Risk {
  id: string
  title: string
  description?: string
  category?: string
  type: 'INHERENT' | 'RESIDUAL' | 'TARGET'
  probability: number
  impact: number
  level: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH' | 'CRITICAL'
  isActive: boolean
  createdAt: string
  company: {
    id: string
    name: string
  }
  controls: any[]
}

interface Statistics {
  total: number
  byLevel: Record<string, number>
  byCategory: Record<string, number>
  matrix: number[][]
}

const RISK_LEVEL_LABELS = {
  VERY_LOW: 'Muito Baixo',
  LOW: 'Baixo',
  MEDIUM: 'Médio',
  HIGH: 'Alto',
  VERY_HIGH: 'Muito Alto',
  CRITICAL: 'Crítico',
}

const RISK_LEVEL_COLORS = {
  VERY_LOW: 'bg-green-100 text-green-800',
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  VERY_HIGH: 'bg-red-100 text-red-800',
  CRITICAL: 'bg-purple-100 text-purple-800',
}

const MATRIX_COLORS = [
  ['bg-green-200', 'bg-green-300', 'bg-yellow-200', 'bg-orange-200', 'bg-red-200'],
  ['bg-green-300', 'bg-yellow-200', 'bg-yellow-300', 'bg-orange-300', 'bg-red-300'],
  ['bg-yellow-200', 'bg-yellow-300', 'bg-orange-200', 'bg-orange-400', 'bg-red-400'],
  ['bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-red-400', 'bg-red-500'],
  ['bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-purple-600'],
]

export default function RiscosPage() {
  const [risks, setRisks] = useState<Risk[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [viewMode, setViewMode] = useState<'list' | 'matrix'>('list')

  useEffect(() => {
    fetchRisks()
    fetchStatistics()
  }, [search, selectedLevel, selectedCategory])

  const fetchRisks = async () => {
    try {
      const params = new URLSearchParams()
      params.append('companyId', 'company-123') // TODO: pegar da auth
      if (search) params.append('search', search)
      if (selectedLevel) params.append('level', selectedLevel)
      if (selectedCategory) params.append('category', selectedCategory)

      const response = await fetch(`http://localhost:3101/api/v1/risks?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      const data = await response.json()
      setRisks(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching risks:', error)
      setRisks([])
    } finally {
      setLoading(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        `http://localhost:3101/api/v1/risks/statistics/company-123`, // TODO: pegar da auth
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      const data = await response.json()
      setStatistics(data)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este risco?')) return

    try {
      await fetch(`http://localhost:3101/api/v1/risks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      fetchRisks()
      fetchStatistics()
    } catch (error) {
      console.error('Error deleting risk:', error)
      alert('Erro ao excluir risco')
    }
  }

  const filteredRisks = risks.filter(risk => {
    if (search && !risk.title.toLowerCase().includes(search.toLowerCase())) return false
    if (selectedLevel && risk.level !== selectedLevel) return false
    if (selectedCategory && risk.category !== selectedCategory) return false
    return true
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Riscos</h1>
          <p className="text-gray-600 mt-1">
            Identifique, avalie e gerencie riscos corporativos
          </p>
        </div>
        <Link
          href="/dashboard/riscos/novo"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Risco
        </Link>
      </div>

      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Riscos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {statistics.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riscos Críticos</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {statistics.byLevel.CRITICAL + statistics.byLevel.VERY_HIGH}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riscos Médios</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {statistics.byLevel.MEDIUM}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riscos Baixos</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {statistics.byLevel.LOW + statistics.byLevel.VERY_LOW}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and View Mode */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar riscos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os níveis</option>
              <option value="CRITICAL">Crítico</option>
              <option value="VERY_HIGH">Muito Alto</option>
              <option value="HIGH">Alto</option>
              <option value="MEDIUM">Médio</option>
              <option value="LOW">Baixo</option>
              <option value="VERY_LOW">Muito Baixo</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              {statistics && Object.keys(statistics.byCategory).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'matrix'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Matriz
            </button>
          </div>
        </div>
      </div>

      {/* Risk Matrix View */}
      {viewMode === 'matrix' && statistics && (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Matriz de Riscos 5x5</h2>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="flex items-center mb-4">
                <div className="w-24"></div>
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {['Muito Baixo', 'Baixo', 'Médio', 'Alto', 'Muito Alto'].map((label, i) => (
                    <div key={i} className="text-center text-sm font-medium text-gray-700">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col justify-around mr-4 text-sm font-medium text-gray-700">
                  <div className="h-20 flex items-center">Muito Alto</div>
                  <div className="h-20 flex items-center">Alto</div>
                  <div className="h-20 flex items-center">Médio</div>
                  <div className="h-20 flex items-center">Baixo</div>
                  <div className="h-20 flex items-center">Muito Baixo</div>
                </div>
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {[4, 3, 2, 1, 0].map((prob) =>
                    [0, 1, 2, 3, 4].map((imp) => {
                      const count = statistics.matrix[prob]?.[imp] || 0
                      return (
                        <div
                          key={`${prob}-${imp}`}
                          className={`h-20 rounded-lg ${MATRIX_COLORS[prob][imp]} border-2 border-white flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow`}
                        >
                          <span className="text-2xl font-bold text-gray-800">
                            {count}
                          </span>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">Impacto →</div>
                  <div className="text-sm font-medium text-gray-700">← Probabilidade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Risk List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Probabilidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nível
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Controles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Carregando...
                    </td>
                  </tr>
                ) : filteredRisks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Nenhum risco encontrado
                    </td>
                  </tr>
                ) : (
                  filteredRisks.map((risk) => (
                    <tr key={risk.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {risk.title}
                        </div>
                        {risk.description && (
                          <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                            {risk.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                          {risk.category || 'Outros'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(risk.probability / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">{risk.probability}/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: `${(risk.impact / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">{risk.impact}/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${RISK_LEVEL_COLORS[risk.level]}`}>
                          {RISK_LEVEL_LABELS[risk.level]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {risk.controls.length} controle(s)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/riscos/${risk.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Visualizar"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/dashboard/riscos/${risk.id}/editar`}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(risk.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
