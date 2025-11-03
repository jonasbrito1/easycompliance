'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle, CheckCircle2, Shield, User, UserX } from 'lucide-react';
import Link from 'next/link';
import { ethicsChannelService } from '@/services/ethics-channel/ethics-channel.service';
import {
  EthicsReportType,
  EthicsReportOrigin,
  ETHICS_REPORT_TYPE_LABELS,
  CreateEthicsReportRequest,
} from '@/lib/api/types';

export default function NovaDenunciaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [protocol, setProtocol] = useState('');
  const [error, setError] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const [formData, setFormData] = useState({
    type: '' as EthicsReportType,
    title: '',
    description: '',
    // Dados do denunciante
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    // Contexto
    unit: '',
    department: '',
    location: '',
    involvedParties: '',
    witnesses: '',
    incidentDate: '',
    tags: [] as string[],
  });

  // TODO: Pegar companyId do contexto/store
  const companyId = '123e4567-e89b-12d3-a456-426614174000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.type) {
      setError('Selecione o tipo de denúncia');
      return;
    }

    if (formData.title.length < 10) {
      setError('O título deve ter no mínimo 10 caracteres');
      return;
    }

    if (formData.description.length < 50) {
      setError('A descrição deve ter no mínimo 50 caracteres para melhor análise');
      return;
    }

    if (!isAnonymous && !formData.reporterName) {
      setError('Nome é obrigatório para denúncias identificadas');
      return;
    }

    setLoading(true);

    try {
      const data: CreateEthicsReportRequest = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        origin: isAnonymous ? EthicsReportOrigin.WEB_ANONIMO : EthicsReportOrigin.WEB_IDENTIFICADO,
        isAnonymous,
        reporterName: !isAnonymous ? formData.reporterName : undefined,
        reporterEmail: !isAnonymous ? formData.reporterEmail : undefined,
        reporterPhone: !isAnonymous ? formData.reporterPhone : undefined,
        unit: formData.unit || undefined,
        department: formData.department || undefined,
        location: formData.location || undefined,
        involvedParties: formData.involvedParties || undefined,
        witnesses: formData.witnesses || undefined,
        incidentDate: formData.incidentDate || undefined,
        tags: formData.tags,
        companyId,
      };

      const response = await ethicsChannelService.createReport(data);
      setProtocol(response.protocol);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao registrar denúncia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Denúncia Registrada com Sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Sua denúncia foi registrada e está sendo analisada por nossa equipe de compliance.
          </p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Protocolo de acompanhamento:</p>
            <p className="text-3xl font-bold text-blue-600 tracking-wider">{protocol}</p>
            <p className="text-sm text-gray-500 mt-3">
              Guarde este protocolo para acompanhar o andamento da sua denúncia
            </p>
          </div>
          <div className="space-y-3">
            <Link
              href={`/dashboard/canal-etica/${protocol}`}
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Detalhes da Denúncia
            </Link>
            <Link
              href="/dashboard/canal-etica"
              className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Voltar para Lista
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/canal-etica"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Lista
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nova Denúncia</h1>
        <p className="text-gray-600 mt-1">
          Registre uma nova denúncia no Canal de Ética
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-1">Suas denúncias são tratadas com confidencialidade</p>
            <p className="text-blue-700">
              Todas as informações são criptografadas e acessadas apenas pela equipe autorizada de compliance.
              Você pode optar por fazer uma denúncia anônima ou identificada.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Denúncia */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            1. Tipo de Denúncia
          </h2>

          {/* Anônimo Toggle */}
          <div className="mb-6 flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              {isAnonymous ? (
                <UserX className="w-5 h-5 text-gray-600 mr-3" />
              ) : (
                <User className="w-5 h-5 text-gray-600 mr-3" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {isAnonymous ? 'Denúncia Anônima' : 'Denúncia Identificada'}
                </p>
                <p className="text-sm text-gray-600">
                  {isAnonymous
                    ? 'Sua identidade será totalmente protegida'
                    : 'Seus dados serão mantidos em sigilo'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnonymous ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnonymous ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Denúncia *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as EthicsReportType })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione o tipo</option>
              {Object.entries(ETHICS_REPORT_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dados do Denunciante (se não for anônimo) */}
        {!isAnonymous && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              2. Seus Dados (Confidenciais)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isAnonymous}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail (opcional)
                </label>
                <input
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone (opcional)
                </label>
                <input
                  type="tel"
                  value={formData.reporterPhone}
                  onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Descrição da Denúncia */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isAnonymous ? '2' : '3'}. Descrição da Denúncia
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título Resumido * (mín. 10 caracteres)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Assédio moral no departamento de vendas"
                minLength={10}
                maxLength={200}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length}/200 caracteres
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição Detalhada * (mín. 50 caracteres)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva com detalhes o que aconteceu, quando, onde e quem estava envolvido. Quanto mais informações, melhor será nossa análise."
                minLength={50}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length} caracteres (mínimo 50)
              </p>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {isAnonymous ? '3' : '4'}. Informações Adicionais (Opcional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidade/Filial
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Matriz - São Paulo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Departamento de Vendas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização Física
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Sala 205, 2º andar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Incidente
              </label>
              <input
                type="datetime-local"
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pessoas Envolvidas
              </label>
              <textarea
                value={formData.involvedParties}
                onChange={(e) => setFormData({ ...formData, involvedParties: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Gerente: João Silva, Supervisor: Maria Santos"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testemunhas
              </label>
              <textarea
                value={formData.witnesses}
                onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Pedro Oliveira, Ana Costa"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Registrar Denúncia'}
          </button>
        </div>
      </form>
    </div>
  );
}
