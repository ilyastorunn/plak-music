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
  const imageUrl = genreImages[genre.id] || '/covers/vintage-soul.jpg';
  
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden cursor-pointer min-h-[240px] flex flex-col"
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
      <div className="p-4 flex flex-col flex-grow">
        {/* Genre Title */}
        {/* <h3 
          className="text-lg md:text-xl font-bold mb-2"
          style={{ color: '#4B5D6C', fontFamily: 'Magtis' }}
        >
          {genre.name}
        </h3> */}
        
        {/* Description - max 2 lines with ellipsis */}
        <p 
          className="text-sm leading-relaxed mb-4 flex-grow"
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
        <div className="flex justify-center">
          <Link 
            href={`/genre/${genre.id}`}
            className="border border-[#4B5D6C] text-[#4B5D6C] hover:border-[#D7521D] hover:text-[#D7521D] transition-colors duration-500 font-medium"
            style={{ 
              padding: '8px 16px',
              borderRadius: '4px',
              fontFamily: 'Inter',
              fontSize: '14px'
            }}
          >
            Browse
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 