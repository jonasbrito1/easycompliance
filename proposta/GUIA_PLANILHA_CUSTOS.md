# 📖 Guia de Uso - Planilha de Custos MVP

## 🚀 Como Acessar

### Opção 1: Diretamente
Abra o arquivo: [planilha-custos.html](./planilha-custos.html)

### Opção 2: Via Proposta Principal
1. Abra [index.html](./index.html)
2. Clique no botão **"💰 Planilha Custos"** no menu superior
3. A planilha abrirá em uma nova aba

---

## ✨ Funcionalidades Principais

### 1. **Visualizações Múltiplas**

#### 📊 Aba Resumo
- Visão geral das categorias de custos
- Totais mensais e gerais
- Percentuais do orçamento
- Barra de progresso visual

#### 📝 Aba Detalhado
- Tabela completa editável (tipo Excel)
- Todos os itens de cada categoria
- Campos editáveis:
  - Nome do item
  - Valor mensal
  - Finalidade
  - Prioridade
- Adicionar/remover itens
- Cálculos automáticos

#### 📈 Aba Gráficos
- Gráfico de barras (distribuição de custos)
- Gráfico de pizza (proporção)
- Análise de ROI
- Comparação com mercado

---

## ✏️ Como Editar a Planilha

### Editar Valores Existentes

1. **Vá para a aba "📝 Detalhado"**
2. **Clique em qualquer campo** para editar:
   - **Nome do item:** Clique no nome e digite
   - **Valor mensal:** Clique no valor e digite o novo número
   - **Finalidade:** Clique na descrição e edite
   - **Prioridade:** Use o dropdown (Crítico/Médio/Baixo)
3. **Os cálculos atualizam automaticamente**
4. **Os dados são salvos automaticamente** no navegador

### Adicionar Novos Itens

1. Na aba "📝 Detalhado", encontre a categoria desejada
2. Clique no botão **"+ Adicionar"** no canto superior direito da categoria
3. Um novo item aparecerá
4. Preencha os campos (nome, valor, finalidade, prioridade)

### Remover Itens

1. Na aba "📝 Detalhado", localize o item
2. Clique no ícone **🗑️** na última coluna
3. Confirme a remoção

---

## 💾 Salvamento de Dados

### Auto-Save
- **Todos os dados são salvos automaticamente** no localStorage do navegador
- Você verá um indicador:
  - **"• Salvando..."** (azul pulsante) = Salvando
  - **"• Salvo ✓"** (verde) = Dados salvos

### Dados Persistentes
- Os dados **permanecem mesmo após fechar o navegador**
- Cada navegador tem seu próprio armazenamento
- Use **Exportar** para compartilhar com outros

---

## 📤 Exportação de Dados

### Exportar para CSV
1. Clique no botão **"📄 Exportar CSV"**
2. Um arquivo `.csv` será baixado
3. Abra com Excel, Google Sheets, ou qualquer editor de planilhas
4. Formato: categorizado e pronto para uso

### Exportar para Excel
1. Clique no botão **"📊 Exportar Excel"**
2. Um arquivo `.xlsx` será baixado
3. Contém **2 abas**:
   - **Resumo:** Totais por categoria
   - **Detalhamento:** Todos os itens
4. Formatação compatível com Excel/LibreOffice

### Imprimir / Gerar PDF
1. Clique no botão **"🖨️ Imprimir"** ou pressione `Ctrl+P`
2. Na janela de impressão, escolha:
   - **Destino:** "Salvar como PDF"
   - **Layout:** Retrato
   - **Margens:** Padrão
3. Clique em "Salvar"

---

## 🔄 Resetar Dados

### Quando usar?
- Quando quiser voltar aos valores originais da proposta
- Para começar do zero
- Se cometer muitos erros

### Como resetar?
1. Clique no botão **"🔄 Resetar"** (vermelho)
2. Confirme a ação
3. **ATENÇÃO:** Esta ação **não pode ser desfeita**

---

## 📊 Entendendo os Gráficos

### Gráfico de Barras
- **Mostra:** Distribuição de custos por categoria
- **Eixo X:** Categorias (IA, Cloud, Dev, etc.)
- **Eixo Y:** Valor em reais (R$)
- **Útil para:** Comparar visualmente os custos

### Gráfico de Pizza/Rosca
- **Mostra:** Proporção de cada categoria no total
- **Percentuais:** Quanto cada categoria representa
- **Cores:** Cada categoria tem uma cor única
- **Útil para:** Entender a distribuição do orçamento

### Cards de Análise
- **ROI das Ferramentas de IA:** Retorno sobre investimento
- **Economia vs Servidor Tradicional:** Quanto economizamos
- **Comparação com Mercado:** Nossa solução vs concorrentes
- **Eficiência do Orçamento:** Se estamos dentro do planejado

---

## 💡 Dicas de Uso

### Para Apresentar ao Sócio

1. **Use a aba "📊 Resumo"** para visão geral
2. **Mostre os gráficos** para impacto visual
3. **Exporte para Excel** para ele analisar offline
4. **Destaque os cards de ROI** na aba Gráficos

### Para Análise Detalhada

1. **Vá para "📝 Detalhado"**
2. Revise cada item, categoria por categoria
3. Ajuste valores conforme necessário
4. Adicione ou remova itens específicos

### Para Compartilhar

1. **Exporte para Excel** (formato mais universal)
2. Envie o arquivo `.xlsx` por email
3. Ou **imprima como PDF** para apresentação formal

---

## 🎯 Casos de Uso Práticos

### Cenário 1: Reduzir Custos
```
Objetivo: Reduzir de R$ 1.500 para R$ 1.260/mês

Passos:
1. Vá para aba "Detalhado"
2. Localize "🔧 Ferramentas Dev"
3. Reduza "GitHub Pro" de R$ 60 → R$ 0 (usar Free)
4. Reduza "Figma" de R$ 60 → R$ 0 (usar Free temporariamente)
5. Reduza "Vercel" de R$ 100 → R$ 40 (usar tier menor)
6. Localize "💼 Gestão"
7. Reduza "Notion" de R$ 30 → R$ 0
8. Reduza "Linear" de R$ 20 → R$ 0
9. Verificar novo total: R$ 1.260/mês
```

### Cenário 2: Adicionar Nova Ferramenta
```
Objetivo: Adicionar análise de sentimento

Passos:
1. Vá para aba "Detalhado"
2. Localize categoria "🤖 Ferramentas de IA"
3. Clique "+ Adicionar"
4. Preencha:
   - Nome: "API Análise de Sentimento"
   - Valor: 80
   - Finalidade: "Análise de tom em denúncias"
   - Prioridade: "Médio"
5. Totais atualizam automaticamente
```

### Cenário 3: Simular Diferentes Cenários
```
Objetivo: Testar 3 cenários de custo

Passos:
1. Cenário base: Anote os valores atuais
2. Faça ajustes para Cenário 1 (econômico)
3. Exporte Excel com nome "Cenário-Economico.xlsx"
4. Clique "Resetar" para voltar ao base
5. Faça ajustes para Cenário 2 (completo)
6. Exporte Excel com nome "Cenário-Completo.xlsx"
7. Compare os arquivos exportados
```

---

## 🔒 Segurança e Privacidade

### Onde os Dados São Salvos?
- **Apenas no seu navegador** (localStorage)
- **Não são enviados para servidor algum**
- **Totalmente offline após carregamento inicial**

### Compartilhamento Entre Computadores
- Dados **não sincronizam** automaticamente
- Cada navegador tem seu próprio armazenamento
- Para compartilhar: **exporte e envie o arquivo**

### Backup
- **Recomendado:** Exporte regularmente para Excel
- Guarde os arquivos exportados em local seguro
- Se limpar dados do navegador, planilha será resetada

---

## 🐛 Solução de Problemas

### Problema: Dados não estão salvando
**Solução:**
- Verifique se o navegador permite localStorage
- Não use modo anônimo/privado
- Limpe cache e recarregue a página

### Problema: Gráficos não aparecem
**Solução:**
- Vá para a aba "📈 Gráficos"
- Aguarde 2-3 segundos para carregar
- Se não aparecer, recarregue a página (F5)

### Problema: Exportação não funciona
**Solução:**
- Verifique se bloqueador de pop-up está desativado
- Tente outro navegador (Chrome, Firefox, Edge)
- Permita downloads no site

### Problema: Planilha está lenta
**Solução:**
- Feche outras abas do navegador
- Reduza o número de itens (remova desnecessários)
- Use navegador atualizado

---

## 📱 Compatibilidade

### Navegadores Testados
- ✅ Google Chrome 90+
- ✅ Firefox 88+
- ✅ Microsoft Edge 90+
- ✅ Safari 14+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop/Laptop (recomendado)
- ✅ Tablet (funciona bem)
- ⚠️ Smartphone (funciona, mas experiência limitada)

### Requisitos
- Conexão internet (apenas para carregar inicial)
- JavaScript habilitado
- LocalStorage habilitado

---

## 🎨 Personalização

### Cores das Categorias
As categorias têm cores específicas para facilitar identificação:

- 🤖 **IA:** Azul claro (#dbeafe)
- ☁️ **Cloud:** Índigo claro (#e0e7ff)
- 🔧 **Dev:** Amarelo claro (#fef3c7)
- 📧 **Comunicação:** Verde claro (#d1fae5)
- 🔐 **Segurança:** Rosa claro (#ffe4e6)
- 📦 **Storage:** Roxo claro (#f3e8ff)
- 💼 **Gestão:** Rosa claro (#fce7f3)
- ⚡ **Imprevistos:** Cinza claro (#f1f5f9)

---

## 📞 Suporte

### Dúvidas ou Problemas?
- Consulte este guia primeiro
- Verifique as Notas Importantes na planilha
- Entre em contato com o desenvolvedor

### Sugestões de Melhorias
- Anote suas ideias
- Compartilhe feedback
- Melhorias futuras podem ser implementadas

---

## 🆕 Próximas Versões (Planejadas)

### Funcionalidades Futuras
- [ ] Múltiplos cenários salvos
- [ ] Comparação lado a lado
- [ ] Gráfico de evolução temporal
- [ ] Importação de CSV
- [ ] Temas customizáveis
- [ ] Comentários por item
- [ ] Histórico de alterações
- [ ] Compartilhamento via link

---

## 📋 Checklist de Uso Inicial

### Primeira Vez Usando a Planilha

- [ ] Abrir planilha-custos.html no navegador
- [ ] Explorar as 3 abas (Resumo, Detalhado, Gráficos)
- [ ] Verificar se totais estão corretos (R$ 1.500/mês)
- [ ] Testar edição de um valor na aba Detalhado
- [ ] Verificar se auto-save funciona (• Salvo ✓)
- [ ] Adicionar um item teste e depois removê-lo
- [ ] Exportar para Excel e verificar arquivo
- [ ] Experimentar impressão/PDF
- [ ] Ler todos os cards de ROI na aba Gráficos
- [ ] Fazer backup (exportar Excel com nome "Backup-Original")

### Antes de Apresentar ao Sócio

- [ ] Revisar todos os valores na aba Detalhado
- [ ] Verificar se categorização está correta
- [ ] Confirmar que total mensal é R$ 1.500
- [ ] Preparar explicação de cada categoria
- [ ] Exportar Excel atualizado
- [ ] Gerar PDF para apresentação
- [ ] Ter argumentos prontos para justificar custos
- [ ] Conhecer alternativas de economia (se perguntarem)

---

## ✅ Vantagens da Planilha Web

### vs Planilha Excel Tradicional

| Aspecto | Planilha Web | Excel Tradicional |
|---------|--------------|-------------------|
| **Edição** | ✅ Clique direto | ❌ Abrir arquivo |
| **Cálculos** | ✅ Automáticos | ⚠️ Fórmulas manuais |
| **Gráficos** | ✅ Interativos | ⚠️ Estáticos |
| **Visual** | ✅ Moderno | ❌ Padrão |
| **Acesso** | ✅ Qualquer navegador | ❌ Precisa Excel |
| **Salvamento** | ✅ Automático | ❌ Manual |
| **Compartilhar** | ✅ Exporta facilmente | ⚠️ Enviar arquivo |
| **Mobilidade** | ✅ Funciona em tablet/phone | ⚠️ Versão mobile limitada |

---

## 🎓 Glossário

- **Auto-save:** Salvamento automático sem precisar clicar em "Salvar"
- **localStorage:** Armazenamento local no navegador
- **CSV:** Formato de arquivo compatível com Excel (Comma Separated Values)
- **XLSX:** Formato nativo do Microsoft Excel
- **ROI:** Return on Investment (Retorno sobre Investimento)
- **MVP:** Minimum Viable Product (Produto Mínimo Viável)
- **CDN:** Content Delivery Network
- **IA:** Inteligência Artificial
- **PLN:** Processamento de Linguagem Natural

---

**Versão do Guia:** 1.0
**Data:** Novembro 2025
**Desenvolvedor:** EasyCompliance Team

---

## 📎 Links Úteis

- [Planilha de Custos](./planilha-custos.html)
- [Proposta Principal](./index.html)
- [Resumo Executivo Custos](./RESUMO_CUSTOS_EXECUTIVO.md)
- [Planilha Completa (Markdown)](./PLANILHA_CUSTOS_MVP.md)

---

**Dúvidas?** Este guia cobre 99% dos casos de uso. Para situações específicas, consulte os documentos de referência ou entre em contato.
