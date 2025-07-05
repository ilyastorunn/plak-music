'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Genre } from '@/lib/types';

interface GenreCardProps {
  genre: Genre;
}

// Map genre IDs to actual images
const genreImages: { [key: string]: string } = {
  'jazz': '/covers/jazz-classics.webp',
  'folk': '/covers/folk-treasures.jpg',
  'electronic': '/covers/vintage-soul.jpg',
  'ambient': '/covers/vintage-soul.jpg',
  'classical': '/covers/jazz-classics.webp',
  'indie': '/covers/folk-treasures.jpg',
  'world': '/covers/vintage-soul.jpg',
  'experimental': '/covers/jazz-classics.webp',
};

export function GenreCard({ genre }: GenreCardProps) {
  const imageUrl = genreImages[genre.id] || '/covers/vintage-soul.jpg';
  
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden cursor-pointer min-h-[320px] flex flex-col"
      style={{ 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px'
      }}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Genre Image - 16:9 aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <img
          src={imageUrl}
          alt={genre.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Genre Title */}
        <h3 
          className="text-2xl font-bold mb-3"
          style={{ color: '#4B5D6C', fontFamily: 'Magtis' }}
        >
          {genre.name}
        </h3>
        
        {/* Description - max 2 lines with ellipsis */}
        <p 
          className="text-base leading-relaxed mb-6 flex-grow"
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
            href={`/genre/${genre.id}`}
            className="border border-[#4B5D6C] text-[#4B5D6C] hover:bg-[#4B5D6C] hover:text-white transition-colors duration-200 font-medium"
            style={{ 
              padding: '12px 24px',
              borderRadius: '4px',
              fontFamily: 'Inter',
              fontSize: '16px'
            }}
          >
            Browse
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 