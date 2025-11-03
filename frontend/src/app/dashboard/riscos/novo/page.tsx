'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react'

const CATEGORIES = [
  'Estratégico',
  'Operacional',
  'Financeiro',
  'Compliance',
  'Reputacional',
  'Tecnologia',
  'Segurança da Informação',
  'Mercado',
  'Crédito',
  'Liquidez',
  'Ambiental (ESG)',
  'Social (ESG)',
  'Governança (ESG)',
  'Jurídico',
  'Recursos Humanos',
  'Fraude',
  'Corrupção',
  'Outros',
]

const RISK_TYPES = [
  { value: 'INHERENT', label: 'Inerente (sem controles)' },
  { value: 'RESIDUAL', label: 'Residual (com controles)' },
  { value: 'TARGET', label: 'Alvo (objetivo)' },
]

export default function NovoRiscoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'INHERENT',
    probability: 3,
    impact: 3,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'probability' || name === 'impact' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3101/api/v1/risks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          companyId: 'company-123', // TODO: pegar da auth
        }),
      })

      if (response.ok) {
        router.push('/dashboard/riscos')
      } else {
        throw new Error('Erro ao criar risco')
      }
    } catch (error) {
      console.error('Error creating risk:', error)
      alert('Erro ao criar risco. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const riskScore = formData.probability * formData.impact
  const getRiskLevel = () => {
    if (riskScore >= 25) return { label: 'Crítico', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (riskScore >= 20) return { label: 'Muito Alto', color: 'text-red-600', bg: 'bg-red-100' }
    if (riskScore >= 15) return { label: 'Alto', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (riskScore >= 10) return { label: 'Médio', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (riskScore >= 5) return { label: 'Baixo', color: 'text-blue-600', bg: 'bg-blue-100' }
    return { label: 'Muito Baixo', color: 'text-green-600', bg: 'bg-green-100' }
  }

  const level = getRiskLevel()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/riscos"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Riscos
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Novo Risco</h1>
        <p className="text-gray-600 mt-1">
          Identifique e avalie um novo risco organizacional
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Básicas</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título do Risco *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Perda de dados de clientes"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva o risco, suas causas e possíveis consequências..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Risco
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {RISK_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Avaliação do Risco */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Avaliação do Risco</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="probability" className="block text-sm font-medium text-gray-700">
                  Probabilidade
                </label>
                <span className="text-sm font-bold text-blue-600">{formData.probability}/5</span>
              </div>
              <input
                type="range"
                id="probability"
                name="probability"
                min="1"
                max="5"
                value={formData.probability}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Muito Baixa</span>
                <span>Baixa</span>
                <span>Média</span>
                <span>Alta</span>
                <span>Muito Alta</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="impact" className="block text-sm font-medium text-gray-700">
                  Impacto
                </label>
                <span className="text-sm font-bold text-orange-600">{formData.impact}/5</span>
              </div>
              <input
                type="range"
                id="impact"
                name="impact"
                min="1"
                max="5"
                value={formData.impact}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Muito Baixo</span>
                <span>Baixo</span>
                <span>Médio</span>
                <span>Alto</span>
                <span>Muito Alto</span>
              </div>
            </div>

            {/* Risk Score Display */}
            <div className={`${level.bg} rounded-lg p-6 border-2 border-gray-200`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className={`w-8 h-8 ${level.color} mr-4`} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Nível de Risco Calculado</p>
                    <p className={`text-3xl font-bold ${level.color} mt-1`}>
                      {level.label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Score</p>
                  <p className={`text-4xl font-bold ${level.color} mt-1`}>
                    {riskScore}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.probability} × {formData.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/dashboard/riscos"
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Risco
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
