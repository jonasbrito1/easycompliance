'use client'

import { Play } from 'lucide-react'

export function VideoCard() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[280px] hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {/* Video Placeholder */}
        <div className="w-40 h-40 bg-gradient-to-br from-red-200 to-red-300 rounded-3xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
          {/* Play Button */}
          <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300">
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </div>
        </div>
      </div>

      <p className="text-gray-600 font-medium text-center">
        Nenhum vídeo cadastrado
      </p>
    </div>
  )
}
