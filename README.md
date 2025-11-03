# 🛡️ EasyCompliance

Sistema inteligente de gestão de compliance com IA integrada para análise automática de denúncias, gestão de riscos e documentos.

## 📋 Sobre o Projeto

EasyCompliance é uma plataforma SaaS **B2B2C multi-tenant** desenvolvida para simplificar a gestão de compliance em empresas de todos os tamanhos. Utiliza inteligência artificial para automatizar processos, reduzir custos operacionais e garantir conformidade com regulamentações (LGPD, Lei Anticorrupção, normas regulatórias).

### 🎯 Diferencial Competitivo

- **Primeiro B2B2C do mercado**: Consultores gerenciam múltiplas empresas
- **Multi-tenant nativo**: Isolamento completo de dados entre organizações
- **IA Integrada**: Análise automática de denúncias, categorização de documentos, sugestões inteligentes
- **Compliance by design**: LGPD, Lei Anticorrupção desde o início

## 🚀 Status do Projeto

```
📍 FASE: MVP em Desenvolvimento Ativo
🏗️  STATUS: Sistema funcional rodando localmente
📅 INVESTIMENTO: R$ 1.500/mês × 4 meses = R$ 6.000
🎯 PRÓXIMA MILESTONE: Deploy em produção
```

## ✨ Funcionalidades Implementadas

### 🤖 Inteligência Artificial
- ✅ Análise Automática de Denúncias (GPT-4)
- ✅ Categorização Inteligente de Documentos
- ✅ Sugestões de Controles de Risco
- ✅ Busca Semântica (Embeddings)

### 📊 Gestão de Riscos
- ✅ Dashboard de analytics em tempo real
- ✅ Matriz de riscos visual e interativa
- ✅ Workflow automatizado
- ✅ Relatórios customizáveis

### 📞 Canal de Ética
- ✅ Denúncias anônimas ou identificadas
- ✅ Análise automática por IA
- ✅ Workflow de investigação
- ✅ Relatórios de conformidade

### 📁 Gestão de Documentos
- ✅ Upload e organização
- ✅ Versionamento automático
- ✅ Busca inteligente
- ✅ Controle de acesso por perfil

### 👥 Multi-Tenancy
- ✅ Isolamento completo de dados
- ✅ Personalização por organização
- ✅ Gestão de usuários e permissões
- ✅ White-label ready

## 🏗️ Arquitetura

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Autenticação**: JWT com refresh tokens
- **IA**: OpenAI API (GPT-4), Claude API, Embeddings

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Estilo**: Tailwind CSS
- **State Management**: React Hooks + Context API
- **Forms**: React Hook Form + Zod

### Infraestrutura
- **Hospedagem**: Hostinger (em avaliação) / AWS
- **Cloud Storage**: Cloudflare R2 / AWS S3
- **CDN**: Cloudflare
- **CI/CD**: GitHub Actions
- **Monitoramento**: Sentry + DataDog

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/jonasbrito1/easycompliance.git
cd easycompliance
```

### 2. Configure as variáveis de ambiente

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://easycompliance:easy_compliance_2024@localhost:5433/easycompliance_dev"
REDIS_URL="redis://:easycompliance_redis_2024@localhost:6380"
JWT_SECRET="seu_jwt_secret_aqui"
JWT_EXPIRATION="7d"
PORT=3101
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3101/api/v1
```

### 3. Inicie o banco de dados
```bash
docker-compose up -d
```

### 4. Configure o backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 5. Configure o frontend
```bash
cd frontend
npm install
npm run dev
```

### 6. Acesse o sistema
- **Frontend**: http://localhost:3100
- **Backend API**: http://localhost:3101
- **Dashboard**: http://localhost:3100/dashboard
- **Proposta MVP**: http://localhost:3100/proposta/mvp
- **Custos MVP**: http://localhost:3100/proposta/mvp/custos-mvp

## 📁 Estrutura do Projeto

```
easycompliance/
├── backend/                    # API NestJS
│   ├── prisma/                # Schema e migrações
│   │   ├── schema.prisma      # Modelo de dados
│   │   └── migrations/        # Migrações do banco
│   ├── src/
│   │   ├── auth/              # Autenticação JWT
│   │   ├── users/             # Gestão de usuários
│   │   ├── organizations/     # Multi-tenancy
│   │   ├── risks/             # Gestão de riscos
│   │   ├── whistleblowing/    # Canal de ética
│   │   └── documents/         # Gestão de documentos
│   ├── .env                   # Configurações (não commitado)
│   └── package.json
│
├── frontend/                  # Aplicação Next.js
│   ├── src/
│   │   ├── app/              # App Router (Next.js 14)
│   │   │   ├── dashboard/    # Dashboard principal
│   │   │   └── proposta/     # Páginas de proposta
│   │   │       ├── mvp/      # Proposta principal
│   │   │       └── mvp/custos-mvp/  # Detalhamento de custos
│   │   ├── components/       # Componentes React
│   │   └── lib/              # Utilitários
│   ├── .env.local            # Configurações (não commitado)
│   └── package.json
│
├── proposta/                 # Arquivos de proposta comercial
│   ├── deploy-web/          # Versão standalone para web
│   │   ├── custos-mvp.html  # Planilha responsiva
│   │   ├── GUIA_UPLOAD.md   # Guia de deploy
│   │   └── MELHORIAS_RESPONSIVIDADE.md
│   ├── index.html           # Proposta principal
│   ├── roadmap-presentation.html
│   └── COMECE_AQUI.txt     # Guia inicial
│
├── docker-compose.yml       # PostgreSQL + Redis
├── .gitignore               # Arquivos ignorados
└── README.md                # Este arquivo
```

## 💰 Investimento MVP

### Orçamento: R$ 1.500/mês × 4 meses = R$ 6.000

**Distribuição de Custos:**

| Categoria | Mensal | Total | % |
|-----------|--------|-------|---|
| 🤖 **IA** | R$ 600 | R$ 2.400 | 40% |
| 🔧 **Desenvolvimento** | R$ 250 | R$ 1.000 | 16.7% |
| ☁️ **Infraestrutura** | R$ 200 | R$ 800 | 13.3% |
| 🔐 **Segurança** | R$ 120 | R$ 480 | 8% |
| 📧 **Comunicação** | R$ 80 | R$ 320 | 5.3% |
| 📦 **Storage** | R$ 60 | R$ 240 | 4% |
| 🎯 **Gestão** | R$ 50 | R$ 200 | 3.3% |
| 💡 **Buffer** | R$ 140 | R$ 560 | 9.3% |
| **TOTAL** | **R$ 1.500** | **R$ 6.000** | **100%** |

**Ver detalhamento completo**:
- Web: [custos-mvp.html](proposta/deploy-web/custos-mvp.html)
- Sistema: http://localhost:3100/proposta/mvp/custos-mvp

### Por que R$ 1.500/mês?

✅ **0% em salários** - Equipe trabalha por equity
✅ **40% em IA** - Diferencial competitivo real
✅ **Profissional desde o início** - Não reconstruir depois
✅ **Escalável** - Aguenta crescimento de 10x

**Comparativo**: Empresa tradicional gastaria R$ 25.000-35.000/mês em salários (2 devs + 1 designer). Estamos pedindo apenas **6% do custo tradicional**.

## 🗓️ Roadmap - 16 Meses

### ✅ Fase 1: MVP (Meses 1-4) - EM DESENVOLVIMENTO
- ✅ Sistema de autenticação (JWT)
- ✅ Gestão de riscos básica
- ✅ Canal de ética
- ✅ Gestão de documentos
- ✅ Dashboard analytics
- ✅ Multi-tenancy
- ✅ Integração com IA (GPT-4, Claude)

### ⏳ Fase 2: Crescimento (Meses 5-10)
- Análise de IA para denúncias
- Automação de workflows
- Relatórios avançados
- Integração com ERPs
- Mobile app (PWA)
- Notificações inteligentes

### ⏳ Fase 3: Consolidação (Meses 11-16)
- Marketplace de integrações
- White-label para grandes clientes
- IA preditiva de riscos
- Compliance score
- Blockchain para auditoria
- Exportação e APIs públicas

## 📊 ROI Projetado

### Cenário Conservador
- **5 clientes** × R$ 500/mês = **R$ 2.500/mês**
- **MRR**: R$ 2.500
- **Payback**: 2.4 meses após lançamento
- **ROI em 12 meses**: 400%

### Cenário Realista
- **15 clientes** × R$ 700/mês = **R$ 10.500/mês**
- **MRR**: R$ 10.500
- **Payback**: 0.6 meses (menos de 1 mês!)
- **ROI em 12 meses**: 2.000%

**Market Size**: Mercado de compliance no Brasil movimenta +R$ 2 bilhões/ano. Com apenas **0.01% de market share**, teremos R$ 200.000/mês em receita.

## 🧪 Testes

```bash
# Backend
cd backend
npm test
npm run test:e2e
npm run test:cov

# Frontend
cd frontend
npm test
npm run test:e2e
```

## 📦 Deploy

### Variáveis de Produção

Configure as variáveis de ambiente para produção:

```bash
# Backend
DATABASE_URL="postgresql://user:password@host:5432/easycompliance_prod"
REDIS_URL="redis://host:6379"
JWT_SECRET="strong_secret_here"
NODE_ENV="production"

# Frontend
NEXT_PUBLIC_API_URL=https://api.easycompliance.com.br/api/v1
```

### Build e Deploy

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm start
```

## 🔒 Segurança

- ✅ Autenticação JWT com refresh tokens
- ✅ HTTPS obrigatório (TLS 1.3)
- ✅ Rate limiting (100 req/min)
- ✅ Validação de inputs (Zod)
- ✅ Sanitização de dados
- ✅ CORS configurado
- ✅ SQL Injection protection (Prisma)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Logs de auditoria
- ✅ Backups diários automatizados
- ✅ Criptografia AES-256 (at rest)

## 🤝 Estrutura de Parceria

### Equity
- **CEO**: Estratégia, vendas, relacionamento, network
- **CTO**: Arquitetura, desenvolvimento, infraestrutura, produto

Distribuição de equity varia por proposta (consulte `/proposta/`):
- Proposta 1: 82% / 18%
- Proposta 2: 70% / 30% ⭐ Recomendada
- Proposta 3: 60% / 40%

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Código

- **Backend**: NestJS + Prisma + TypeScript
- **Frontend**: Next.js + React + TypeScript
- **Estilo**: Tailwind CSS (utility-first)
- **Commits**: Conventional Commits
- **Testes**: Jest + React Testing Library

## 📖 Documentação Adicional

- **Roadmap Executivo**: [proposta/roadmap-presentation.html](proposta/roadmap-presentation.html)
- **Proposta Comercial**: [proposta/index.html](proposta/index.html)
- **Guia de Upload**: [proposta/deploy-web/GUIA_UPLOAD.md](proposta/deploy-web/GUIA_UPLOAD.md)
- **Melhorias de Responsividade**: [proposta/deploy-web/MELHORIAS_RESPONSIVIDADE.md](proposta/deploy-web/MELHORIAS_RESPONSIVIDADE.md)
- **Comece Aqui**: [proposta/COMECE_AQUI.txt](proposta/COMECE_AQUI.txt)

## 📄 Licença

Este projeto é propriedade privada. Todos os direitos reservados.

## 📞 Contato

**Desenvolvedor**: Jonas Brito
**GitHub**: [@jonasbrito1](https://github.com/jonasbrito1)
**Repositório**: https://github.com/jonasbrito1/easycompliance
**Projeto**: EasyCompliance - Gestão Inteligente de Compliance

## 🎯 Status e Versão

**Versão Atual**: 1.0.0 (MVP)
**Status**: 🟢 Em Desenvolvimento Ativo
**Última Atualização**: Novembro 2025
**Próxima Release**: MVP Deploy (previsto 4 meses)

### Milestones Recentes
- ✅ Estrutura base do backend (NestJS + Prisma)
- ✅ Estrutura base do frontend (Next.js 14)
- ✅ Docker setup (PostgreSQL + Redis)
- ✅ Sistema de autenticação JWT
- ✅ Multi-tenancy implementado
- ✅ Páginas de proposta MVP
- ✅ Planilha de custos responsiva
- ✅ Integração com APIs de IA

---

**🚀 Transformando a gestão de compliance com inteligência artificial**

> 📍 **Destaque**: O investimento de R$ 6.000 representa apenas **3% da receita de 1 mês** no cenário realista (15 clientes).
