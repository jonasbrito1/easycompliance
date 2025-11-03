'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { documentsService } from '@/services/documents/documents.service';
import {
  DocumentType,
  DocumentConfidentiality,
  DOCUMENT_TYPE_LABELS,
  DOCUMENT_CONFIDENTIALITY_LABELS,
} from '@/lib/api/types';

export default function NovoDocumentoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as DocumentType,
    confidentiality: DocumentConfidentiality.INTERNA,
    code: '',
    department: '',
    category: '',
    tags: [] as string[],
    effectiveDate: '',
    expiryDate: '',
    reviewDate: '',
  });

  // TODO: Pegar companyId e user do contexto/store
  const companyId = '123e4567-e89b-12d3-a456-426614174000';
  const currentUser = { id: 'user-123', name: 'João Silva' };

  // Simulação de upload (em produção, usar storage real)
  const [fileInfo, setFileInfo] = useState({
    fileName: '',
    fileUrl: '',
    fileSize: 0,
    mimeType: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em produção: fazer upload para S3/Azure/etc
      setFileInfo({
        fileName: file.name,
        fileUrl: `https://storage.example.com/${file.name}`, // Mock URL
        fileSize: file.size,
        mimeType: file.type,
      });
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.type || !fileInfo.fileName) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const doc = await documentsService.createDocument({
        ...formData,
        ...fileInfo,
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        companyId,
      });

      router.push(`/dashboard/documentos/${doc.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar documento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/documentos" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Documentos
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Novo Documento</h1>
        <p className="text-gray-600 mt-1">Faça upload e registre um novo documento</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Upload do Arquivo</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                {fileInfo.fileName || 'Clique para selecionar um arquivo'}
              </p>
              {fileInfo.fileName && (
                <p className="text-xs text-gray-500">
                  {documentsService.formatFileSize(fileInfo.fileSize)}
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Informações do Documento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as DocumentType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione</option>
                {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confidencialidade *</label>
              <select
                value={formData.confidentiality}
                onChange={(e) => setFormData({ ...formData, confidentiality: e.target.value as DocumentConfidentiality })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(DOCUMENT_CONFIDENTIALITY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Código</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: POL-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Datas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Datas e Prazos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vigência</label>
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Revisão</label>
              <input
                type="date"
                value={formData.reviewDate}
                onChange={(e) => setFormData({ ...formData, reviewDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Documento'}
          </button>
        </div>
      </form>
    </div>
  );
}
