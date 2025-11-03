'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PendingCardProps {
  title: string
  count: number
  icon: LucideIcon
  color: 'orange' | 'yellow' | 'green' | 'blue'
  onClick?: () => void
}

const colorVariants = {
  orange: {
    bg: 'bg-orange-400',
    hover: 'hover:bg-orange-500',
    text: 'text-white'
  },
  yellow: {
    bg: 'bg-orange-500',
    hover: 'hover:bg-orange-600',
    text: 'text-white'
  },
  green: {
    bg: 'bg-secondary-400',
    hover: 'hover:bg-secondary-500',
    text: 'text-white'
  },
  blue: {
    bg: 'bg-secondary-500',
    hover: 'hover:bg-secondary-600',
    text: 'text-white'
  }
}

export function PendingCard({ title, count, icon: Icon, color, onClick }: PendingCardProps) {
  const variant = colorVariants[color]

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300',
        'hover:shadow-xl hover:scale-105 hover:-translate-y-1',
        'min-h-[180px] p-6 flex flex-col items-center justify-center gap-4',
        variant.bg,
        variant.hover,
        variant.text
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Icon Container */}
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>

        {/* Count */}
        <div className="text-5xl font-bold tracking-tight">
          {count}
        </div>

        {/* Title */}
        <div className="text-center">
          <h3 className="font-semibold text-base leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] duration-1000" />
    </button>
  )
}
