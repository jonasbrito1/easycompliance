# ⚠️ PORTAS ATUALIZADAS - EasyCompliance MVP

## 🔄 Mudança de Portas (Conflitos Resolvidos)

As portas foram ajustadas para evitar conflitos com serviços já em execução no seu sistema.

---

## 📍 Novas URLs de Acesso

### ✅ Portas Livres (Atualizadas)

| Serviço | Porta Externa | Porta Interna | URL de Acesso |
|---------|---------------|---------------|---------------|
| **Frontend** | 4000 | 3000 | http://localhost:4000 |
| **Backend API** | 4001 | 3001 | http://localhost:4001/api |
| **Swagger Docs** | 4001 | 3001 | http://localhost:4001/api/docs |
| **phpMyAdmin** | 8081 | 80 | http://localhost:8081 |
| **MySQL** | 3307 | 3306 | localhost:3307 |
| **Redis** | 6381 | 6379 | localhost:6381 |

---

## 🔐 Credenciais de Acesso

### Aplicação (Frontend)
```
URL:      http://localhost:4000
Email:    admin@easycompliance.com
Senha:    Admin@2024
```

### Swagger API
```
URL:      http://localhost:4001/api/docs
```

### phpMyAdmin
```
URL:      http://localhost:8081
Servidor: mysql
Usuário:  root
Senha:    root_password_2024
```

### MySQL (Conexão Externa)
```
Host:     localhost
Porta:    3307
Usuário:  easycompliance_user
Senha:    easycompliance_pass_2024
Database: easycompliance
```

### Redis (Conexão Externa)
```
Host:     localhost
Porta:    6381
```

---

## ⚡ Início Rápido

```bash
# Executar o script de start
start.bat

# Aguardar 2 minutos

# Acessar
http://localhost:4000
```

---

## 🔍 Portas Detectadas como Ocupadas

Durante a verificação, as seguintes portas estavam em uso:

- ❌ 3011 (ocupada)
- ❌ 3308, 3309, 3320 (MySQL)
- ❌ 5432, 5433 (PostgreSQL)
- ❌ 6380 (Redis)
- ❌ 8080, 8082 (phpMyAdmin/Outros)

Por isso, ajustamos para portas livres.

---

## 📝 Mudanças Realizadas

### 1. docker-compose.yml
```yaml
Antes:                  Depois:
- Frontend: 3000    →   - Frontend: 4000
- Backend: 3001     →   - Backend: 4001
- MySQL: 3306       →   - MySQL: 3307
- Redis: 6379       →   - Redis: 6381
- phpMyAdmin: 8080  →   - phpMyAdmin: 8081
```

### 2. Variáveis de Ambiente

**backend/.env**
```bash
CORS_ORIGIN=http://localhost:4000
```

**frontend/.env**
```bash
NEXT_PUBLIC_API_URL=http://localhost:4001
```

---

## 🧪 Testar o Sistema

### 1. Iniciar Containers
```bash
docker-compose up -d
```

### 2. Verificar Status
```bash
docker-compose ps
```

Deve mostrar todos os containers como "Up":
```
NAME                        STATUS
easycompliance-backend      Up
easycompliance-frontend     Up
easycompliance-mysql        Up (healthy)
easycompliance-phpmyadmin   Up
easycompliance-redis        Up (healthy)
```

### 3. Verificar Logs
```bash
# Ver todos os logs
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 4. Acessar o Sistema
Abra o navegador em: **http://localhost:4000**

---

## 🐛 Troubleshooting

### Problema: Ainda diz que porta está em uso

```bash
# Parar todos os containers
docker-compose down

# Verificar se realmente parou
docker ps

# Verificar a porta novamente
netstat -ano | findstr ":4000"

# Se ainda ocupada, mate o processo
taskkill /PID <numero> /F

# Inicie novamente
docker-compose up -d
```

### Problema: Frontend não conecta no Backend

1. Verifique se o backend está rodando:
   ```bash
   curl http://localhost:4001/api/docs
   ```

2. Verifique o arquivo `frontend/.env`:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:4001
   ```

3. Reinicie o frontend:
   ```bash
   docker-compose restart frontend
   ```

### Problema: Erro de CORS

Se aparecer erro de CORS no browser:

1. Verifique `backend/.env`:
   ```bash
   CORS_ORIGIN=http://localhost:4000
   ```

2. Reinicie o backend:
   ```bash
   docker-compose restart backend
   ```

---

## 📊 Verificar Portas em Uso

Para verificar quais portas estão em uso no seu sistema:

### Windows
```bash
# Verificar porta específica
netstat -ano | findstr ":4000"

# Ver todas as portas em listening
netstat -ano | findstr "LISTENING"
```

### Linux/Mac
```bash
# Verificar porta específica
lsof -i :4000

# Ver todas as portas em listening
netstat -tuln
```

---

## 🔄 Reverter para Portas Padrão

Se desejar usar as portas padrão (3000, 3001, etc.), você precisa:

1. Parar os serviços que estão usando essas portas
2. Editar `docker-compose.yml` e reverter as portas
3. Atualizar os arquivos `.env`
4. Executar `docker-compose up -d --build`

---

## 📞 Suporte

Se continuar tendo problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Verifique o status: `docker-compose ps`
3. Tente rebuild: `docker-compose up -d --build`
4. Leia o [README.md](./README.md) completo

---

## ✅ Checklist Rápido

- [ ] Docker Desktop está rodando
- [ ] Executou `start.bat`
- [ ] Aguardou 2 minutos
- [ ] Acessou http://localhost:4000
- [ ] Fez login com admin@easycompliance.com
- [ ] Dashboard carregou corretamente
- [ ] Swagger funciona em http://localhost:4001/api/docs
- [ ] phpMyAdmin funciona em http://localhost:8081

---

## 🎯 Resumo

**✅ SISTEMA CONFIGURADO COM PORTAS LIVRES**

- Frontend: **http://localhost:4000**
- Backend: **http://localhost:4001**
- Swagger: **http://localhost:4001/api/docs**
- phpMyAdmin: **http://localhost:8081**

**Login:** admin@easycompliance.com / Admin@2024

---

**Pronto para usar! Execute `start.bat` e acesse http://localhost:4000** 🚀
