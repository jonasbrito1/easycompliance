'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  MessageSquare,
  Paperclip,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { ethicsChannelService } from '@/services/ethics-channel/ethics-channel.service';
import {
  EthicsReport,
  ETHICS_REPORT_STATUS_LABELS,
  ETHICS_REPORT_TYPE_LABELS,
  ETHICS_REPORT_PRIORITY_LABELS,
  ETHICS_REPORT_ORIGIN_LABELS
} from '@/lib/api/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function CanalEticaPage() {
  const router = useRouter();
  const [reports, setReports] = useState<EthicsReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<EthicsReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // TODO: Pegar companyId do contexto/store do usuário
  const companyId = '123e4567-e89b-12d3-a456-426614174000';

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, statusFilter, typeFilter, priorityFilter]);

  const fetchReports = async () => {
    try {
      const data = await ethicsChannelService.getReports({ companyId });
      setReports(data);
      setFilteredReports(data);
    } catch (error) {
      console.error('Erro ao carregar denúncias:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de status
    if (statusFilter) {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    // Filtro de tipo
    if (typeFilter) {
      filtered = filtered.filter((report) => report.type === typeFilter);
    }

    // Filtro de prioridade
    if (priorityFilter) {
      filtered = filtered.filter((report) => report.priority === priorityFilter);
    }

    setFilteredReports(filtered);
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Canal de Ética</h1>
          <p className="text-gray-600 mt-1">
            Gestão de denúncias e chamados éticos
          </p>
        </div>
        <Link
          href="/dashboard/canal-etica/nova"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Denúncia
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Denúncias</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{reports.length}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Novos</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {reports.filter((r) => r.status === 'NOVO').length}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Andamento</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {reports.filter((r) => ['EM_ANALISE', 'EM_INVESTIGACAO', 'EM_ACAO'].includes(r.status)).length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-orange-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Concluídos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {reports.filter((r) => r.status === 'CONCLUIDO').length}
              </p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por protocolo, título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os Status</option>
            {Object.entries(ETHICS_REPORT_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os Tipos</option>
            {Object.entries(ETHICS_REPORT_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas as Prioridades</option>
            {Object.entries(ETHICS_REPORT_PRIORITY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Protocolo / ID Interno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Interação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status / Substatus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo / Unidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Origem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criação / Expiração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhuma denúncia encontrada</p>
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/dashboard/canal-etica/${report.protocol}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-blue-600">{report.protocol}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(report.lastInteractionAt)}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {report._count?.interactions || 0}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Paperclip className="w-3 h-3" />
                          {report._count?.attachments || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {ETHICS_REPORT_STATUS_LABELS[report.status]}
                      </span>
                      {report.substatus && (
                        <div className="text-xs text-gray-500 mt-1">{report.substatus}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{ETHICS_REPORT_TYPE_LABELS[report.type]}</div>
                      {report.unit && <div className="text-xs text-gray-500 mt-1">{report.unit}</div>}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getPriorityColor(report.priority)}`}>
                        {ETHICS_REPORT_PRIORITY_LABELS[report.priority]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ETHICS_REPORT_ORIGIN_LABELS[report.origin]}
                      {report.isAnonymous && (
                        <div className="text-xs text-gray-500 mt-1">Anônimo</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(report.reportedAt)}
                      </div>
                      {report.dueDate && (
                        <div className={`text-xs mt-1 flex items-center gap-1 ${isOverdue(report.dueDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                          <Clock className="w-3 h-3" />
                          {formatDate(report.dueDate)}
                          {isOverdue(report.dueDate) && ' (Vencido)'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/dashboard/canal-etica/${report.protocol}`);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
