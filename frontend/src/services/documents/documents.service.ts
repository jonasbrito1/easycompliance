import { apiClient } from '@/lib/api/client';
import {
  Document,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  ShareDocumentRequest,
  DocumentStatistics,
} from '@/lib/api/types';

export const documentsService = {
  /**
   * Criar novo documento
   */
  async createDocument(data: CreateDocumentRequest): Promise<Document> {
    const response = await apiClient.post('/documents', data);
    return response.data;
  },

  /**
   * Listar documentos
   */
  async getDocuments(params: {
    companyId: string;
    type?: string;
    status?: string;
    category?: string;
    search?: string;
    ownerId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Document[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const response = await apiClient.get('/documents', { params });
    return response.data;
  },

  /**
   * Buscar documento por ID
   */
  async getDocument(id: string, companyId: string): Promise<Document> {
    const response = await apiClient.get(`/documents/${id}`, {
      params: { companyId },
    });
    return response.data;
  },

  /**
   * Atualizar documento
   */
  async updateDocument(
    id: string,
    companyId: string,
    userId: string,
    userName: string,
    data: UpdateDocumentRequest,
  ): Promise<Document> {
    const response = await apiClient.put(`/documents/${id}`, data, {
      params: { companyId, userId, userName },
    });
    return response.data;
  },

  /**
   * Compartilhar documento
   */
  async shareDocument(
    id: string,
    companyId: string,
    data: ShareDocumentRequest,
  ) {
    const response = await apiClient.post(`/documents/${id}/share`, data, {
      params: { companyId },
    });
    return response.data;
  },

  /**
   * Adicionar comentário
   */
  async addComment(
    id: string,
    companyId: string,
    content: string,
    authorId: string,
    authorName: string,
    page?: number,
  ) {
    const response = await apiClient.post(
      `/documents/${id}/comments`,
      { content, authorId, authorName, page },
      { params: { companyId } },
    );
    return response.data;
  },

  /**
   * Registrar download
   */
  async recordDownload(
    id: string,
    companyId: string,
    userId: string,
    userName: string,
  ) {
    const response = await apiClient.post(
      `/documents/${id}/download`,
      {},
      { params: { companyId, userId, userName } },
    );
    return response.data;
  },

  /**
   * Excluir documento
   */
  async deleteDocument(
    id: string,
    companyId: string,
    userId: string,
    userName: string,
  ) {
    const response = await apiClient.delete(`/documents/${id}`, {
      params: { companyId, userId, userName },
    });
    return response.data;
  },

  /**
   * Obter estatísticas
   */
  async getStatistics(companyId: string): Promise<DocumentStatistics> {
    const response = await apiClient.get('/documents/statistics', {
      params: { companyId },
    });
    return response.data;
  },

  /**
   * Formata tamanho do arquivo
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  },

  /**
   * Obtém ícone por tipo de arquivo
   */
  getFileIcon(mimeType: string): string {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️';
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('video')) return '🎥';
    if (mimeType.includes('audio')) return '🎵';
    if (mimeType.includes('zip') || mimeType.includes('compressed')) return '📦';
    return '📁';
  },
};
