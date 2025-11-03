#!/bin/bash

# EasyCompliance MVP - Script de Inicialização Rápida
echo "🚀 EasyCompliance MVP - Iniciando..."
echo ""

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
  exit 1
fi

echo "✅ Docker está rodando"
echo ""

# Criar arquivos .env se não existirem
if [ ! -f backend/.env ]; then
  echo "📝 Criando backend/.env..."
  cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
  echo "📝 Criando frontend/.env..."
  cp frontend/.env.example frontend/.env
fi

echo ""
echo "🐳 Iniciando containers Docker..."
docker-compose up -d

echo ""
echo "⏳ Aguardando inicialização dos serviços..."
echo "   Isso pode levar até 2 minutos..."

# Aguardar 60 segundos
sleep 60

echo ""
echo "✅ Sistema iniciado com sucesso!"
echo ""
echo "📍 Acessos disponíveis:"
echo "   • Frontend:    http://localhost:3000"
echo "   • Backend API: http://localhost:3001/api"
echo "   • Swagger:     http://localhost:3001/api/docs"
echo "   • phpMyAdmin:  http://localhost:8080"
echo ""
echo "🔐 Credenciais de login:"
echo "   Email: admin@easycompliance.com"
echo "   Senha: Admin@2024"
echo ""
echo "📊 Para ver os logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar:"
echo "   docker-compose down"
echo ""
