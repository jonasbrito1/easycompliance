'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ risks: 0, critical: 0, high: 0, medium: 0, low: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userData));
    loadStats(token);
  }, [router]);

  const loadStats = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/risks/matrix`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.summary);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">EasyCompliance</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm font-medium text-gray-600">Total de Riscos</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.risks}</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow">
            <p className="text-sm font-medium text-red-600">Críticos</p>
            <p className="text-3xl font-bold text-red-700 mt-2">{stats.critical}</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-xl shadow">
            <p className="text-sm font-medium text-orange-600">Altos</p>
            <p className="text-3xl font-bold text-orange-700 mt-2">{stats.high}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <p className="text-sm font-medium text-yellow-600">Médios</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">{stats.medium}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            <p className="text-sm font-medium text-green-600">Baixos</p>
            <p className="text-3xl font-bold text-green-700 mt-2">{stats.low}</p>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Bem-vindo ao EasyCompliance MVP! 🚀</h3>
          <p className="text-blue-100 mb-4">
            Sistema de Gestão de Compliance Multi-Tenant desenvolvido com as melhores práticas de engenharia de software.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">✅ Funcionalidades Implementadas:</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Autenticação JWT</li>
                <li>• Multi-tenancy</li>
                <li>• Gestão de Riscos</li>
                <li>• Matriz de Riscos</li>
                <li>• API RESTful</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h4 className="font-semibold mb-2">🛠️ Stack Tecnológica:</h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Backend: NestJS + TypeScript</li>
                <li>• Frontend: Next.js 14</li>
                <li>• Database: MySQL 8.0</li>
                <li>• Cache: Redis</li>
                <li>• Docker & Docker Compose</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
