# 🚀 Guia de Upload para Hostinger

## Informações do Deploy
- **URL:** https://i9script.com/propostas/easycompliance
- **Servidor:** Hostinger
- **Arquivos Necessários:** Apenas index.html (+ .htaccess opcional)

---

## 📋 Checklist de Arquivos

### ✅ OBRIGATÓRIO
- [x] **index.html** (1.5 MB) - Aplicação completa standalone

### 📄 OPCIONAL (Recomendado)
- [ ] **.htaccess** - Otimizações de performance

### ❌ NÃO ENVIAR
- ❌ index.js (arquivo de desenvolvimento - não necessário)
- ❌ index_novo.html (temporário - não necessário)
- ❌ index_backup_*.html (backups - não necessário)
- ❌ *.md (documentação - não necessário no servidor)
- ❌ *.txt (documentação - não necessário no servidor)

---

## 🔧 Método 1: Upload via FTP/SFTP (Recomendado)

### Passo 1: Conectar via FTP

**Usando FileZilla:**
1. Abra FileZilla
2. Configure a conexão:
   - Host: `ftp.i9script.com` (ou o FTP fornecido pela Hostinger)
   - Usuário: Seu usuário FTP
   - Senha: Sua senha FTP
   - Porta: 21 (FTP) ou 22 (SFTP)

**Usando WinSCP:**
1. Abra WinSCP
2. Clique em "New Site"
3. Preencha os dados acima
4. Clique em "Login"

### Passo 2: Navegar até o Diretório Correto

```
public_html/
└── propostas/
    └── easycompliance/  ← Criar esta pasta se não existir
```

### Passo 3: Upload dos Arquivos

1. **Upload do index.html:**
   - Arraste `index.html` da sua pasta local
   - Para: `/public_html/propostas/easycompliance/`
   - Aguarde o upload completar (pode levar 1-2 minutos devido ao tamanho)

2. **Upload do .htaccess (Opcional):**
   - Arraste `.htaccess` para o mesmo diretório
   - Isso ativará cache e compressão GZIP

### Passo 4: Verificar Permissões

Certifique-se que as permissões estão corretas:
- **index.html:** 644 (rw-r--r--)
- **.htaccess:** 644 (rw-r--r--)

---

## 🌐 Método 2: Upload via Painel Hostinger (hPanel)

### Passo 1: Acessar o File Manager

1. Faça login no painel da Hostinger: https://hpanel.hostinger.com
2. Vá em **Files → File Manager**
3. Ou acesse diretamente: https://hpanel.hostinger.com/file-manager

### Passo 2: Navegar até o Diretório

1. Clique em `public_html`
2. Clique em `propostas`
3. Se a pasta `easycompliance` não existir:
   - Clique em **"New Folder"** (ou "+ Novo")
   - Digite: `easycompliance`
   - Clique em "Create"
4. Entre na pasta `easycompliance`

### Passo 3: Upload do Arquivo

1. Clique no botão **"Upload"** (ícone de upload ⬆️)
2. Selecione o arquivo `index.html` do seu computador:
   ```
   C:\Users\Home\Desktop\Projects\easycompliance\index.html
   ```
3. Aguarde o upload completar (barra de progresso)
4. Repita para `.htaccess` se desejar

### Passo 4: Verificar Upload

Após o upload, você deve ver:
```
/public_html/propostas/easycompliance/
├── index.html (1.5 MB)
└── .htaccess (opcional)
```

---

## ✅ Verificação Pós-Upload

### Teste 1: Acessar a URL
Abra no navegador:
```
https://i9script.com/propostas/easycompliance
```

Deve carregar a página com as 3 propostas.

### Teste 2: Verificar Navegação
- Clique em **"Propostas"** - Deve mostrar as 3 opções
- Clique em **"Roadmap"** - Deve mostrar os sprints
- Clique em **"Fluxograma"** - Deve mostrar o fluxograma visual

### Teste 3: Verificar PDF Export
- Clique em **"Exportar PDF"** em qualquer visualização
- Deve gerar e baixar o PDF

### Teste 4: Verificar Responsividade
- Abra em dispositivos móveis
- Deve adaptar o layout automaticamente

---

## 🐛 Solução de Problemas

### Problema: Página não carrega (404 Not Found)
**Solução:**
- Verifique se o arquivo está em `/public_html/propostas/easycompliance/index.html`
- Verifique se o nome do arquivo está exatamente como `index.html` (minúsculas)

### Problema: Página carrega mas sem estilos
**Solução:**
- Limpe o cache do navegador (Ctrl + Shift + Del)
- Abra em modo anônimo (Ctrl + Shift + N)
- Aguarde 2-3 minutos para CDN atualizar

### Problema: Ícones não aparecem
**Solução:**
- Os ícones são carregados via CDN (Lucide)
- Verifique sua conexão de internet
- Aguarde alguns segundos para carregar

### Problema: PDF não exporta
**Solução:**
- O html2pdf.js é carregado via CDN
- Verifique se não há bloqueador de ads/scripts
- Teste em outro navegador

### Problema: Upload muito lento
**Solução:**
- O arquivo tem 1.5 MB, pode levar 1-3 minutos
- Use FTP ao invés do File Manager do painel
- Compacte em .zip e descompacte no servidor (se disponível)

---

## 🔄 Atualização do Site

Se você fizer alterações no `index.html` localmente:

1. **Faça backup do arquivo atual no servidor** (renomear para `index_backup.html`)
2. **Faça upload do novo index.html**
3. **Limpe o cache:**
   - Do navegador (Ctrl + Shift + R)
   - Do CDN da Hostinger (se houver)
4. **Teste todas as funcionalidades**

---

## 📊 Estrutura Final no Servidor

```
i9script.com/
└── public_html/
    └── propostas/
        └── easycompliance/
            ├── index.html          ← Aplicação principal
            └── .htaccess           ← Configurações (opcional)
```

**URL Pública:** https://i9script.com/propostas/easycompliance

---

## 🎯 Checklist Final de Deploy

- [ ] index.html enviado para `/public_html/propostas/easycompliance/`
- [ ] Permissões corretas (644)
- [ ] URL acessível: https://i9script.com/propostas/easycompliance
- [ ] Navegação entre Propostas/Roadmap/Fluxograma funcionando
- [ ] Export PDF funcionando
- [ ] Responsivo em mobile testado
- [ ] Cache e compressão ativados (.htaccess)

---

## 📞 Suporte Hostinger

Se tiver problemas:
- **Chat:** https://www.hostinger.com.br/contato
- **Tutoriais:** https://support.hostinger.com/pt-BR/
- **FTP Guide:** https://support.hostinger.com/pt-BR/articles/1583258

---

## 🔐 Segurança

**Importante:**
- NÃO envie arquivos .env ou com credenciais
- NÃO envie arquivos de desenvolvimento (.git, node_modules, etc)
- Apenas index.html + .htaccess são necessários

---

## 🚀 Deploy Completo!

Após o upload, sua aplicação estará disponível em:
**https://i9script.com/propostas/easycompliance**

Compartilhe este link com o Consultor de Compliance!
