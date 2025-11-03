'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Construction, Clock } from 'lucide-react'

export default function EmDesenvolvimentoPage() {
  const searchParams = useSearchParams()
  const modulo = searchParams.get('modulo') || 'Este módulo'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
          <Construction className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {modulo} em Desenvolvimento
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Estamos trabalhando para trazer este recurso para você em breve.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center text-blue-700 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Módulos Disponíveis Atualmente:</span>
          </div>
          <ul className="text-blue-600 space-y-2 mt-4">
            <li>✓ Dashboard e Analytics</li>
            <li>✓ Canal de Ética</li>
            <li>✓ Gestão de Documentos</li>
            <li>✓ Gestão de Riscos</li>
          </ul>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  )
}
