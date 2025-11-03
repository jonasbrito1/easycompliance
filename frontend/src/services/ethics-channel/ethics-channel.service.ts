import { apiClient } from '@/lib/api/client';
import {
  EthicsReport,
  CreateEthicsReportRequest,
  AddInteractionRequest,
  UpdateStatusRequest,
  UpdateEthicsReportRequest,
  EthicsChannelStatistics,
} from '@/lib/api/types';

export const ethicsChannelService = {
  /**
   * Criar nova denúncia
   */
  async createReport(data: CreateEthicsReportRequest): Promise<EthicsReport> {
    const response = await apiClient.post('/ethics-channel/reports', data);
    return response.data;
  },

  /**
   * Listar denúncias de uma empresa
   */
  async getReports(params: {
    companyId: string;
    status?: string;
    type?: string;
    priority?: string;
    search?: string;
  }): Promise<EthicsReport[]> {
    const response = await apiClient.get('/ethics-channel/reports', { params });
    return response.data;
  },

  /**
   * Buscar denúncia por protocolo
   */
  async getReportByProtocol(
    protocol: string,
    companyId: string,
  ): Promise<EthicsReport> {
    const response = await apiClient.get(
      `/ethics-channel/reports/${protocol}`,
      {
        params: { companyId },
      },
    );
    return response.data;
  },

  /**
   * Adicionar interação/mensagem
   */
  async addInteraction(
    reportId: string,
    companyId: string,
    data: AddInteractionRequest,
  ) {
    const response = await apiClient.post(
      `/ethics-channel/reports/${reportId}/interactions`,
      data,
      {
        params: { companyId },
      },
    );
    return response.data;
  },

  /**
   * Atualizar status da denúncia
   */
  async updateStatus(
    reportId: string,
    companyId: string,
    data: UpdateStatusRequest,
  ): Promise<EthicsReport> {
    const response = await apiClient.put(
      `/ethics-channel/reports/${reportId}/status`,
      data,
      {
        params: { companyId },
      },
    );
    return response.data;
  },

  /**
   * Atualizar informações da denúncia
   */
  async updateReport(
    reportId: string,
    companyId: string,
    userId: string,
    userName: string,
    data: UpdateEthicsReportRequest,
  ): Promise<EthicsReport> {
    const response = await apiClient.put(
      `/ethics-channel/reports/${reportId}`,
      data,
      {
        params: { companyId, userId, userName },
      },
    );
    return response.data;
  },

  /**
   * Obter estatísticas do canal
   */
  async getStatistics(
    companyId: string,
  ): Promise<EthicsChannelStatistics> {
    const response = await apiClient.get('/ethics-channel/statistics', {
      params: { companyId },
    });
    return response.data;
  },
};
