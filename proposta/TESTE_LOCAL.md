# 🧪 Como Testar Localmente

## Método 1: Abrir Direto no Navegador (Mais Simples)

1. **Localize o arquivo:**
   - Vá até: `C:\Users\Home\Desktop\Projects\easycompliance\`
   - Encontre o arquivo: `index.html`

2. **Abra no navegador:**
   - **Opção A:** Clique duas vezes no arquivo `index.html`
   - **Opção B:** Clique com botão direito → Abrir com → Seu navegador favorito
   - **Opção C:** Arraste o arquivo para uma janela do navegador aberta

3. **Pronto!**
   - A aplicação deve carregar instantaneamente
   - Você verá "EasyCompliance" com as 3 propostas

## Método 2: Servidor Local (Recomendado para Testes)

### Usando Python (se instalado)

1. **Abra o terminal na pasta do projeto:**
   ```bash
   cd C:\Users\Home\Desktop\Projects\easycompliance
   ```

2. **Inicie servidor:**
   - **Python 3:**
     ```bash
     python -m http.server 8000
     ```
   - **Python 2:**
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. **Acesse no navegador:**
   - Abra: `http://localhost:8000`

4. **Para parar:**
   - Pressione `Ctrl + C` no terminal

### Usando Node.js (se instalado)

1. **Instale servidor HTTP:**
   ```bash
   npm install -g http-server
   ```

2. **Navegue até a pasta:**
   ```bash
   cd C:\Users\Home\Desktop\Projects\easycompliance
   ```

3. **Inicie servidor:**
   ```bash
   http-server -p 8000
   ```

4. **Acesse:**
   - Abra: `http://localhost:8000`

### Usando VS Code (se instalado)

1. **Instale extensão "Live Server":**
   - Abra VS Code
   - Vá em Extensions (Ctrl+Shift+X)
   - Procure por "Live Server"
   - Clique em Install

2. **Abra o projeto:**
   - File → Open Folder
   - Selecione: `C:\Users\Home\Desktop\Projects\easycompliance`

3. **Inicie servidor:**
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"
   - Ou clique em "Go Live" na barra inferior

4. **Acesse:**
   - Abre automaticamente: `http://127.0.0.1:5500`

## 🧪 Checklist de Testes

### Teste Básico (5 minutos)
- [ ] Página carrega sem erros
- [ ] Vê 3 cards de propostas
- [ ] Proposta 3 tem badge "RECOMENDADA"
- [ ] Botão "Exportar PDF" está visível (azul)

### Teste de Navegação (5 minutos)
- [ ] Clica em "Ver Roadmap Completo" em qualquer proposta
- [ ] View muda para Roadmap
- [ ] Vê 3 fases (MVP, Crescimento, Consolidação)
- [ ] Botão "Voltar para Propostas" funciona
- [ ] Botões da barra superior funcionam (Home/Propostas e Map/Roadmap)

### Teste de Interatividade (5 minutos)
- [ ] Clica em sprint no Roadmap
- [ ] Sprint expande mostrando entregas
- [ ] Vê lista de tecnologias (badges roxos)
- [ ] Clica novamente e sprint fecha
- [ ] Testa expandir múltiplos sprints

### Teste de Exportação PDF (10 minutos)

#### View de Propostas:
1. [ ] Clica em "Exportar PDF"
2. [ ] Botão muda para "Gerando PDF..." com ícone girando
3. [ ] Aguarda 3-5 segundos
4. [ ] PDF baixa automaticamente
5. [ ] Nome do arquivo: `EasyCompliance_Proposta_Ponto_de_Equilíbrio_[DATA].pdf`
6. [ ] Abre PDF e verifica:
   - [ ] Todas as 3 propostas estão incluídas
   - [ ] Estrutura de parceria está visível
   - [ ] Cores preservadas
   - [ ] Fontes legíveis
   - [ ] Layout mantido

#### View de Roadmap:
1. [ ] Navega para Roadmap
2. [ ] Clica em "Exportar Roadmap PDF" (verde)
3. [ ] Aguarda geração
4. [ ] PDF baixa com nome: `EasyCompliance_Proposta_[NOME]_[DATA].pdf`
5. [ ] Abre PDF e verifica:
   - [ ] Informações da proposta selecionada
   - [ ] Todas as 3 fases incluídas
   - [ ] Sprints visíveis (mas não expandidos)
   - [ ] Layout correto

### Teste Mobile (5 minutos)
1. [ ] Aperta F12 (DevTools)
2. [ ] Clica em ícone de dispositivo móvel (Ctrl+Shift+M)
3. [ ] Testa em diferentes tamanhos:
   - [ ] iPhone SE (375px)
   - [ ] iPad (768px)
   - [ ] Desktop (1920px)
4. [ ] Verifica:
   - [ ] Cards de propostas se adaptam (1 coluna em mobile)
   - [ ] Botões ficam responsivos
   - [ ] Navegação funciona em touch
   - [ ] Texto legível em todas resoluções

### Teste de Performance (5 minutos)
1. [ ] Abre DevTools (F12)
2. [ ] Vai em Network
3. [ ] Recarrega página (Ctrl+F5)
4. [ ] Verifica:
   - [ ] Tempo de carregamento < 3 segundos
   - [ ] Todos CDNs carregam (React, Tailwind, Lucide, html2pdf)
   - [ ] Sem erros no console
5. [ ] Vai em Lighthouse
6. [ ] Roda auditoria:
   - [ ] Performance > 80
   - [ ] Accessibility > 90
   - [ ] Best Practices > 90

### Teste de Compatibilidade (10 minutos)
Teste em diferentes navegadores:
- [ ] **Chrome** (recomendado): Tudo funciona
- [ ] **Firefox**: Tudo funciona
- [ ] **Edge**: Tudo funciona
- [ ] **Safari** (se tiver Mac): Tudo funciona
- [ ] **Opera**: Tudo funciona

## 🐛 Problemas Comuns ao Testar

### Problema: Ícones não aparecem
**Causa:** CDN do Lucide não carregou ainda
**Solução:** Aguarde 2-3 segundos ou recarregue (F5)

### Problema: CSS não aplicado
**Causa:** Tailwind CDN não carregou
**Solução:** Verifique conexão de internet e recarregue

### Problema: PDF não gera
**Causa:** html2pdf.js não carregou ou navegador bloqueou download
**Soluções:**
- Verifique se html2pdf.js carregou (Network no DevTools)
- Veja se navegador permite downloads automáticos
- Teste em navegador diferente
- Abra Console (F12) para ver erro específico

### Problema: Página em branco
**Causa:** Erro JavaScript ou CDN não carregou
**Solução:**
- Abra Console (F12)
- Veja erro vermelho
- Verifique conexão de internet
- Tente recarregar (Ctrl+F5)

### Problema: "CORS error" ao testar local
**Causa:** Alguns navegadores bloqueiam file:// protocol
**Solução:** Use servidor local (Método 2 acima)

## 📊 Métricas Esperadas

### Carregamento:
- Primeira carga: 2-3 segundos
- Cargas subsequentes: <1 segundo (cache)

### Tamanho:
- HTML: ~43 KB
- React CDN: ~140 KB
- Tailwind CDN: ~75 KB
- Lucide CDN: ~25 KB
- html2pdf CDN: ~450 KB
- **Total inicial:** ~733 KB

### Performance:
- Lighthouse Performance: 85-95
- Time to Interactive: <3s
- First Contentful Paint: <1.5s

## ✅ Resultado Esperado

Se todos os testes passarem:
- ✅ Aplicação 100% funcional
- ✅ Pronta para deploy na Hostinger
- ✅ PDF exportando corretamente
- ✅ Responsiva e performática

## 🚀 Próximo Passo

Depois de testar localmente e confirmar que tudo funciona:
1. Siga instruções em [DEPLOY_HOSTINGER.txt](DEPLOY_HOSTINGER.txt)
2. Faça upload de `index.html` + `.htaccess`
3. Acesse seu domínio e teste novamente online

---

**Dúvidas?** Consulte [README.md](README.md) ou [FUNCIONALIDADES.md](FUNCIONALIDADES.md)
