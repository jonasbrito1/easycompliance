// ==================== USER & AUTH ====================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'CONSULTOR' | 'EMPRESA_ADMIN' | 'EMPRESA_USER';
  tenant: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ==================== CANAL DE ÉTICA ====================

export enum EthicsReportType {
  ASSEDIO_MORAL = 'ASSEDIO_MORAL',
  ASSEDIO_SEXUAL = 'ASSEDIO_SEXUAL',
  DISCRIMINACAO = 'DISCRIMINACAO',
  FRAUDE = 'FRAUDE',
  CORRUPCAO = 'CORRUPCAO',
  CONFLITO_INTERESSES = 'CONFLITO_INTERESSES',
  VIOLACAO_CODIGO_ETICA = 'VIOLACAO_CODIGO_ETICA',
  VIOLACAO_POLITICAS = 'VIOLACAO_POLITICAS',
  ROUBO_FURTO = 'ROUBO_FURTO',
  USO_INDEVIDO_RECURSOS = 'USO_INDEVIDO_RECURSOS',
  VAZAMENTO_INFORMACOES = 'VAZAMENTO_INFORMACOES',
  MEIO_AMBIENTE = 'MEIO_AMBIENTE',
  SEGURANCA_TRABALHO = 'SEGURANCA_TRABALHO',
  OUTROS = 'OUTROS',
}

export enum EthicsReportStatus {
  NOVO = 'NOVO',
  EM_ANALISE = 'EM_ANALISE',
  EM_INVESTIGACAO = 'EM_INVESTIGACAO',
  AGUARDANDO_INFORMACOES = 'AGUARDANDO_INFORMACOES',
  AGUARDANDO_DECISAO = 'AGUARDANDO_DECISAO',
  EM_ACAO = 'EM_ACAO',
  CONCLUIDO = 'CONCLUIDO',
  ARQUIVADO = 'ARQUIVADO',
  CANCELADO = 'CANCELADO',
}

export enum EthicsReportOrigin {
  WEB_ANONIMO = 'WEB_ANONIMO',
  WEB_IDENTIFICADO = 'WEB_IDENTIFICADO',
  TELEFONE = 'TELEFONE',
  EMAIL = 'EMAIL',
  PRESENCIAL = 'PRESENCIAL',
  CARTA = 'CARTA',
  TERCEIROS = 'TERCEIROS',
}

export enum EthicsReportPriority {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

export interface EthicsReport {
  id: string;
  protocol: string;
  type: EthicsReportType;
  title: string;
  description: string;
  status: EthicsReportStatus;
  substatus?: string;
  priority: EthicsReportPriority;
  origin: EthicsReportOrigin;
  isAnonymous: boolean;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  unit?: string;
  department?: string;
  location?: string;
  involvedParties?: string;
  witnesses?: string;
  incidentDate?: string;
  reportedAt: string;
  dueDate?: string;
  lastInteractionAt: string;
  closedAt?: string;
  assignedTo?: string;
  investigationTeam?: string;
  estimatedDays?: number;
  conclusion?: string;
  actionsTaken?: string;
  isFounded?: boolean;
  riskLevel: string;
  viewCount: number;
  isActive: boolean;
  tags: string[];
  companyId: string;
  company?: {
    name: string;
    cnpj?: string;
  };
  _count?: {
    interactions: number;
    attachments: number;
  };
  interactions?: EthicsReportInteraction[];
  attachments?: EthicsReportAttachment[];
  timeline?: EthicsReportTimeline[];
  createdAt: string;
  updatedAt: string;
}

export interface EthicsReportInteraction {
  id: string;
  message: string;
  isInternal: boolean;
  isFromReporter: boolean;
  authorId?: string;
  authorName: string;
  authorRole?: string;
  isVisible: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EthicsReportAttachment {
  id: string;
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  uploadedBy?: string;
  isEvidence: boolean;
  isConfidential: boolean;
  uploadedAt: string;
}

export interface EthicsReportTimeline {
  id: string;
  action: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  userId?: string;
  userName: string;
  userRole?: string;
  metadata?: any;
  ipAddress?: string;
  createdAt: string;
}

export interface CreateEthicsReportRequest {
  type: EthicsReportType;
  title: string;
  description: string;
  origin: EthicsReportOrigin;
  isAnonymous: boolean;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  unit?: string;
  department?: string;
  location?: string;
  involvedParties?: string;
  witnesses?: string;
  incidentDate?: string;
  tags?: string[];
  companyId: string;
}

export interface AddInteractionRequest {
  message: string;
  isInternal?: boolean;
  isFromReporter?: boolean;
  authorName: string;
  authorId?: string;
  authorRole?: string;
}

export interface UpdateStatusRequest {
  status: EthicsReportStatus;
  substatus?: string;
  reason?: string;
  userId: string;
  userName: string;
}

export interface UpdateEthicsReportRequest {
  assignedTo?: string;
  investigationTeam?: string;
  priority?: EthicsReportPriority;
  riskLevel?: string;
  dueDate?: string;
  estimatedDays?: number;
  conclusion?: string;
  actionsTaken?: string;
  isFounded?: boolean;
  requiresAction?: boolean;
}

export interface EthicsChannelStatistics {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  avgResponseTime: number;
}

// Labels/Traduções
export const ETHICS_REPORT_TYPE_LABELS: Record<EthicsReportType, string> = {
  ASSEDIO_MORAL: 'Assédio Moral',
  ASSEDIO_SEXUAL: 'Assédio Sexual',
  DISCRIMINACAO: 'Discriminação',
  FRAUDE: 'Fraude',
  CORRUPCAO: 'Corrupção/Suborno',
  CONFLITO_INTERESSES: 'Conflito de Interesses',
  VIOLACAO_CODIGO_ETICA: 'Violação do Código de Ética',
  VIOLACAO_POLITICAS: 'Violação de Políticas Internas',
  ROUBO_FURTO: 'Roubo ou Furto',
  USO_INDEVIDO_RECURSOS: 'Uso Indevido de Recursos',
  VAZAMENTO_INFORMACOES: 'Vazamento de Informações',
  MEIO_AMBIENTE: 'Violação Ambiental',
  SEGURANCA_TRABALHO: 'Segurança do Trabalho',
  OUTROS: 'Outros',
};

export const ETHICS_REPORT_STATUS_LABELS: Record<EthicsReportStatus, string> = {
  NOVO: 'Novo',
  EM_ANALISE: 'Em Análise',
  EM_INVESTIGACAO: 'Em Investigação',
  AGUARDANDO_INFORMACOES: 'Aguardando Informações',
  AGUARDANDO_DECISAO: 'Aguardando Decisão',
  EM_ACAO: 'Em Ação',
  CONCLUIDO: 'Concluído',
  ARQUIVADO: 'Arquivado',
  CANCELADO: 'Cancelado',
};

export const ETHICS_REPORT_PRIORITY_LABELS: Record<EthicsReportPriority, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
  URGENTE: 'Urgente',
};

export const ETHICS_REPORT_ORIGIN_LABELS: Record<EthicsReportOrigin, string> = {
  WEB_ANONIMO: 'Web (Anônimo)',
  WEB_IDENTIFICADO: 'Web (Identificado)',
  TELEFONE: 'Telefone/0800',
  EMAIL: 'E-mail',
  PRESENCIAL: 'Presencial',
  CARTA: 'Carta',
  TERCEIROS: 'Terceiros',
};

// ==================== DOCUMENTOS ====================

export enum DocumentType {
  POLITICA = 'POLITICA',
  PROCEDIMENTO = 'PROCEDIMENTO',
  INSTRUCAO = 'INSTRUCAO',
  FORMULARIO = 'FORMULARIO',
  MANUAL = 'MANUAL',
  NORMA = 'NORMA',
  CODIGO_ETICA = 'CODIGO_ETICA',
  CONTRATO = 'CONTRATO',
  REGULAMENTO = 'REGULAMENTO',
  RELATORIO = 'RELATORIO',
  ATA = 'ATA',
  CERTIFICADO = 'CERTIFICADO',
  OUTROS = 'OUTROS',
}

export enum DocumentStatus {
  RASCUNHO = 'RASCUNHO',
  REVISAO = 'REVISAO',
  APROVACAO = 'APROVACAO',
  APROVADO = 'APROVADO',
  VIGENTE = 'VIGENTE',
  OBSOLETO = 'OBSOLETO',
  ARQUIVADO = 'ARQUIVADO',
  CANCELADO = 'CANCELADO',
}

export enum DocumentConfidentiality {
  PUBLICA = 'PUBLICA',
  INTERNA = 'INTERNA',
  CONFIDENCIAL = 'CONFIDENCIAL',
  RESTRITA = 'RESTRITA',
  SECRETA = 'SECRETA',
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  type: DocumentType;
  category?: string;
  confidentiality: DocumentConfidentiality;
  status: DocumentStatus;
  version: string;
  versionMajor: number;
  versionMinor: number;
  isLatestVersion: boolean;
  tags: string[];
  keywords: string[];
  code?: string;
  department?: string;
  process?: string;
  language: string;
  ownerId?: string;
  ownerName?: string;
  reviewerId?: string;
  approverId?: string;
  createdAt: string;
  updatedAt: string;
  uploadedAt: string;
  publishedAt?: string;
  effectiveDate?: string;
  expiryDate?: string;
  reviewDate?: string;
  approvedAt?: string;
  isPublic: boolean;
  requiresAuth: boolean;
  downloadCount: number;
  viewCount: number;
  isActive: boolean;
  isDeleted: boolean;
  isSigned: boolean;
  isEncrypted: boolean;
  companyId: string;
  company?: {
    name: string;
  };
  _count?: {
    versions: number;
    comments: number;
    shares: number;
  };
  versions?: DocumentVersion[];
  shares?: DocumentShare[];
  comments?: DocumentComment[];
  activities?: DocumentActivity[];
  approvals?: DocumentApproval[];
}

export interface DocumentVersion {
  id: string;
  version: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  changeLog?: string;
  createdBy?: string;
  createdByName: string;
  createdAt: string;
}

export interface DocumentShare {
  id: string;
  sharedWithType: string;
  sharedWithId?: string;
  sharedWithName: string;
  canView: boolean;
  canDownload: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
  expiresAt?: string;
  sharedBy?: string;
  sharedByName: string;
  createdAt: string;
}

export interface DocumentComment {
  id: string;
  content: string;
  page?: number;
  authorId?: string;
  authorName: string;
  authorRole?: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentActivity {
  id: string;
  action: string;
  description: string;
  oldValue?: string;
  newValue?: string;
  userId?: string;
  userName: string;
  userRole?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface DocumentApproval {
  id: string;
  approverId: string;
  approverName: string;
  approverRole?: string;
  status: string;
  comments?: string;
  order: number;
  isRequired: boolean;
  requestedAt: string;
  respondedAt?: string;
}

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  type: DocumentType;
  category?: string;
  confidentiality: DocumentConfidentiality;
  code?: string;
  department?: string;
  process?: string;
  tags?: string[];
  keywords?: string[];
  ownerId?: string;
  ownerName?: string;
  effectiveDate?: string;
  expiryDate?: string;
  reviewDate?: string;
  isPublic?: boolean;
  companyId: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  status?: DocumentStatus;
  confidentiality?: DocumentConfidentiality;
  category?: string;
  department?: string;
  process?: string;
  tags?: string[];
  reviewerId?: string;
  approverId?: string;
  effectiveDate?: string;
  expiryDate?: string;
  reviewDate?: string;
  isPublic?: boolean;
}

export interface ShareDocumentRequest {
  sharedWithType: string;
  sharedWithId?: string;
  sharedWithName: string;
  canView?: boolean;
  canDownload?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canShare?: boolean;
  expiresAt?: string;
  sharedBy: string;
  sharedByName: string;
}

export interface DocumentStatistics {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  expiringDocs: number;
  recentDocs: number;
}

// Labels/Traduções
export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  POLITICA: 'Política',
  PROCEDIMENTO: 'Procedimento',
  INSTRUCAO: 'Instrução de Trabalho',
  FORMULARIO: 'Formulário',
  MANUAL: 'Manual',
  NORMA: 'Norma',
  CODIGO_ETICA: 'Código de Ética',
  CONTRATO: 'Contrato',
  REGULAMENTO: 'Regulamento',
  RELATORIO: 'Relatório',
  ATA: 'Ata',
  CERTIFICADO: 'Certificado',
  OUTROS: 'Outros',
};

export const DOCUMENT_STATUS_LABELS: Record<DocumentStatus, string> = {
  RASCUNHO: 'Rascunho',
  REVISAO: 'Em Revisão',
  APROVACAO: 'Em Aprovação',
  APROVADO: 'Aprovado',
  VIGENTE: 'Vigente',
  OBSOLETO: 'Obsoleto',
  ARQUIVADO: 'Arquivado',
  CANCELADO: 'Cancelado',
};

export const DOCUMENT_CONFIDENTIALITY_LABELS: Record<DocumentConfidentiality, string> = {
  PUBLICA: 'Pública',
  INTERNA: 'Interna',
  CONFIDENCIAL: 'Confidencial',
  RESTRITA: 'Restrita',
  SECRETA: 'Secreta',
}
