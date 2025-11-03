'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  children: ReactNode
  className?: string
  action?: ReactNode
  isEmpty?: boolean
  emptyMessage?: string
}

export function ChartCard({ title, children, className, action, isEmpty, emptyMessage }: ChartCardProps) {
  return (
    <div className={cn('bg-white rounded-xl shadow-sm border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">{emptyMessage || 'Nenhum resultado encontrado'}</p>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}
