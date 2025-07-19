'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface SongCardProps {  // export ekledik
  title: string;
  artist: string;
  coverUrl: string;
  songUrl: string;
  country: string;
  year: number;
  genres: string[];
}

export function SongCard({ title, artist, coverUrl, songUrl, country, year, genres }: SongCardProps) {  // default export yerine named export kullanıyoruz
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(songUrl));

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Ses dosyası bittiğinde state'i güncelle
  audio.onended = () => setIsPlaying(false);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative group">
        <img
          src={coverUrl}
          alt={`${title} by ${artist}`}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-3 hover:bg-[#D7521D] hover:text-white"
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
  );
} 