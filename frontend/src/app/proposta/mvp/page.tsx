'use client';

import { useState } from 'react';

export default function PropostaMVP() {
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  const proposals = [
    {
      id: 1,
      title: 'Proposta 1 - Investidor Estratégico',
      investment: 'R$ 80.000',
      equity: '20%',
      monthlyBudget: 'R$ 5.000',
      duration: '16 meses',
      highlights: [
        'Menor diluição de equity',
        'Desenvolvimento mais conservador',
        'Ideal para investidor com foco em longo prazo',
        'Crescimento orgânico e sustentável'
      ],
      description: 'Perfeito para investidores que buscam menor exposição inicial e acreditam no potencial de longo prazo.',
      color: 'blue',
      recommended: false
    },
    {
      id: 2,
      title: 'Proposta 2 - Crescimento Acelerado',
      investment: 'R$ 120.000',
      equity: '25%',
      monthlyBudget: 'R$ 7.500',
      duration: '16 meses',
      highlights: [
        'Equilíbrio entre investimento e equity',
        'Desenvolvimento mais robusto',
        'Time maior e mais especializado',
        'Aceleração do go-to-market'
      ],
      description: 'Equilibra investimento e retorno, permitindo desenvolvimento mais rápido e equipe qualificada.',
      color: 'green',
      recommended: true
    },
    {
      id: 3,
      title: 'Proposta 3 - Máximo Impacto',
      investment: 'R$ 170.000',
      equity: '30%',
      monthlyBudget: 'R$ 10.600',
      duration: '16 meses',
      highlights: [
        'Desenvolvimento premium',
        'Time completo de especialistas',
        'IA avançada e features diferenciadas',
        'Posicionamento de mercado agressivo'
      ],
      description: 'Máximo investimento para criar um produto premium com time completo e tecnologia de ponta.',
      color: 'purple',
      recommended: false
    }
  ];

  const getColorClasses = (color: string, selected: boolean) => {
    const colors = {
      blue: {
        border: selected ? 'border-blue-500' : 'border-gray-200',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700',
        badge: 'bg-blue-100 text-blue-800'
      },
      green: {
        border: selected ? 'border-green-500' : 'border-gray-200',
        bg: 'bg-green-50',
        text: 'text-green-700',
        button: 'bg-green-600 hover:bg-green-700',
        badge: 'bg-green-100 text-green-800'
      },
      purple: {
        border: selected ? 'border-purple-500' : 'border-gray-200',
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700',
        badge: 'bg-purple-100 text-purple-800'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              EasyCompliance
            </h1>
            <p className="text-xl text-gray-600">
              Proposta de Parceria Societária - MVP
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Escolha sua Proposta de Investimento
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Apresentamos 3 opções de investimento para o desenvolvimento do MVP da plataforma EasyCompliance.
            Cada proposta oferece diferentes níveis de investimento, equity e velocidade de desenvolvimento.
          </p>
        </div>

        {/* Proposals Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {proposals.map((proposal) => {
            const colors = getColorClasses(proposal.color, selectedProposal === proposal.id);

            return (
              <div
                key={proposal.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 ${colors.border} transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedProposal === proposal.id ? 'ring-4 ring-opacity-50 ring-' + proposal.color + '-300' : ''
                }`}
                onClick={() => setSelectedProposal(proposal.id)}
              >
                {/* Recommended Badge */}
                {proposal.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ RECOMENDADA
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className={`${colors.bg} rounded-xl p-4 mb-4`}>
                    <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                      {proposal.title}
                    </h3>
                    <div className="text-3xl font-black text-gray-900">
                      {proposal.investment}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Equity: <span className="font-bold">{proposal.equity}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Orçamento Mensal:</span>
                      <span className="font-semibold text-gray-900">{proposal.monthlyBudget}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duração:</span>
                      <span className="font-semibold text-gray-900">{proposal.duration}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Destaques:</h4>
                    <ul className="space-y-2">
                      {proposal.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <span className={`${colors.text} mr-2 font-bold`}>✓</span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 italic border-t pt-4">
                    {proposal.description}
                  </p>

                  {/* Select Button */}
                  <button
                    className={`w-full mt-4 ${colors.button} text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}
                    onClick={() => setSelectedProposal(proposal.id)}
                  >
                    {selectedProposal === proposal.id ? 'Selecionada ✓' : 'Selecionar Proposta'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Investment Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💰 Detalhamento do Investimento MVP
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Custos Mensais Principais:</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">🤖 Ferramentas de IA</span>
                  <span className="font-semibold">R$ 600/mês (40%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">🔧 Desenvolvimento</span>
                  <span className="font-semibold">R$ 250/mês (16.7%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">☁️ Infraestrutura Cloud</span>
                  <span className="font-semibold">R$ 200/mês (13.3%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">🔐 Segurança</span>
                  <span className="font-semibold">R$ 120/mês (8%)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">📧 Comunicação & Outros</span>
                  <span className="font-semibold">R$ 330/mês (22%)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Por que investir em IA?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  Diferencial competitivo da plataforma
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  Análise automática de denúncias no Canal de Ética
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  Categorização inteligente de documentos
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  Sugestões de controles de risco
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">▸</span>
                  Reduz custo operacional dos clientes
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🗓️ Roadmap de Desenvolvimento - 16 Meses
          </h2>

          <div className="space-y-6">
            {/* Fase 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Fase 1: MVP (Meses 1-4)</h3>
              <p className="text-gray-700 mb-3">
                Desenvolvimento do produto mínimo viável com funcionalidades core
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                <li>✓ Sistema de autenticação</li>
                <li>✓ Gestão de riscos básica</li>
                <li>✓ Canal de ética</li>
                <li>✓ Gestão de documentos</li>
                <li>✓ Dashboard analytics</li>
                <li>✓ Multi-tenancy</li>
              </ul>
            </div>

            {/* Fase 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Fase 2: Crescimento (Meses 5-10)</h3>
              <p className="text-gray-700 mb-3">
                Expansão de funcionalidades e integração de IA
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                <li>✓ Análise de IA para denúncias</li>
                <li>✓ Automação de workflows</li>
                <li>✓ Relatórios avançados</li>
                <li>✓ Integração com ERPs</li>
                <li>✓ Mobile app</li>
                <li>✓ Notificações inteligentes</li>
              </ul>
            </div>

            {/* Fase 3 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Fase 3: Consolidação (Meses 11-16)</h3>
              <p className="text-gray-700 mb-3">
                Otimização, escala e features premium
              </p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                <li>✓ Marketplace de integrações</li>
                <li>✓ White-label para grandes clientes</li>
                <li>✓ IA preditiva de riscos</li>
                <li>✓ Compliance score</li>
                <li>✓ Blockchain para auditoria</li>
                <li>✓ Exportação e APIs públicas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-xl mb-6 opacity-90">
            Vamos transformar o mercado de compliance juntos
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="http://localhost:3100/dashboard"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Ver Sistema Demo
            </a>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all">
              Agendar Reunião
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 EasyCompliance - Gestão Inteligente de Compliance
          </p>
        </div>
      </div>
    </div>
  );
}
