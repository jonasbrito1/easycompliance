# EasyCompliance MVP

Sistema de Gestão de Compliance Multi-Tenant desenvolvido com as melhores práticas de engenharia de software.

## 🚀 Stack Tecnológica

### Backend
- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Tipagem estática
- **TypeORM** - ORM para TypeScript/JavaScript
- **MySQL 8.0** - Banco de dados relacional
- **Redis** - Cache e sessões
- **JWT** - Autenticação
- **Swagger** - Documentação da API

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP

### DevOps
- **Docker & Docker Compose** - Containerização
- **phpMyAdmin** - Interface web para MySQL

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (versão 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (versão 2.0+)
- [Node.js](https://nodejs.org/) (versão 20+) - Opcional, para desenvolvimento local
- [Git](https://git-scm.com/)

---

## 🎯 Início Rápido

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd easycompliance/mvp
```

### 2. Configure as Variáveis de Ambiente

```bash
# Backend
cd backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
cd ..
```

### 3. Inicie os Containers Docker

```bash
# A partir da pasta mvp/
docker-compose up -d
```

Este comando irá:
- ✅ Criar e iniciar o container MySQL (porta 3306)
- ✅ Criar e iniciar o phpMyAdmin (porta 8080)
- ✅ Criar e iniciar o Redis (porta 6379)
- ✅ Criar e iniciar o Backend API (porta 3001)
- ✅ Criar e iniciar o Frontend (porta 3000)
- ✅ Executar as migrations do banco de dados
- ✅ Popular com dados de exemplo

### 4. Aguarde a Inicialização

Aguarde cerca de 2-3 minutos para que todos os serviços sejam iniciados. Você pode acompanhar os logs:

```bash
docker-compose logs -f
```

### 5. Acesse as Aplicações

| Aplicação | URL | Descrição |
|-----------|-----|-----------|
| **Frontend** | http://localhost:3000 | Interface do usuário |
| **Backend API** | http://localhost:3001/api | API REST |
| **Swagger Docs** | http://localhost:3001/api/docs | Documentação da API |
| **phpMyAdmin** | http://localhost:8080 | Interface do MySQL |

---

## 🔐 Credenciais de Acesso

### Aplicação (Frontend)
```
Email: admin@easycompliance.com
Senha: Admin@2024
```

**OU**

```
Email: consultor@easycompliance.com
Senha: Consultor@2024
```

### phpMyAdmin
```
Servidor: mysql
Usuário: root
Senha: root_password_2024
```

**OU**

```
Usuário: easycompliance_user
Senha: easycompliance_pass_2024
```

---

## 📁 Estrutura do Projeto

```
mvp/
├── backend/                    # API NestJS
│   ├── src/
│   │   ├── modules/           # Módulos da aplicação
│   │   │   ├── auth/          # Autenticação JWT
│   │   │   ├── users/         # Gestão de usuários
│   │   │   ├── companies/     # Gestão de empresas
│   │   │   ├── risks/         # Gestão de riscos
│   │   │   ├── controls/      # Gestão de controles
│   │   │   └── documents/     # Gestão de documentos
│   │   ├── common/            # Código compartilhado
│   │   ├── config/            # Configurações
│   │   ├── app.module.ts      # Módulo raiz
│   │   └── main.ts            # Entry point
│   ├── test/                  # Testes
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── frontend/                   # Interface Next.js 14
│   ├── src/
│   │   ├── app/               # App Router
│   │   │   ├── login/         # Página de login
│   │   │   ├── dashboard/     # Dashboard principal
│   │   │   ├── layout.tsx     # Layout root
│   │   │   └── page.tsx       # Home (redirect)
│   │   └── components/        # Componentes reutilizáveis
│   ├── public/                # Arquivos estáticos
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── init-db.sql                # Script de inicialização do DB
├── docker-compose.yml         # Orquestração dos containers
└── README.md                  # Este arquivo
```

---

## 🛠️ Comandos Úteis

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs de todos os serviços
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar todos os serviços
docker-compose stop

# Parar e remover containers
docker-compose down

# Parar e remover containers + volumes (limpa banco de dados)
docker-compose down -v

# Rebuild de um serviço específico
docker-compose up -d --build backend
docker-compose up -d --build frontend

# Restart de um serviço específico
docker-compose restart backend

# Ver status dos containers
docker-compose ps
```

### Backend (dentro do container)

```bash
# Acessar o bash do container do backend
docker-compose exec backend sh

# Dentro do container:
npm run start:dev          # Modo desenvolvimento com watch
npm run build              # Build de produção
npm run test               # Executar testes
npm run test:cov           # Testes com cobertura
npm run migration:run      # Executar migrations
npm run migration:revert   # Reverter última migration
```

### Frontend (dentro do container)

```bash
# Acessar o bash do container do frontend
docker-compose exec frontend sh

# Dentro do container:
npm run dev                # Modo desenvolvimento
npm run build              # Build de produção
npm run start              # Iniciar build de produção
npm run lint               # Executar linter
```

---

## 🗃️ Banco de Dados

### Schema Inicial

O banco de dados é criado automaticamente na primeira execução com as seguintes tabelas:

- **companies** - Empresas (multi-tenant)
- **users** - Usuários do sistema
- **risks** - Riscos identificados
- **controls** - Controles de mitigação
- **documents** - Documentos relacionados
- **action_plans** - Planos de ação
- **audit_logs** - Logs de auditoria

### Dados de Exemplo

O sistema já vem populado com:
- ✅ 1 empresa demo (EasyCompliance Consultoria)
- ✅ 2 usuários (admin e consultor)
- ✅ 5 riscos de exemplo
- ✅ View de analytics (v_risk_summary)

### Acessar via phpMyAdmin

1. Acesse http://localhost:8080
2. Servidor: `mysql`
3. Usuário: `root`
4. Senha: `root_password_2024`
5. Banco: `easycompliance`

---

## 📡 API Endpoints

### Autenticação

```bash
POST /api/auth/register     # Registrar novo usuário
POST /api/auth/login        # Login (retorna JWT)
```

### Usuários

```bash
GET    /api/users           # Listar usuários da empresa
GET    /api/users/me        # Perfil do usuário logado
GET    /api/users/:id       # Buscar usuário por ID
```

### Empresas

```bash
GET    /api/companies       # Listar empresas
GET    /api/companies/:id   # Buscar empresa por ID
POST   /api/companies       # Criar nova empresa
PATCH  /api/companies/:id   # Atualizar empresa
DELETE /api/companies/:id   # Remover empresa
```

### Riscos

```bash
GET    /api/risks           # Listar riscos da empresa
GET    /api/risks/matrix    # Matriz de riscos
GET    /api/risks/:id       # Buscar risco por ID
POST   /api/risks           # Criar novo risco
PATCH  /api/risks/:id       # Atualizar risco
DELETE /api/risks/:id       # Remover risco
```

### Documentação Completa

Acesse a documentação interativa Swagger:
**http://localhost:3001/api/docs**

---

## 🧪 Testando a API

### Via Swagger UI

1. Acesse http://localhost:3001/api/docs
2. Clique em "Authorize"
3. Faça login em `/auth/login` para obter o token
4. Cole o token no formato: `Bearer seu-token-jwt`
5. Teste os endpoints

### Via curl

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@easycompliance.com",
    "password": "Admin@2024"
  }'

# Salve o token retornado
TOKEN="seu-token-aqui"

# Listar riscos
curl http://localhost:3001/api/risks \
  -H "Authorization: Bearer $TOKEN"

# Criar novo risco
curl -X POST http://localhost:3001/api/risks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo Risco de Teste",
    "description": "Descrição do risco",
    "category": "operational",
    "probability": 3,
    "impact": 4
  }'
```

---

## 🐛 Troubleshooting

### Problema: Containers não iniciam

```bash
# Verificar logs
docker-compose logs

# Limpar volumes e rebuild
docker-compose down -v
docker-compose up -d --build
```

### Problema: Erro de conexão com banco de dados

```bash
# Verificar se o MySQL está rodando
docker-compose ps mysql

# Ver logs do MySQL
docker-compose logs mysql

# Aguardar o health check
docker-compose up -d
# Aguarde 30-60 segundos
```

### Problema: Porta já em uso

```bash
# Verificar portas em uso
# Windows:
netstat -ano | findstr ":3000"
netstat -ano | findstr ":3001"
netstat -ano | findstr ":3306"

# Matar processo (Windows):
taskkill /PID <PID> /F

# Ou alterar as portas no docker-compose.yml
```

### Problema: Frontend não conecta com Backend

1. Verifique se o backend está rodando: http://localhost:3001/api/docs
2. Verifique o arquivo `.env` do frontend:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
3. Reinicie o container do frontend:
   ```bash
   docker-compose restart frontend
   ```

### Problema: Erro "Cannot find module"

```bash
# Rebuild do container
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

---

## 🔧 Desenvolvimento Local (sem Docker)

### Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
# Editar DATABASE_HOST=localhost

# Executar migrations
npm run migration:run

# Iniciar em modo desenvolvimento
npm run start:dev
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Configurar .env
cp .env.example .env

# Iniciar em modo desenvolvimento
npm run dev
```

---

## 📊 Funcionalidades Implementadas

### ✅ MVP - Fase 1 (Atual)

- [x] Autenticação JWT com refresh token
- [x] Multi-tenancy (isolamento por empresa)
- [x] Gestão de usuários (4 níveis de permissão)
- [x] Gestão de empresas
- [x] Gestão de riscos
  - [x] CRUD completo
  - [x] Cálculo automático de score
  - [x] Níveis de risco (baixo, médio, alto, crítico)
  - [x] Risco residual
  - [x] Matriz de riscos 5x5
- [x] Dashboard com estatísticas
- [x] API RESTful documentada (Swagger)
- [x] Banco de dados MySQL com migrations
- [x] Cache Redis
- [x] Docker & Docker Compose
- [x] phpMyAdmin para gerenciamento

### 🚧 Próximas Fases

**Fase 2 - Crescimento (Meses 5-8)**
- [ ] Gestão de controles
- [ ] Gestão de documentos (upload S3)
- [ ] Planos de ação
- [ ] Canal de denúncias
- [ ] Diligências automatizadas
- [ ] Assinatura digital

**Fase 3 - Consolidação (Meses 9-12)**
- [ ] Universidade corporativa
- [ ] Integrações governamentais (Bacen, COAF, ANS)
- [ ] Analytics avançados com IA
- [ ] Gestão de tempo
- [ ] App mobile (PWA)

---

## 📈 Métricas e Qualidade

### Cobertura de Testes
```bash
npm run test:cov
```

### Lint
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Equipe

- **Tech Lead** - Desenvolvimento Full Stack
- **Business Owner** - Gestão de Compliance

---

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: contato@easycompliance.com
- 📱 WhatsApp: (11) 99999-9999

---

## 🎓 Recursos Adicionais

### Documentação Técnica
- [Boas Práticas de Desenvolvimento](../BOAS_PRATICAS_DESENVOLVIMENTO.md)
- [Guia de Implementação do MVP](../MVP_IMPLEMENTATION_GUIDE.md)
- [Proposta Comercial](../proposta/PROPOSTA_COMERCIAL_FINAL.md)

### Tecnologias Utilizadas
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<div align="center">

**EasyCompliance MVP** - Transformando Compliance em Vantagem Competitiva

Feito com ❤️ usando as melhores práticas de engenharia de software

</div>
