# Guia de Início Rápido - EasyCompliance MVP

## ⚡ Inicialização em 3 Passos

### Windows

```bash
# 1. Abra o terminal (CMD ou PowerShell) na pasta mvp/
cd c:\Users\Home\Desktop\Projects\easycompliance\mvp

# 2. Execute o script de start
start.bat

# 3. Aguarde 2 minutos e acesse http://localhost:3000
```

### Linux/Mac

```bash
# 1. Abra o terminal na pasta mvp/
cd /path/to/easycompliance/mvp

# 2. Dê permissão de execução e execute
chmod +x start.sh
./start.sh

# 3. Aguarde 2 minutos e acesse http://localhost:3000
```

### Manualmente

```bash
# 1. Criar arquivos .env
cd backend && cp .env.example .env && cd ..
cd frontend && cp .env.example .env && cd ..

# 2. Iniciar containers
docker-compose up -d

# 3. Aguardar 2 minutos
```

---

## 🔑 Credenciais de Acesso

### Aplicação
- **URL**: http://localhost:3000
- **Email**: admin@easycompliance.com
- **Senha**: Admin@2024

### phpMyAdmin
- **URL**: http://localhost:8080
- **Servidor**: mysql
- **Usuário**: root
- **Senha**: root_password_2024

### Swagger API
- **URL**: http://localhost:3001/api/docs

---

## 🎯 O que Você Pode Fazer Agora

1. **Login** em http://localhost:3000
2. **Visualizar Dashboard** com estatísticas de riscos
3. **Explorar a API** em http://localhost:3001/api/docs
4. **Ver o Banco de Dados** em http://localhost:8080

---

## 📝 Dados de Exemplo

O sistema já vem com:
- ✅ 1 empresa (EasyCompliance Consultoria)
- ✅ 2 usuários (admin e consultor)
- ✅ 5 riscos de exemplo
- ✅ Matriz de riscos populada

---

## 🔄 Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Parar containers
docker-compose stop

# Parar e remover containers
docker-compose down

# Reiniciar um serviço
docker-compose restart backend

# Rebuild (após mudanças no código)
docker-compose up -d --build
```

---

## ❓ Problemas Comuns

### Porta já em uso?

```bash
# Windows - Ver o que está usando a porta
netstat -ano | findstr ":3000"
netstat -ano | findstr ":3001"

# Matar o processo
taskkill /PID <numero-do-pid> /F

# Ou altere as portas no docker-compose.yml
```

### Docker não está rodando?

1. Abra Docker Desktop
2. Aguarde aparecer "Docker is running"
3. Execute `docker ps` para confirmar
4. Execute o script de start novamente

### Erro ao conectar no banco?

```bash
# Aguarde mais tempo (60-90 segundos)
# Ou verifique se o MySQL iniciou:
docker-compose logs mysql

# Se não iniciou, restart:
docker-compose restart mysql
```

---

## 📚 Próximos Passos

1. Leia o [README.md](./README.md) completo
2. Explore a [Documentação da API](http://localhost:3001/api/docs)
3. Veja as [Boas Práticas](../BOAS_PRATICAS_DESENVOLVIMENTO.md)
4. Consulte o [Guia de Implementação](../MVP_IMPLEMENTATION_GUIDE.md)

---

## 🚀 Desenvolvendo

Para adicionar novas funcionalidades:

1. Backend: Edite arquivos em `backend/src/`
2. Frontend: Edite arquivos em `frontend/src/`
3. O hot-reload está ativo - mudanças aparecerão automaticamente

---

**Dúvidas?** Consulte o README.md ou abra uma issue!
