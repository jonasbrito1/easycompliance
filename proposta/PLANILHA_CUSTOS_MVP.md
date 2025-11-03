# 💰 Planilha de Custos MVP - EasyCompliance

## Período: 4 meses (Desenvolvimento MVP)
## Investimento Mensal: R$ 1.500,00
## Investimento Total: R$ 6.000,00

---

## 📊 Resumo Executivo

| Categoria | Custo Mensal | Custo Total (4 meses) | % do Orçamento |
|-----------|--------------|----------------------|----------------|
| 🤖 Ferramentas de IA | R$ 600,00 | R$ 2.400,00 | 40,0% |
| ☁️ Infraestrutura Cloud | R$ 200,00 | R$ 800,00 | 13,3% |
| 🔧 Ferramentas de Desenvolvimento | R$ 250,00 | R$ 1.000,00 | 16,7% |
| 📧 Comunicação & Email | R$ 80,00 | R$ 320,00 | 5,3% |
| 🔐 Segurança & Monitoramento | R$ 120,00 | R$ 480,00 | 8,0% |
| 📦 Armazenamento & CDN | R$ 60,00 | R$ 240,00 | 4,0% |
| 💼 Ferramentas de Gestão | R$ 50,00 | R$ 200,00 | 3,3% |
| ⚡ Imprevistos & Buffer | R$ 140,00 | R$ 560,00 | 9,3% |
| **TOTAL** | **R$ 1.500,00** | **R$ 6.000,00** | **100%** |

---

## 📋 Detalhamento por Categoria

### 🤖 1. Ferramentas de IA (R$ 600/mês)

| Ferramenta | Custo Mensal | Finalidade | Prioridade |
|------------|--------------|------------|------------|
| **OpenAI API (GPT-4)** | R$ 350,00 | - Análise automática de denúncias (Ethics Channel)<br>- Categorização de documentos<br>- Sugestões de controles de risco<br>- Assistente de compliance | ⭐ Crítico |
| **Claude API (Anthropic)** | R$ 150,00 | - Análise de documentos longos<br>- Geração de relatórios<br>- Backup do OpenAI | 🟡 Médio |
| **OpenAI Embeddings** | R$ 50,00 | - Busca semântica de documentos<br>- Similaridade de riscos | 🟡 Médio |
| **Hugging Face** | R$ 30,00 | - Modelos open-source<br>- Processamento de linguagem natural | 🟢 Baixo |
| **Reserva técnica IA** | R$ 20,00 | - Testes e experimentação<br>- Novos modelos | 🟢 Baixo |
| **SUBTOTAL** | **R$ 600,00** | | |

**Por que é o custo mais alto?**
- IA é o diferencial competitivo da plataforma
- Automatiza tarefas complexas (análise de denúncias)
- Reduz custo operacional futuro dos clientes
- Aumenta valor percebido do produto

---

### ☁️ 2. Infraestrutura Cloud (R$ 200/mês)

| Item | Custo Mensal | Especificação | Provider |
|------|--------------|---------------|----------|
| **Servidor Backend** | R$ 80,00 | - 2 vCPU, 4GB RAM<br>- Container NestJS<br>- Ambiente Dev + Staging | AWS EC2 / GCP Cloud Run |
| **Banco de Dados** | R$ 60,00 | - PostgreSQL 15<br>- 20GB SSD<br>- Backup automático | AWS RDS / GCP Cloud SQL |
| **Cache Redis** | R$ 30,00 | - 1GB RAM<br>- Cache de sessões<br>- Rate limiting | AWS ElastiCache / Upstash |
| **Domínio & SSL** | R$ 15,00 | - Domínio .com.br<br>- Certificado SSL (Let's Encrypt) | Registro.br + Cloudflare |
| **Serverless Functions** | R$ 15,00 | - Processamento assíncrono<br>- Jobs programados | AWS Lambda / Vercel |
| **SUBTOTAL** | **R$ 200,00** | | |

**Observações:**
- Durante MVP, usaremos tier gratuito quando possível
- Custos aumentarão na fase de produção
- Inclui ambiente de desenvolvimento e staging

---

### 🔧 3. Ferramentas de Desenvolvimento (R$ 250/mês)

| Ferramenta | Custo Mensal | Finalidade | Essencial? |
|------------|--------------|------------|------------|
| **GitHub Pro** | R$ 60,00 | - Repositórios privados ilimitados<br>- GitHub Actions (CI/CD)<br>- GitHub Copilot | ⭐ Sim |
| **Vercel Pro** | R$ 100,00 | - Hospedagem frontend Next.js<br>- Deploy automático<br>- Preview branches<br>- Edge Functions | ⭐ Sim |
| **Figma Professional** | R$ 60,00 | - Design System<br>- Protótipos interativos<br>- Colaboração designer/dev | ⭐ Sim |
| **Postman Team** | R$ 30,00 | - Documentação API<br>- Testes automatizados<br>- Ambientes compartilhados | 🟡 Recomendado |
| **SUBTOTAL** | **R$ 250,00** | | |

**Alternativas gratuitas durante MVP:**
- GitHub Free (limitações em Actions)
- Vercel Hobby (limitado a 1 projeto)
- Figma Free (3 projetos)

**Recomendação:** Investir nas versões pagas acelera desenvolvimento

---

### 📧 4. Comunicação & Email (R$ 80/mês)

| Serviço | Custo Mensal | Volume | Finalidade |
|---------|--------------|--------|------------|
| **SendGrid** | R$ 50,00 | - 40.000 emails/mês<br>- Templates transacionais | - Confirmação de cadastro<br>- Alertas de compliance<br>- Notificações de denúncias<br>- Recuperação de senha |
| **Twilio SMS** | R$ 30,00 | - 150 SMS/mês | - Autenticação 2FA<br>- Alertas críticos<br>- Verificação de telefone |
| **SUBTOTAL** | **R$ 80,00** | | |

**Projeção de uso (MVP com 5 clientes beta):**
- ~2.000 emails transacionais/mês
- ~50 SMS de 2FA/mês

---

### 🔐 5. Segurança & Monitoramento (R$ 120/mês)

| Ferramenta | Custo Mensal | Finalidade | Criticidade |
|------------|--------------|------------|-------------|
| **Sentry** | R$ 50,00 | - Monitoramento de erros<br>- Performance tracking<br>- Source maps<br>- Alertas em tempo real | ⭐ Crítico |
| **LogRocket / FullStory** | R$ 40,00 | - Session replay<br>- Debugging frontend<br>- Analytics de UX | 🟡 Médio |
| **Cloudflare Pro** | R$ 30,00 | - DDoS protection<br>- WAF (Web Application Firewall)<br>- Analytics<br>- Rate limiting | ⭐ Crítico |
| **SUBTOTAL** | **R$ 120,00** | | |

**Por que investir em segurança desde o MVP?**
- Lidamos com dados sensíveis (denúncias, compliance)
- LGPD exige proteção adequada
- Segurança é parte do produto, não custo adicional
- Evita incidentes que podem quebrar a confiança

---

### 📦 6. Armazenamento & CDN (R$ 60/mês)

| Serviço | Custo Mensal | Capacidade | Uso |
|---------|--------------|------------|-----|
| **AWS S3** | R$ 40,00 | - 100GB armazenamento<br>- 50GB transferência | - Documentos PDF<br>- Políticas de compliance<br>- Evidências de denúncias<br>- Backup de arquivos |
| **CloudFront CDN** | R$ 20,00 | - 100GB distribuição<br>- Cache global | - Delivery de documentos<br>- Assets estáticos<br>- Redução de latência |
| **SUBTOTAL** | **R$ 60,00** | | |

**Estimativa de uso (MVP):**
- ~500 documentos/mês
- Média 2MB por documento
- Total: ~1GB/mês (ampla margem)

---

### 💼 7. Ferramentas de Gestão (R$ 50/mês)

| Ferramenta | Custo Mensal | Finalidade | Essencial? |
|------------|--------------|------------|------------|
| **Notion Team** | R$ 30,00 | - Documentação do projeto<br>- Knowledge base<br>- Sprint planning<br>- Onboarding clientes beta | 🟡 Recomendado |
| **Linear** | R$ 20,00 | - Gestão de tarefas<br>- Bug tracking<br>- Roadmap<br>- Integrações Git | 🟡 Recomendado |
| **SUBTOTAL** | **R$ 50,00** | | |

**Alternativas gratuitas:**
- Notion Free (limitado)
- Trello / Asana (versões gratuitas)
- GitHub Issues (incluído)

---

### ⚡ 8. Reserva para Imprevistos (R$ 140/mês)

| Item | Valor Estimado | Quando Pode Ocorrer |
|------|----------------|---------------------|
| **Overages de API** | R$ 50,00 | - Picos de uso de IA<br>- Testes intensivos |
| **Testes com usuários** | R$ 30,00 | - Incentivos para beta testers<br>- Brindes/vouchers |
| **Integrações extras** | R$ 30,00 | - APIs não previstas<br>- Webhooks adicionais |
| **Upgrade emergencial** | R$ 30,00 | - Mais recursos de servidor<br>- Banda adicional |
| **SUBTOTAL** | **R$ 140,00** | |

**Por que reservar 9,3% para imprevistos?**
- Desenvolvimento sempre traz surpresas
- Permite flexibilidade sem estourar orçamento
- Margem de segurança para experimentos

---

## 💡 Otimizações e Economia

### ✅ Como estamos economizando:

1. **Tier gratuito de Cloud (primeiros meses)**
   - AWS: 12 meses free tier
   - GCP: $300 créditos iniciais
   - **Economia estimada:** R$ 400-600 nos primeiros 2-3 meses

2. **Open Source quando possível**
   - PostgreSQL (vs licenças Oracle/SQL Server)
   - Redis (vs memcached comercial)
   - Next.js/NestJS (vs frameworks pagos)
   - **Economia:** ~R$ 500/mês

3. **Ferramentas com planos para startups**
   - GitHub Startup Program (possível)
   - Sentry Startup Plan
   - **Economia potencial:** R$ 200/mês

4. **Hospedagem otimizada**
   - Vercel (deploy automático)
   - Serverless (paga por uso)
   - **Economia vs VPS tradicional:** R$ 300/mês

**ECONOMIA TOTAL POTENCIAL:** R$ 1.400-1.600/mês através de escolhas técnicas inteligentes

---

## 🚨 Custos NÃO Inclusos (virão depois do MVP)

| Item | Quando será necessário | Estimativa |
|------|------------------------|------------|
| **Certificações de segurança** | Fase 2 (clientes enterprise) | R$ 500-1.500/mês |
| **ClickSign/DocuSign** | Fase 2 (assinatura digital) | R$ 200-400/mês |
| **Vimeo Pro** | Fase 3 (universidade corporativa) | R$ 150/mês |
| **APIs Governamentais** | Fase 3 (Bacen, COAF, ANS) | R$ 300-800/mês |
| **Suporte técnico 24/7** | Pós-lançamento | R$ 500-1.000/mês |
| **Marketing & Vendas** | Pós-MVP | Variável |
| **Infraestrutura de produção** | Após 10+ clientes | R$ 800-2.000/mês |

**Total estimado Fase 2-3:** R$ 2.450 - R$ 5.850/mês

Estes custos serão cobertos pela receita recorrente dos clientes.

---

## 📈 Projeção de Custos por Fase

### Fase 1 - MVP (Meses 1-4)
```
Custo mensal: R$ 1.500
Custo total: R$ 6.000
Status: CONFIRMADO ✅
```

### Fase 2 - Crescimento (Meses 5-8)
```
Custo mensal estimado: R$ 2.500 - R$ 3.500
Inclui:
  - Custos do MVP: R$ 1.500
  - Integrações (ClickSign): R$ 300
  - Aumento de infraestrutura: R$ 400
  - Ferramentas adicionais: R$ 300
  - CTO remuneração: R$ 1.000 - R$ 2.000
```

### Fase 3 - Consolidação (Meses 9-12)
```
Custo mensal estimado: R$ 4.000 - R$ 6.000
Inclui:
  - Custos da Fase 2: R$ 2.800
  - APIs governamentais: R$ 500
  - Certificações: R$ 500
  - Escala de infra: R$ 800
  - CTO remuneração: R$ 1.500 - R$ 3.000
```

---

## 🎯 Análise Custo-Benefício

### ROI das Ferramentas de IA (R$ 600/mês)

**Valor gerado:**
- ✅ Análise automática de denúncias economiza ~10h/semana de trabalho manual
- ✅ Categorização de documentos: ~5h/semana economizadas
- ✅ Diferencial competitivo que permite cobrar 30-50% a mais
- ✅ Redução de 80% no tempo de due diligence

**Cálculo:**
- Economia de tempo: 15h/semana × 4 semanas = 60h/mês
- Valor hora consultor: R$ 150/h
- **Valor gerado:** R$ 9.000/mês por cliente
- **ROI:** 15x sobre o investimento em IA

### ROI da Infraestrutura Cloud (R$ 200/mês)

**Vs alternativa tradicional:**
- Servidor dedicado: R$ 800/mês
- Manutenção: R$ 400/mês
- **Economia:** R$ 1.000/mês (5x)

**Benefícios:**
- ✅ Escalabilidade automática
- ✅ Backup automatizado
- ✅ Zero downtime
- ✅ Deploy em minutos

---

## 💼 Distribuição do Investimento Total (4 meses)

```
╔══════════════════════════════════════════╗
║  INVESTIMENTO TOTAL MVP: R$ 6.000,00     ║
╚══════════════════════════════════════════╝

🤖 IA & Machine Learning        ████████████████░░  40,0%  R$ 2.400
☁️  Infraestrutura Cloud         ███░░░░░░░░░░░░░░░  13,3%  R$   800
🔧 Ferramentas Dev              ████░░░░░░░░░░░░░░  16,7%  R$ 1.000
📧 Comunicação                  █░░░░░░░░░░░░░░░░░   5,3%  R$   320
🔐 Segurança                    ██░░░░░░░░░░░░░░░░   8,0%  R$   480
📦 Armazenamento               █░░░░░░░░░░░░░░░░░   4,0%  R$   240
💼 Gestão                       █░░░░░░░░░░░░░░░░░   3,3%  R$   200
⚡ Imprevistos                  ██░░░░░░░░░░░░░░░░   9,3%  R$   560
```

---

## 📊 Comparação com Mercado

### Custos típicos de SaaS B2B2C similar:

| Item | Mercado (mensal) | Nossa escolha | Economia |
|------|------------------|---------------|----------|
| **Infraestrutura** | R$ 1.200 | R$ 200 | R$ 1.000 (83%) |
| **Ferramentas** | R$ 800 | R$ 250 | R$ 550 (69%) |
| **IA/ML** | R$ 1.500 | R$ 600 | R$ 900 (60%) |
| **Outros** | R$ 500 | R$ 450 | R$ 50 (10%) |
| **TOTAL** | **R$ 4.000** | **R$ 1.500** | **R$ 2.500 (62%)** |

**Como conseguimos essa economia?**
1. ✅ Uso inteligente de tiers gratuitos
2. ✅ Stack open-source moderno
3. ✅ Arquitetura serverless (paga por uso)
4. ✅ Foco em MVP (sem features desnecessárias)
5. ✅ Expertise técnica (não precisamos de agências)

---

## ✅ Validação do Orçamento

### Checklist de cobertura:

- [x] **Desenvolvimento funcional:** Ferramentas de dev cobertas
- [x] **Hospedagem confiável:** Infraestrutura adequada
- [x] **Diferencial competitivo:** IA implementada
- [x] **Segurança & compliance:** LGPD, monitoramento
- [x] **Comunicação com usuários:** Email, SMS
- [x] **Armazenamento de arquivos:** S3 + CDN
- [x] **Gestão de projeto:** Notion + Linear
- [x] **Margem de segurança:** 9,3% de buffer

### O que NÃO está coberto (e está OK):

- ❌ Salários (isso é a equity dos sócios)
- ❌ Marketing (vem depois do MVP)
- ❌ Escritório físico (trabalho remoto)
- ❌ Certificações enterprise (Fase 2)
- ❌ Integrações governamentais (Fase 3)

---

## 🎯 Recomendações Finais

### ✅ Manter no orçamento:

1. **Ferramentas de IA (R$ 600)** - É o diferencial
2. **Segurança (R$ 120)** - Não negociável para compliance
3. **Infraestrutura (R$ 200)** - Base sólida
4. **Imprevistos (R$ 140)** - Margem de segurança

### 🟡 Possíveis otimizações SE necessário:

1. **Ferramentas de Dev (R$ 250 → R$ 100)**
   - Usar GitHub Free temporariamente
   - Figma Free nos primeiros 2 meses
   - **Economia:** R$ 150/mês

2. **Gestão (R$ 50 → R$ 0)**
   - Usar apenas GitHub Issues
   - Notion gratuito
   - **Economia:** R$ 50/mês

3. **Comunicação (R$ 80 → R$ 40)**
   - Reduzir tier do SendGrid
   - Menos SMS no MVP
   - **Economia:** R$ 40/mês

**ECONOMIA TOTAL SE NECESSÁRIO:** R$ 240/mês (novo total: R$ 1.260)

### ⚠️ NÃO recomendamos cortar:

- ❌ IA (é o core do produto)
- ❌ Segurança (compliance exige)
- ❌ Infraestrutura (qualidade técnica)

---

## 📞 Próximos Passos

1. ✅ **Aprovar esta planilha de custos**
2. ⏳ **Definir contas e acessos** (AWS, OpenAI, etc.)
3. ⏳ **Configurar billing alerts** (evitar surpresas)
4. ⏳ **Estabelecer revisão mensal de custos**
5. ⏳ **Iniciar Fase 1 do desenvolvimento**

---

## 📝 Notas Importantes

### Sobre a Manutenção de Servidor (R$ 60):
O valor de R$ 60 mencionado está incluído nos R$ 200 de Infraestrutura Cloud:
- Banco de dados: R$ 60
- Servidor backend: R$ 80
- Cache Redis: R$ 30
- Outros: R$ 30

### Sobre as Ferramentas de IA (R$ 600):
Este é o investimento mais estratégico:
- Permite automação que seria impossível manualmente
- Diferencial competitivo claro vs concorrentes
- ROI comprovado em economia de tempo
- Habilita features premium (análise de denúncias)

### Transparência Total:
- Todos os custos são verificáveis (faturas disponíveis)
- Contas serão configuradas em nome da empresa
- Acesso compartilhado a dashboards de billing
- Revisão mensal conjunta dos gastos

---

## 🤝 Acordo de Transparência

**Compromisso:**
- ✅ Todas as despesas serão documentadas
- ✅ Faturas compartilhadas mensalmente
- ✅ Relatório de uso de cada ferramenta
- ✅ Otimização contínua de custos
- ✅ Renegociação se houver economia

**Meta de eficiência:**
- Manter custos abaixo de R$ 1.500/mês durante MVP
- Qualquer economia será reinvestida no produto
- Transparência total nos gastos

---

**Versão:** 1.0
**Data:** Novembro 2025
**Válido para:** Fase 1 - MVP (Meses 1-4)
**Próxima revisão:** Final do Mês 4 (antes da Fase 2)

---

**Assinaturas:**

**CEO/Sócio:**
- Nome: ____________________________
- Data: ____________________________

**CTO/Desenvolvedor:**
- Nome: ____________________________
- Data: ____________________________

---

## Anexo: Links de Referência

- **Proposta Comercial:** [PROPOSTA_COMERCIAL_FINAL.md](./PROPOSTA_COMERCIAL_FINAL.md)
- **Resumo do Projeto:** [RESUMO_PROJETO.md](./RESUMO_PROJETO.md)
- **Guia de Implementação:** [../MVP_IMPLEMENTATION_GUIDE.md](../MVP_IMPLEMENTATION_GUIDE.md)
- **Equities Atualizadas:** [RESUMO_EQUITIES_ATUALIZADAS.md](./RESUMO_EQUITIES_ATUALIZADAS.md)
