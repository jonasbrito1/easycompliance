# 📤 Guia de Upload - Planilha de Custos MVP

## 🎯 Objetivo
Hospedar a planilha de custos em: **https://i9script.com/propostas/easycompliance/custos-mvp/**

---

## 📁 Arquivo para Upload

**Arquivo:** `custos-mvp.html`
**Localização:** `c:\Users\Home\Desktop\Projects\easycompliance\proposta\deploy-web\custos-mvp.html`

---

## 🚀 Método 1: Upload via Painel de Controle (Mais Simples)

### Passo 1: Acessar o Painel
1. Acesse o painel de controle da sua hospedagem (cPanel, Plesk, ou similar)
2. Faça login com suas credenciais

### Passo 2: Abrir Gerenciador de Arquivos
1. Procure por **"Gerenciador de Arquivos"** ou **"File Manager"**
2. Clique para abrir

### Passo 3: Navegar até a Pasta Correta
1. Vá para a pasta raiz do site (geralmente `public_html` ou `www`)
2. Crie a estrutura de pastas:
   ```
   public_html/
   └── propostas/
       └── easycompliance/
           └── custos-mvp/
   ```

### Passo 4: Criar Pastas
1. Clique em **"Nova Pasta"** ou **"New Folder"**
2. Crie a pasta `propostas` (se não existir)
3. Entre na pasta `propostas`
4. Crie a pasta `easycompliance`
5. Entre na pasta `easycompliance`
6. Crie a pasta `custos-mvp`

### Passo 5: Upload do Arquivo
1. Entre na pasta `custos-mvp`
2. Clique em **"Upload"** ou **"Enviar Arquivo"**
3. Selecione o arquivo `custos-mvp.html`
4. Aguarde o upload completar

### Passo 6: Renomear o Arquivo
1. Renomeie `custos-mvp.html` para `index.html`
2. Isso permitirá acessar via: `https://i9script.com/propostas/easycompliance/custos-mvp/`

---

## 🚀 Método 2: Upload via FTP (Profissional)

### Passo 1: Preparar Cliente FTP
1. Baixe e instale um cliente FTP (recomendado: **FileZilla**)
   - Download: https://filezilla-project.org/

### Passo 2: Conectar ao Servidor
1. Abra o FileZilla
2. Preencha os dados de conexão:
   - **Host:** ftp.i9script.com (ou IP do servidor)
   - **Usuário:** seu_usuario_ftp
   - **Senha:** sua_senha_ftp
   - **Porta:** 21 (FTP) ou 22 (SFTP)
3. Clique em **"Conexão Rápida"**

### Passo 3: Criar Estrutura de Pastas
1. No painel direito (servidor), navegue até `public_html`
2. Crie a estrutura:
   ```
   public_html/
   └── propostas/
       └── easycompliance/
           └── custos-mvp/
   ```

### Passo 4: Upload
1. No painel esquerdo (seu computador), navegue até:
   `c:\Users\Home\Desktop\Projects\easycompliance\proposta\deploy-web\`
2. No painel direito (servidor), entre na pasta `custos-mvp`
3. Arraste o arquivo `custos-mvp.html` do painel esquerdo para o direito
4. Renomeie para `index.html`

---

## 🚀 Método 3: Linha de Comando (Avançado)

Se você tem acesso SSH:

```bash
# Conectar ao servidor
ssh usuario@i9script.com

# Criar estrutura de pastas
cd public_html
mkdir -p propostas/easycompliance/custos-mvp

# Sair do SSH
exit

# Upload via SCP (do seu computador)
scp "c:\Users\Home\Desktop\Projects\easycompliance\proposta\deploy-web\custos-mvp.html" usuario@i9script.com:public_html/propostas/easycompliance/custos-mvp/index.html
```

---

## ✅ Verificação Pós-Upload

### Teste 1: Acessar a URL
Abra o navegador e acesse:
```
https://i9script.com/propostas/easycompliance/custos-mvp/
```

### Teste 2: Verificar Funcionalidades
- ✅ Página carrega corretamente
- ✅ Cards de resumo aparecem
- ✅ Categorias são clicáveis e expansíveis
- ✅ Gráfico de barras é exibido
- ✅ Botão "Exportar Excel" funciona
- ✅ Layout responsivo (teste em mobile)

### Teste 3: Configurar HTTPS (se necessário)
Se a página carregar mas dar erro de segurança:
1. Certifique-se de que o certificado SSL está ativo
2. No cPanel, vá em **"SSL/TLS Status"**
3. Ative o certificado para o domínio

---

## 🔧 Configurações Adicionais (Opcional)

### Criar arquivo .htaccess
Crie um arquivo `.htaccess` na pasta `custos-mvp` com:

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache para melhor performance
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Compressão GZIP
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

---

## 📊 Estrutura Final no Servidor

```
public_html/
└── propostas/
    └── easycompliance/
        └── custos-mvp/
            ├── index.html          ← Arquivo principal
            └── .htaccess           ← Opcional
```

---

## 🆘 Problemas Comuns

### Problema 1: Página não carrega
**Solução:**
- Verifique se o arquivo foi renomeado para `index.html`
- Confira as permissões do arquivo (deve ser 644)

### Problema 2: Página carrega mas sem estilo
**Solução:**
- Verifique sua conexão com internet (Tailwind CSS é via CDN)
- Limpe o cache do navegador (Ctrl+F5)

### Problema 3: Botão "Exportar Excel" não funciona
**Solução:**
- Verifique se o navegador permite downloads
- Teste em outro navegador (Chrome, Firefox)

### Problema 4: Erro 404
**Solução:**
- Verifique se a estrutura de pastas está correta
- Certifique-se de que está na pasta `public_html` (ou `www`)

---

## 📞 Suporte

Se precisar de ajuda:
1. Verifique a documentação da sua hospedagem
2. Entre em contato com o suporte da Hostinger/sua hospedagem
3. Forneça a URL e a descrição do problema

---

## ✨ URL Final

Após o upload bem-sucedido, a planilha estará disponível em:

**https://i9script.com/propostas/easycompliance/custos-mvp/**

---

## 📝 Checklist Final

- [ ] Arquivo `custos-mvp.html` baixado/localizado
- [ ] Pastas criadas no servidor (`propostas/easycompliance/custos-mvp/`)
- [ ] Arquivo enviado para o servidor
- [ ] Arquivo renomeado para `index.html`
- [ ] Permissões corretas (644)
- [ ] Testado no navegador
- [ ] HTTPS funcionando
- [ ] Todas as funcionalidades testadas
- [ ] Mobile testado

---

**Data de criação:** 03 de Novembro de 2025
**Versão:** 1.0
**Status:** ✅ Pronto para deploy
