# EasyCompliance MVP - Informações de Acesso

## Sistema Operacional

Todos os serviços estão rodando corretamente nas seguintes portas:

### Aplicação Principal
- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:4001/api/v1
- **Documentação Swagger**: http://localhost:4001/api/docs

### Ferramentas de Desenvolvimento
- **phpMyAdmin**: http://localhost:8081
  - Servidor: `mysql`
  - Usuário: `root`
  - Senha: `root_password_2024`

- **MySQL**: `localhost:3307`
  - Database: `easycompliance`
  - Usuário: `easycompliance_user`
  - Senha: `easycompliance_pass_2024`

- **Redis**: `localhost:6381`

## Credenciais de Acesso

### Usuário Administrador
- **Email**: `admin@easycompliance.com`
- **Senha**: `Admin@2024`
- **Perfil**: Administrador do Sistema
- **Permissões**: Acesso total

### Usuário Consultor
- **Email**: `consultor@easycompliance.com`
- **Senha**: `Admin@2024`
- **Perfil**: Consultor de Compliance
- **Permissões**: Gestão de riscos e controles

## Como Usar

1. **Acessar o Sistema**:
   - Abra o navegador em: http://localhost:4000
   - Use as credenciais acima para fazer login

2. **Explorar a API**:
   - Acesse a documentação interativa: http://localhost:4001/api/docs
   - Teste os endpoints diretamente pelo Swagger

3. **Gerenciar Banco de Dados**:
   - Acesse phpMyAdmin: http://localhost:8081
   - Visualize tabelas, dados e execute queries

## Dados Demo Disponíveis

O sistema já vem com dados de demonstração:

- ✅ 1 Empresa: "EasyCompliance Demo"
- ✅ 2 Usuários (admin e consultor)
- ✅ 5 Riscos de exemplo com diferentes níveis (baixo, médio, alto, crítico)
- ✅ Matriz de riscos 5x5 funcional

## Comandos Úteis

### Parar todos os containers:
```bash
cd mvp
docker-compose down
```

### Iniciar todos os containers:
```bash
cd mvp
docker-compose up -d
```

### Ver logs de um serviço específico:
```bash
cd mvp
docker-compose logs backend
docker-compose logs frontend
```

### Reiniciar um serviço:
```bash
cd mvp
docker-compose restart backend
docker-compose restart frontend
```

## Notas Importantes

- A API usa **versionamento** (v1), sempre inclua `/v1` nas rotas
- Todos os endpoints protegidos requerem **Bearer Token** no header Authorization
- O token JWT expira em 1 hora (accessToken) e 7 dias (refreshToken)
- Senhas são criptografadas com bcrypt (12 rounds)

## Status dos Serviços

Verifique o status dos containers:
```bash
cd mvp
docker-compose ps
```

Todos os 5 containers devem estar com status **Up** ou **Up (healthy)**:
- ✅ easycompliance-frontend
- ✅ easycompliance-backend
- ✅ easycompliance-mysql (healthy)
- ✅ easycompliance-redis (healthy)
- ✅ easycompliance-phpmyadmin
