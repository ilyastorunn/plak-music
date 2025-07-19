'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  songUrl: string;
  country: string;
  year: number;
  genres: string[];
}

export function SongCard({ id, title, artist, coverUrl, songUrl, country, year, genres }: SongCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(songUrl));
  const [imageError, setImageError] = useState(false);

  // Fallback resim oluştur - AudioPlayer'daki gibi
  const getFallbackImage = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="vinyl" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
            <stop offset="30%" style="stop-color:#374151;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#1f2937;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#vinyl)"/>
        <circle cx="200" cy="200" r="180" fill="none" stroke="#4b5563" stroke-width="1"/>
        <circle cx="200" cy="200" r="140" fill="none" stroke="#4b5563" stroke-width="1"/>
        <circle cx="200" cy="200" r="100" fill="none" stroke="#4b5563" stroke-width="1"/>
        <circle cx="200" cy="200" r="60" fill="none" stroke="#4b5563" stroke-width="1"/>
        <circle cx="200" cy="200" r="20" fill="#111827"/>
        <text x="200" y="350" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="20" font-weight="bold">${title}</text>
        <text x="200" y="375" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">${artist}</text>
      </svg>
    `)}`;
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  audio.onended = () => setIsPlaying(false);

  return (
    <Link href={`/player/${id}`} className="block">
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative group">
          <div className="w-full aspect-square relative">
            <img
              src={imageError ? getFallbackImage() : coverUrl}
              alt={`${title} by ${artist}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          </div>
          
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 hover:bg-[#D7521D] hover:text-white z-10"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-[#4B5D6C] truncate">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{artist}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <span>{country}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#F5EDF0] text-[#D7521D] text-xs rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 