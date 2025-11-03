'use client';

import { useState } from 'react';

export default function CustosMVP() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const summary = {
    monthlyBudget: 1500,
    duration: 4,
    totalInvestment: 6000
  };

  const exportToExcel = () => {
    // Preparar dados para CSV (compatível com Excel)
    let csvContent = '\uFEFF'; // BOM para UTF-8

    // Cabeçalho
    csvContent += 'PLANILHA DE CUSTOS MVP - EASYCOMPLIANCE\n';
    csvContent += `Período: ${summary.duration} meses\n`;
    csvContent += `Investimento Mensal: R$ ${summary.monthlyBudget.toLocaleString('pt-BR')}\n`;
    csvContent += `Investimento Total: R$ ${summary.totalInvestment.toLocaleString('pt-BR')}\n\n`;

    // Resumo por categoria
    csvContent += 'RESUMO POR CATEGORIA\n';
    csvContent += 'Categoria;Mensal (R$);Total 4 Meses (R$);% Orçamento;Prioridade\n';

    categories.forEach(cat => {
      csvContent += `${cat.name};${cat.monthlyCost};${cat.totalCost};${cat.percentage}%;${cat.priority}\n`;
    });

    csvContent += '\n\n';

    // Detalhamento de cada categoria
    categories.forEach(cat => {
      csvContent += `\n${cat.name.toUpperCase()}\n`;
      csvContent += `Descrição: ${cat.description}\n`;
      csvContent += 'Item;Custo Mensal (R$);Custo Total (R$);Justificativa;Uso\n';

      cat.items.forEach(item => {
        const justification = item.justification.replace(/;/g, ',').replace(/\n/g, ' ');
        csvContent += `${item.name};${item.cost};${item.cost * 4};${justification};${item.use}\n`;
      });

      csvContent += `SUBTOTAL;${cat.monthlyCost};${cat.totalCost};;\n`;
      csvContent += '\n';
    });

    // Criar blob e download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `EasyCompliance_Custos_MVP_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = [
    {
      id: 'ai',
      icon: '🤖',
      name: 'Ferramentas de IA',
      monthlyCost: 600,
      totalCost: 2400,
      percentage: 40,
      color: 'blue',
      priority: 'Crítico',
      description: 'A IA é o diferencial competitivo da plataforma. Investir nisso desde o MVP garante automação inteligente e redução de custos operacionais para os clientes.',
      items: [
        {
          name: 'OpenAI API (GPT-4)',
          cost: 350,
          justification: 'Análise automática de denúncias no Canal de Ética, categorização de documentos, sugestões de controles de risco e assistente de compliance. É o coração da automação inteligente.',
          use: 'Usado em 80% das features principais'
        },
        {
          name: 'Claude API (Anthropic)',
          cost: 150,
          justification: 'Análise de documentos longos, geração de relatórios complexos e backup do OpenAI. Garante redundância e qualidade na análise de textos extensos.',
          use: 'Backup e análises complexas'
        },
        {
          name: 'OpenAI Embeddings',
          cost: 50,
          justification: 'Busca semântica de documentos e similaridade de riscos. Permite encontrar informações relevantes mesmo sem palavras-chave exatas.',
          use: 'Sistema de busca inteligente'
        },
        {
          name: 'Hugging Face',
          cost: 30,
          justification: 'Modelos open-source para processamento de linguagem natural. Reduz dependência de APIs pagas para tarefas mais simples.',
          use: 'Processamento auxiliar'
        },
        {
          name: 'Reserva técnica IA',
          cost: 20,
          justification: 'Buffer para testes, experimentação e novos modelos. Essencial para inovação contínua.',
          use: 'Testes e inovação'
        }
      ]
    },
    {
      id: 'dev',
      icon: '🔧',
      name: 'Ferramentas de Desenvolvimento',
      monthlyCost: 250,
      totalCost: 1000,
      percentage: 16.7,
      color: 'indigo',
      priority: 'Alto',
      description: 'Ferramentas profissionais aceleram o desenvolvimento em até 40%. O que gastamos aqui, economizamos em tempo e qualidade.',
      items: [
        {
          name: 'GitHub Pro',
          cost: 60,
          justification: 'Repositórios privados ilimitados, GitHub Actions para CI/CD automático e GitHub Copilot que acelera a programação em 30%.',
          use: 'Versionamento e automação'
        },
        {
          name: 'Vercel Pro',
          cost: 100,
          justification: 'Hospedagem frontend Next.js com deploy automático, preview de branches e Edge Functions. Zero configuração de servidor.',
          use: 'Deploy e hospedagem frontend'
        },
        {
          name: 'Figma Professional',
          cost: 60,
          justification: 'Design System completo, protótipos interativos e colaboração designer/desenvolvedor em tempo real. Reduz retrabalho.',
          use: 'Design e prototipação'
        },
        {
          name: 'Postman Team',
          cost: 30,
          justification: 'Documentação automática da API, testes automatizados e ambientes compartilhados. Essencial para integração.',
          use: 'Testes e documentação API'
        }
      ]
    },
    {
      id: 'cloud',
      icon: '☁️',
      name: 'Infraestrutura Cloud',
      monthlyCost: 200,
      totalCost: 800,
      percentage: 13.3,
      color: 'green',
      priority: 'Crítico',
      description: 'Infraestrutura escalável e profissional desde o início. Evita reescrita e migração custosa no futuro.',
      items: [
        {
          name: 'Servidor Backend',
          cost: 80,
          justification: '2 vCPU, 4GB RAM para container NestJS. Suporta 100+ usuários simultâneos. Inclui ambientes Dev + Staging.',
          use: 'API e lógica de negócio'
        },
        {
          name: 'Banco de Dados PostgreSQL',
          cost: 60,
          justification: 'PostgreSQL 15 com 20GB SSD e backup automático diário. Compliance exige dados seguros e recuperáveis.',
          use: 'Armazenamento de dados'
        },
        {
          name: 'Cache Redis',
          cost: 30,
          justification: '1GB RAM para cache de sessões, rate limiting e otimização de performance. Reduz carga no banco em 60%.',
          use: 'Performance e sessões'
        },
        {
          name: 'Domínio & SSL',
          cost: 15,
          justification: 'Domínio .com.br profissional e certificado SSL (Let\'s Encrypt via Cloudflare). LGPD exige HTTPS.',
          use: 'Segurança e branding'
        },
        {
          name: 'Serverless Functions',
          cost: 15,
          justification: 'Em avaliação: Hostinger ou alternativas (AWS Lambda, Vercel Functions). Para processamento assíncrono e jobs programados. Tecnologia pode ser ajustada durante desenvolvimento conforme melhorias identificadas.',
          use: 'Processamento em background (a definir)'
        }
      ]
    },
    {
      id: 'security',
      icon: '🔐',
      name: 'Segurança & Monitoramento',
      monthlyCost: 120,
      totalCost: 480,
      percentage: 8,
      color: 'red',
      priority: 'Crítico',
      description: 'Segurança não é opcional em compliance. LGPD exige proteção adequada e rastreabilidade de todos os dados sensíveis.',
      items: [
        {
          name: 'Sentry',
          cost: 50,
          justification: 'Monitoramento de erros em tempo real, performance tracking e alertas imediatos. Detecta problemas antes dos usuários.',
          use: 'Detecção de bugs'
        },
        {
          name: 'LogRocket / FullStory',
          cost: 40,
          justification: 'Session replay para debugging de problemas reportados. Ver exatamente o que o usuário viu quando o erro ocorreu.',
          use: 'Debugging avançado'
        },
        {
          name: 'Cloudflare Pro',
          cost: 30,
          justification: 'Proteção DDoS, WAF (Web Application Firewall), rate limiting e analytics. Segurança em camadas.',
          use: 'Proteção contra ataques'
        }
      ]
    },
    {
      id: 'communication',
      icon: '📧',
      name: 'Comunicação & Email',
      monthlyCost: 80,
      totalCost: 320,
      percentage: 5.3,
      color: 'orange',
      priority: 'Alto',
      description: 'Comunicação profissional e confiável. Emails transacionais têm 99.9% de entrega garantida.',
      items: [
        {
          name: 'SendGrid',
          cost: 50,
          justification: '40.000 emails/mês com templates profissionais. Confirmação de cadastro, alertas de compliance, notificações de denúncias.',
          use: 'Estimativa: 2.000 emails/mês (MVP)'
        },
        {
          name: 'Twilio SMS',
          cost: 30,
          justification: '150 SMS/mês para autenticação 2FA e alertas críticos. Segurança adicional e notificações urgentes.',
          use: 'Estimativa: 50 SMS/mês (MVP)'
        }
      ]
    },
    {
      id: 'storage',
      icon: '📦',
      name: 'Armazenamento & CDN',
      monthlyCost: 60,
      totalCost: 240,
      percentage: 4,
      color: 'indigo',
      priority: 'Médio',
      description: 'Armazenamento seguro de documentos com CDN global. Documentos carregam rápido em qualquer lugar do Brasil.',
      items: [
        {
          name: 'AWS S3',
          cost: 40,
          justification: '100GB de armazenamento para PDFs, políticas de compliance e evidências. Redundância e durabilidade de 99.999999999%.',
          use: 'Estimativa: 1GB/mês (500 docs)'
        },
        {
          name: 'CloudFront CDN',
          cost: 20,
          justification: '100GB de distribuição global. Documentos carregam em <500ms em qualquer região do Brasil.',
          use: 'Entrega rápida de arquivos'
        }
      ]
    },
    {
      id: 'management',
      icon: '💼',
      name: 'Ferramentas de Gestão',
      monthlyCost: 50,
      totalCost: 200,
      percentage: 3.3,
      color: 'pink',
      priority: 'Médio',
      description: 'Organização e produtividade. Documentação centralizada e gestão eficiente de tarefas.',
      items: [
        {
          name: 'Notion Team',
          cost: 30,
          justification: 'Documentação do projeto, knowledge base, sprint planning e onboarding de clientes beta. Tudo em um só lugar.',
          use: 'Documentação e planejamento'
        },
        {
          name: 'Linear',
          cost: 20,
          justification: 'Gestão de tarefas, bug tracking, roadmap e integrações Git. Interface limpa e rápida.',
          use: 'Gestão de desenvolvimento'
        }
      ]
    },
    {
      id: 'buffer',
      icon: '⚡',
      name: 'Imprevistos & Buffer',
      monthlyCost: 140,
      totalCost: 560,
      percentage: 9.3,
      color: 'yellow',
      priority: 'Essencial',
      description: 'Todo projeto tem imprevistos. Esse buffer garante que não vamos parar por falta de recursos.',
      items: [
        {
          name: 'Overages de API',
          cost: 50,
          justification: 'Picos de uso de IA durante testes intensivos ou demonstrações. Melhor ter buffer que parar o desenvolvimento.',
          use: 'Proteção contra picos'
        },
        {
          name: 'Testes com usuários',
          cost: 30,
          justification: 'Incentivos para beta testers (vouchers, brindes). Feedback real de usuários é invaluável.',
          use: '5 beta testers'
        },
        {
          name: 'Integrações extras',
          cost: 30,
          justification: 'APIs não previstas, webhooks adicionais. Flexibilidade para adicionar integrações importantes.',
          use: 'Integrações emergentes'
        },
        {
          name: 'Contingência técnica',
          cost: 30,
          justification: 'Problemas técnicos inesperados, mudanças de preço de serviços, migrações necessárias.',
          use: 'Segurança do projeto'
        }
      ]
    }
  ];

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
      green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-800' },
      red: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-800' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-800' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💰 Planilha de Custos MVP
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                EasyCompliance - Detalhamento completo do investimento
              </p>
            </div>
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">Investimento Mensal</div>
            <div className="text-4xl font-black mb-1">
              R$ {summary.monthlyBudget.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm opacity-75">por mês</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">Duração do MVP</div>
            <div className="text-4xl font-black mb-1">
              {summary.duration} meses
            </div>
            <div className="text-sm opacity-75">desenvolvimento intensivo</div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">Investimento Total</div>
            <div className="text-4xl font-black mb-1">
              R$ {summary.totalInvestment.toLocaleString('pt-BR')}
            </div>
            <div className="text-sm opacity-75">custos operacionais</div>
          </div>
        </div>

        {/* Why R$ 1,500/month? */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Por que R$ 1.500 por mês?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">✓ Valor Justificado:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• <strong>40% em IA</strong> - Diferencial competitivo real</li>
                <li>• <strong>0% em salários</strong> - Apenas ferramentas e infraestrutura</li>
                <li>• <strong>Profissional desde o início</strong> - Não teremos que reconstruir depois</li>
                <li>• <strong>Escalável</strong> - Infraestrutura aguenta crescimento de 10x</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">✓ O que NÃO está incluído:</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• <strong>Salários da equipe</strong> - Parceria por equity</li>
                <li>• <strong>Marketing</strong> - Investimento separado pós-MVP</li>
                <li>• <strong>Escritório físico</strong> - Trabalho remoto</li>
                <li>• <strong>Despesas operacionais</strong> - Apenas custo técnico</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-white/10 rounded-lg p-4">
            <p className="text-sm">
              <strong>Comparativo:</strong> Uma empresa tradicional gastaria R$ 25.000-35.000/mês em salários (2 devs + 1 designer).
              Estamos pedindo apenas <strong>R$ 1.500/mês</strong> (6% do custo tradicional) porque a equipe trabalha por equity.
            </p>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📊 Detalhamento por Categoria
          </h2>

          {categories.map((category) => {
            const colors = getColorClasses(category.color);
            const isExpanded = expandedCategory === category.id;

            return (
              <div
                key={category.id}
                className={`bg-white rounded-xl shadow-lg border-2 ${isExpanded ? colors.border : 'border-gray-200'} overflow-hidden transition-all duration-300`}
              >
                {/* Category Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="text-4xl">{category.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                            {category.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-gray-900">
                        R$ {category.monthlyCost}
                        <span className="text-sm font-normal text-gray-500">/mês</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {category.percentage}% do orçamento
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Total 4 meses: R$ {category.totalCost.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                {isExpanded && (
                  <div className={`${colors.bg} border-t-2 ${colors.border}`}>
                    <div className="p-6 space-y-4">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                              <p className="text-sm text-gray-700 mb-2">{item.justification}</p>
                              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                <span className="mr-1">📌</span> {item.use}
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="text-lg font-bold text-gray-900">
                                R$ {item.cost}
                              </div>
                              <div className="text-xs text-gray-500">
                                R$ {(item.cost * 4).toLocaleString('pt-BR')} total
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visual Chart */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📈 Distribuição Visual do Orçamento
          </h2>
          <div className="space-y-3">
            {categories.map((category) => {
              const colors = getColorClasses(category.color);
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {category.icon} {category.name}
                    </span>
                    <span className="font-bold text-gray-900">
                      R$ {category.monthlyCost} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 ${colors.border.replace('border', 'bg')} transition-all duration-500`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROI Projection */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-8 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            💎 Projeção de Retorno sobre Investimento (ROI)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cenário Conservador:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>5 clientes</strong> pagando R$ 500/mês = R$ 2.500/mês</li>
                <li>• <strong>MRR (Monthly Recurring Revenue):</strong> R$ 2.500</li>
                <li>• <strong>Payback:</strong> 2.4 meses após lançamento</li>
                <li>• <strong>ROI em 12 meses:</strong> 400%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cenário Realista:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>15 clientes</strong> pagando R$ 700/mês = R$ 10.500/mês</li>
                <li>• <strong>MRR (Monthly Recurring Revenue):</strong> R$ 10.500</li>
                <li>• <strong>Payback:</strong> 0.6 meses (menos de 1 mês!)</li>
                <li>• <strong>ROI em 12 meses:</strong> 2.000%</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Importante:</strong> O mercado de compliance no Brasil movimenta mais de R$ 2 bilhões/ano.
              Com apenas 0.01% de market share, teremos R$ 200.000/mês em receita. O investimento de R$ 6.000
              representa <strong>3% da receita de 1 mês</strong> no cenário realista.
            </p>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 EasyCompliance - Gestão Inteligente de Compliance | Planilha de Custos MVP
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Valores atualizados e justificados para desenvolvimento de 4 meses
          </p>
        </div>
      </div>
    </div>
  );
}
