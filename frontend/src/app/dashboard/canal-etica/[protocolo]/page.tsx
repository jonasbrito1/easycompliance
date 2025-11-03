'use client'

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  AlertCircle,
  Calendar,
  Clock,
  User,
  MapPin,
  Building,
  FileText,
  MessageSquare,
  Paperclip,
  Eye,
  TrendingUp,
  Send,
  Shield
} from 'lucide-react';
import { ethicsChannelService } from '@/services/ethics-channel/ethics-channel.service';
import {
  EthicsReport,
  ETHICS_REPORT_STATUS_LABELS,
  ETHICS_REPORT_TYPE_LABELS,
  ETHICS_REPORT_PRIORITY_LABELS,
  ETHICS_REPORT_ORIGIN_LABELS,
  EthicsReportStatus,
  UpdateStatusRequest,
} from '@/lib/api/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DetalheDenunciaPage() {
  const params = useParams();
  const router = useRouter();
  const protocol = params.protocolo as string;

  const [report, setReport] = useState<EthicsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');

  // TODO: Pegar do contexto/store
  const companyId = '123e4567-e89b-12d3-a456-426614174000';
  const currentUser = {
    id: 'user-123',
    name: 'João Silva',
    role: 'Investigador'
  };

  useEffect(() => {
    fetchReport();
  }, [protocol]);

  const fetchReport = async () => {
    try {
      const data = await ethicsChannelService.getReportByProtocol(protocol, companyId);
      setReport(data);
      setSelectedStatus(data.status);
    } catch (err: any) {
      setError('Denúncia não encontrada');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !report) return;

    setSendingMessage(true);
    try {
      await ethicsChannelService.addInteraction(report.id, companyId, {
        message: newMessage,
        isInternal: false,
        authorName: currentUser.name,
        authorId: currentUser.id,
        authorRole: currentUser.role,
      });
      setNewMessage('');
      await fetchReport(); // Recarregar para mostrar nova mensagem
    } catch (err) {
      alert('Erro ao enviar mensagem');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!report || !selectedStatus) return;
    if (selectedStatus === report.status) return;

    setUpdatingStatus(true);
    try {
      const data: UpdateStatusRequest = {
        status: selectedStatus as EthicsReportStatus,
        reason: statusReason || undefined,
        userId: currentUser.id,
        userName: currentUser.name,
      };
      await ethicsChannelService.updateStatus(report.id, companyId, data);
      setStatusReason('');
      await fetchReport();
    } catch (err) {
      alert('Erro ao atualizar status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NOVO: 'bg-blue-100 text-blue-800',
      EM_ANALISE: 'bg-yellow-100 text-yellow-800',
      EM_INVESTIGACAO: 'bg-orange-100 text-orange-800',
      AGUARDANDO_INFORMACOES: 'bg-purple-100 text-purple-800',
      AGUARDANDO_DECISAO: 'bg-indigo-100 text-indigo-800',
      EM_ACAO: 'bg-cyan-100 text-cyan-800',
      CONCLUIDO: 'bg-green-100 text-green-800',
      ARQUIVADO: 'bg-gray-100 text-gray-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      BAIXA: 'bg-green-100 text-green-800',
      MEDIA: 'bg-yellow-100 text-yellow-800',
      ALTA: 'bg-orange-100 text-orange-800',
      URGENTE: 'bg-red-100 text-red-800',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Denúncia não encontrada</h2>
          <p className="text-gray-600 mb-6">
            O protocolo informado não foi encontrado ou você não tem permissão para acessá-lo.
          </p>
          <Link
            href="/dashboard/canal-etica"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/canal-etica"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Lista
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Protocolo: {report.protocol}
              </h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                {ETHICS_REPORT_STATUS_LABELS[report.status]}
              </span>
            </div>
            <p className="text-lg text-gray-700">{report.title}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            {report.viewCount} visualizações
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getPriorityColor(report.priority)}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Prioridade</p>
              <p className="font-semibold text-gray-900">
                {ETHICS_REPORT_PRIORITY_LABELS[report.priority]}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Criado em</p>
              <p className="font-semibold text-gray-900 text-sm">
                {formatDate(report.reportedAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Última Interação</p>
              <p className="font-semibold text-gray-900 text-sm">
                {formatDate(report.lastInteractionAt)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tipo</p>
              <p className="font-semibold text-gray-900 text-sm">
                {report.isAnonymous ? 'Anônimo' : 'Identificado'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Descrição da Denúncia
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="whitespace-pre-wrap">{report.description}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h2>
            <div className="grid grid-cols-2 gap-4">
              {report.unit && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Unidade</p>
                    <p className="text-sm font-medium text-gray-900">{report.unit}</p>
                  </div>
                </div>
              )}
              {report.department && (
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Departamento</p>
                    <p className="text-sm font-medium text-gray-900">{report.department}</p>
                  </div>
                </div>
              )}
              {report.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Localização</p>
                    <p className="text-sm font-medium text-gray-900">{report.location}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Tipo de Denúncia</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ETHICS_REPORT_TYPE_LABELS[report.type]}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Origem</p>
                  <p className="text-sm font-medium text-gray-900">
                    {ETHICS_REPORT_ORIGIN_LABELS[report.origin]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Interações ({report.interactions?.length || 0})
            </h2>
            <div className="space-y-4 mb-4">
              {report.interactions && report.interactions.length > 0 ? (
                report.interactions.map((interaction) => (
                  <div
                    key={interaction.id}
                    className={`p-4 rounded-lg ${interaction.isFromReporter ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{interaction.authorName}</span>
                        {interaction.authorRole && (
                          <span className="text-xs text-gray-500">• {interaction.authorRole}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(interaction.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{interaction.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Nenhuma interação ainda</p>
              )}
            </div>

            {/* New Message Form */}
            <form onSubmit={handleSendMessage} className="border-t pt-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                placeholder="Digite sua mensagem..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sendingMessage}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sendingMessage ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Status & Timeline */}
        <div className="space-y-6">
          {/* Status Update */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alterar Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(ETHICS_REPORT_STATUS_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              {selectedStatus !== report.status && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Justificativa (opcional)
                    </label>
                    <textarea
                      value={statusReason}
                      onChange={(e) => setStatusReason(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Descreva o motivo da mudança de status..."
                    />
                  </div>
                  <button
                    onClick={handleUpdateStatus}
                    disabled={updatingStatus}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updatingStatus ? 'Atualizando...' : 'Atualizar Status'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Linha do Tempo</h2>
            <div className="space-y-4">
              {report.timeline && report.timeline.length > 0 ? (
                report.timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    {index !== report.timeline!.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-blue-600 mt-1 z-10"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{event.userName}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {formatDate(event.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">Nenhum evento ainda</p>
              )}
            </div>
          </div>

          {/* Tags */}
          {report.tags && report.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {report.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
