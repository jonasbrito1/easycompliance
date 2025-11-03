'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  Tag,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FolderOpen
} from 'lucide-react';
import { documentsService } from '@/services/documents/documents.service';
import {
  Document,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_STATUS_LABELS,
  DOCUMENT_CONFIDENTIALITY_LABELS,
} from '@/lib/api/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DocumentosPage() {
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estatísticas
  const [stats, setStats] = useState({
    total: 0,
    expiringDocs: 0,
    recentDocs: 0,
  });

  // TODO: Pegar companyId do contexto/store
  const companyId = '123e4567-e89b-12d3-a456-426614174000';

  useEffect(() => {
    fetchDocuments();
    fetchStatistics();
  }, [typeFilter, statusFilter, categoryFilter, searchTerm]);

  const fetchDocuments = async () => {
    try {
      const response = await documentsService.getDocuments({
        companyId,
        type: typeFilter || undefined,
        status: statusFilter || undefined,
        category: categoryFilter || undefined,
        search: searchTerm || undefined,
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const data = await documentsService.getStatistics(companyId);
      setStats({
        total: data.total,
        expiringDocs: data.expiringDocs,
        recentDocs: data.recentDocs,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return '-';
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      RASCUNHO: 'bg-gray-100 text-gray-800',
      REVISAO: 'bg-yellow-100 text-yellow-800',
      APROVACAO: 'bg-blue-100 text-blue-800',
      APROVADO: 'bg-green-100 text-green-800',
      VIGENTE: 'bg-green-100 text-green-800',
      OBSOLETO: 'bg-orange-100 text-orange-800',
      ARQUIVADO: 'bg-gray-100 text-gray-800',
      CANCELADO: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getConfidentialityColor = (conf: string) => {
    const colors: Record<string, string> = {
      PUBLICA: 'bg-green-100 text-green-800',
      INTERNA: 'bg-blue-100 text-blue-800',
      CONFIDENCIAL: 'bg-yellow-100 text-yellow-800',
      RESTRITA: 'bg-orange-100 text-orange-800',
      SECRETA: 'bg-red-100 text-red-800',
    };
    return colors[conf] || 'bg-gray-100 text-gray-800';
  };

  const isExpiring = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 30;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
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
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Documentos</h1>
          <p className="text-gray-600 mt-1">
            Sistema de Gestão Eletrônica de Documentos (GED)
          </p>
        </div>
        <Link
          href="/dashboard/documentos/novo"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Documento
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Documentos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Novos (7 dias)</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.recentDocs}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vencendo em 30 dias</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{stats.expiringDocs}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-500 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vigentes</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {documents.filter((d) => d.status === 'VIGENTE').length}
              </p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título, código, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os Tipos</option>
            {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os Status</option>
            {Object.entries(DOCUMENT_STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      {documents.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum documento encontrado</h3>
          <p className="text-gray-600 mb-6">
            Comece fazendo upload do seu primeiro documento
          </p>
          <Link
            href="/dashboard/documentos/novo"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Documento
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => router.push(`/dashboard/documentos/${doc.id}`)}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Icon & Type */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">
                  {documentsService.getFileIcon(doc.mimeType)}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                  {DOCUMENT_STATUS_LABELS[doc.status]}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {doc.title}
              </h3>

              {/* Code */}
              {doc.code && (
                <p className="text-sm text-gray-500 mb-3">Código: {doc.code}</p>
              )}

              {/* Type & Version */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  {DOCUMENT_TYPE_LABELS[doc.type]}
                </span>
                <span className="text-xs text-gray-500">v{doc.version}</span>
              </div>

              {/* Confidentiality */}
              <div className="mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getConfidentialityColor(doc.confidentiality)}`}>
                  {DOCUMENT_CONFIDENTIALITY_LABELS[doc.confidentiality]}
                </span>
              </div>

              {/* Expiry Warning */}
              {isExpired(doc.expiryDate) && (
                <div className="flex items-center gap-2 text-red-600 text-xs mb-2">
                  <AlertCircle className="w-3 h-3" />
                  Vencido em {formatDate(doc.expiryDate)}
                </div>
              )}
              {isExpiring(doc.expiryDate) && !isExpired(doc.expiryDate) && (
                <div className="flex items-center gap-2 text-orange-600 text-xs mb-2">
                  <Clock className="w-3 h-3" />
                  Vence em {formatDate(doc.expiryDate)}
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {doc.viewCount}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {doc.downloadCount}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(doc.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidencialidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Versão</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/dashboard/documentos/${doc.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{documentsService.getFileIcon(doc.mimeType)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                        {doc.code && <div className="text-xs text-gray-500">{doc.code}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {DOCUMENT_TYPE_LABELS[doc.type]}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                      {DOCUMENT_STATUS_LABELS[doc.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getConfidentialityColor(doc.confidentiality)}`}>
                      {DOCUMENT_CONFIDENTIALITY_LABELS[doc.confidentiality]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">v{doc.version}</td>
                  <td className="px-6 py-4 text-sm">
                    {isExpired(doc.expiryDate) ? (
                      <span className="text-red-600 font-medium">Vencido</span>
                    ) : isExpiring(doc.expiryDate) ? (
                      <span className="text-orange-600">Vencendo</span>
                    ) : doc.expiryDate ? (
                      formatDate(doc.expiryDate)
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/documentos/${doc.id}`);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
