'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Genre } from '@/lib/types';

interface GenreCardProps {
  genre: Genre;
}

export function GenreCard({ genre }: GenreCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden cursor-pointer min-h-[180px] flex flex-col"
      style={{ 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Genre Image - 4:3 aspect ratio for smaller cards */}
      <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
        <img
          src={genre.imageUrl}
          alt={genre.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Description - max 2 lines with ellipsis */}
        <p 
          className="text-xs leading-relaxed mb-3 flex-grow"
          style={{ 
            color: '#4B5D6C', 
            fontFamily: 'Inter',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {genre.description}
        </p>

        {/* Browse Button - Centered */}
        <div className="flex justify-center">
          <Link 
            href={`/genre/${encodeURIComponent(genre.name)}`}
            className="border border-[#4B5D6C] text-[#4B5D6C] hover:border-[#D7521D] hover:text-[#D7521D] transition-colors duration-500 font-medium"
            style={{ 
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'Inter',
              fontSize: '12px'
            }}
          >
            Browse
          </Link>
        </div>
      </div>
    </motion.div>
  );
}