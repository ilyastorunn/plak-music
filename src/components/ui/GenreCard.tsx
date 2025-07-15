'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Genre } from '@/lib/types';

interface GenreCardProps {
  genre: Genre;
}

// Map genre IDs to actual images
const genreImages: { [key: string]: string } = {
  'funk': '/bg/funk.png',
  'jazz': '/bg/jazz.png',
  'soul': '/bg/soul.png',
  'gospel': '/bg/gospel.png',
  'lo-fi': '/bg/lofi.png',
  'hiphop': '/bg/hiphop.png',
  'blues': '/bg/blues.png',
  'folk': '/bg/folk.png',
  'reggae': '/bg/reggae.png',
  'electronic': '/bg/electronic.png',
  'experimental': '/bg/experimental.png',
  'disco': '/bg/disco.png',
  'psych': '/bg/psych.png',
  'pop': '/bg/pop.png',
  'rock': '/bg/rock.png',
  'ambient': '/bg/ambient.png',
};

export function GenreCard({ genre }: GenreCardProps) {
  const imageUrl = genreImages[genre.id] || '/bg/ambient.png';
  
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
          src={imageUrl}
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
            href={`/genre/${genre.id}`}
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