#!/bin/bash

echo "🚀 Iniciando setup do EasyCompliance..."

# Cores
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Criar arquivo .env no backend
echo -e "${BLUE}📝 Criando arquivo .env...${NC}"
cp backend/.env.example backend/.env

# 2. Subir Docker (PostgreSQL + Redis)
echo -e "${BLUE}🐳 Subindo Docker containers...${NC}"
docker-compose up -d

echo -e "${YELLOW}⏳ Aguardando databases estarem prontos (15 segundos)...${NC}"
sleep 15

# 3. Instalar dependências do backend
echo -e "${BLUE}📦 Instalando dependências do backend...${NC}"
cd backend
npm install

# 4. Gerar Prisma Client
echo -e "${BLUE}🔧 Gerando Prisma Client...${NC}"
npx prisma generate

# 5. Criar migrations
echo -e "${BLUE}🗄️  Criando database schema...${NC}"
npx prisma migrate dev --name init

# 6. Voltar para raiz
cd ..

# 7. Instalar dependências do frontend
echo -e "${BLUE}📦 Instalando dependências do frontend...${NC}"
cd frontend
npm install
cd ..

echo -e "${GREEN}✅ Setup concluído!${NC}"
echo ""
echo -e "${GREEN}Para iniciar o projeto:${NC}"
echo -e "  ${BLUE}Backend:${NC}  cd backend && npm run dev"
echo -e "  ${BLUE}Frontend:${NC} cd frontend && npm run dev"
echo ""
echo -e "${YELLOW}URLs:${NC}"
echo -e "  Backend API: http://localhost:3001/api/v1"
echo -e "  Swagger Docs: http://localhost:3001/api/docs"
echo -e "  Frontend: http://localhost:3000"
echo -e "  Prisma Studio: cd backend && npx prisma studio"
