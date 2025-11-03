# 🚀 Guia de Inicialização Rápida - EasyCompliance MVP

## 📋 Pré-requisitos

Certifique-se de ter instalado:
- ✅ Node.js 20+ (https://nodejs.org)
- ✅ Docker Desktop (https://www.docker.com/products/docker-desktop)
- ✅ Git (https://git-scm.com)

## 🎯 Inicialização Rápida (5 minutos)

### Passo 1: Subir Banco de Dados
```bash
# Na raiz do projeto
docker-compose up -d
```

Aguarde 15 segundos para PostgreSQL e Redis iniciarem completamente.

### Passo 2: Configurar Backend
```bash
cd backend

# Copiar variáveis de ambiente
cp .env.example .env

# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Criar banco de dados
npx prisma migrate dev --name init

# Iniciar servidor backend
npm run dev
```

Backend estará rodando em: **http://localhost:3001**

### Passo 3: Configurar Frontend (Em outro terminal)
```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor frontend
npm run dev
```

Frontend estará rodando em: **http://localhost:3000**

## 🎨 Acessos Importantes

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **Frontend** | http://localhost:3000 | Interface do usuário |
| **Backend API** | http://localhost:3001/api/v1 | API REST |
| **Swagger Docs** | http://localhost:3001/api/docs | Documentação interativa |
| **Prisma Studio** | `npx prisma studio` | Interface do banco de dados |
| **PostgreSQL** | localhost:5433 | Banco de dados |
| **Redis** | localhost:6380 | Cache |

## 🔑 Credenciais Padrão

### Banco de Dados (PostgreSQL)
- Host: `localhost`
- Port: `5433`
- Database: `easycompliance_dev`
- User: `easycompliance`
- Password: `easy_compliance_2024`

### Redis
- Host: `localhost`
- Port: `6380`
- Password: `easy_redis_2024`

## 🎨 Branding - Cores do Sistema

```css
/* Cores Principais */
--primary-blue: #0066CC     /* Azul principal */
--secondary-green: #00CC66  /* Verde */
--accent-yellow: #FFCC00    /* Amarelo */
--neutral-white: #FFFFFF    /* Branco */

/* Variações */
--blue-dark: #004C99
--blue-light: #3399FF
--green-dark: #009944
--green-light: #33FF99
```

## 📁 Estrutura do Projeto

```
easycompliance/
├── backend/              # API NestJS (Porta 3001)
│   ├── src/
│   │   ├── modules/     # Módulos de negócio
│   │   ├── common/      # Código compartilhado
│   │   └── main.ts      # Entry point
│   └── prisma/          # Database schema
│
├── frontend/            # App Next.js (Porta 3000)
│   ├── src/
│   │   ├── app/        # Next.js 14 App Router
│   │   ├── components/ # Componentes React
│   │   └── lib/        # Utilitários
│   └── public/         # Assets estáticos
│
└── docker-compose.yml  # PostgreSQL + Redis
```

## 🛠️ Comandos Úteis

### Backend
```bash
cd backend

# Desenvolvimento com watch
npm run dev

# Build para produção
npm run build

# Prisma Studio (UI do banco)
npx prisma studio

# Nova migration
npx prisma migrate dev --name nome_da_migration

# Seed do banco
npm run prisma:seed
```

### Frontend
```bash
cd frontend

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

### Docker
```bash
# Subir containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Limpar tudo (cuidado!)
docker-compose down -v
```

## 🐛 Solução de Problemas

### Porta já em uso
Se a porta 3000 ou 3001 já estiver em uso:

**Backend:** Edite `backend/.env` e mude `PORT=3001` para outra porta
**Frontend:** Edite `frontend/package.json` e adicione `-p 3002` no script dev

### Docker não inicia
```bash
# Verificar se Docker está rodando
docker ps

# Reiniciar Docker Desktop
# Windows: Fechar e abrir Docker Desktop
```

### Erro ao conectar no banco
```bash
# Verificar se containers estão rodando
docker-compose ps

# Ver logs do PostgreSQL
docker-compose logs postgres

# Recriar containers
docker-compose down -v
docker-compose up -d
```

## 📚 Próximos Passos

1. ✅ Ambiente configurado e rodando
2. 📝 Explorar Swagger em http://localhost:3001/api/docs
3. 🎨 Abrir Frontend em http://localhost:3000
4. 🗄️ Explorar banco com `npx prisma studio`
5. 🚀 Começar desenvolvimento das features!

## 🎯 Features do MVP (Sprint 1-8)

### ✅ Já Configurado
- Docker (PostgreSQL + Redis)
- Backend NestJS com Prisma
- Schema multi-tenant
- Swagger documentation
- Frontend Next.js com Tailwind

### 🔄 Em Desenvolvimento
- Autenticação JWT
- Sistema multi-tenant
- CRUD de empresas
- CRUD de usuários
- Dashboard inicial

### ⏳ Próximas Sprints
- Gestão de riscos
- Gestão de controles
- Repositório de documentos
- Planos de ação

## 📞 Suporte

Problemas? Consulte:
- **README.md** - Visão geral do projeto
- **GETTING_STARTED.md** - Guia detalhado de início
- **proposta/** - Documentação comercial

---

**Bom desenvolvimento! 🚀**
