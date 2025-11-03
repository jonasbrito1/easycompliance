'use client'

import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface WelcomeCardProps {
  userName?: string
  companyLogo?: string
}

export function WelcomeCard({ userName = 'Usuário', companyLogo }: WelcomeCardProps) {
  const today = formatDate(new Date())

  return (
    <div className="bg-gradient-to-br from-primary-400/80 to-primary-500/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-start justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Bem-vindo,</h2>
            <blockquote className="text-lg italic opacity-90 border-l-4 border-white/50 pl-4">
              &ldquo;Cumprir regras: o catalisador do nosso progresso.&rdquo;
            </blockquote>
          </div>

          <p className="text-base opacity-90">Tenha um bom dia de trabalho</p>

          <div className="pt-4">
            <p className="text-sm font-medium opacity-75 capitalize">{today}</p>
          </div>
        </div>

        {/* Right Content - Logo */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-xl p-8 shadow-lg w-64 h-48 flex items-center justify-center">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt="Logo da empresa"
                width={200}
                height={120}
                className="object-contain"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-2">
                  SOMAXI
                </div>
                <p className="text-xs text-gray-500">Chegamos para Somar</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
