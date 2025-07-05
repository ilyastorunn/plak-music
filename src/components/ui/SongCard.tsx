'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Song } from '@/lib/types';
import { formatDuration } from '@/lib/data/mockData';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  return (
    <Link href={`/player/${song.id}`} className="group">
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Album Cover with Vinyl Effect */}
        <div className="relative h-48 overflow-hidden bg-gray-900">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          >
            {/* Vinyl Record */}
            <div className="w-32 h-32 bg-black rounded-full relative border-4 border-gray-700 shadow-2xl">
              {/* Vinyl grooves */}
              <div className="absolute inset-2 border border-gray-600 rounded-full opacity-30" />
              <div className="absolute inset-4 border border-gray-600 rounded-full opacity-20" />
              <div className="absolute inset-6 border border-gray-600 rounded-full opacity-10" />
              
              {/* Center label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-2 border-red-500 shadow-lg">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
              </div>
              
              {/* Album cover in center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm flex items-center justify-center shadow-inner">
                <span className="text-xs font-bold text-gray-700">
                  {song.artist.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Play button overlay */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-6 h-6 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Song Info */}
        <div className="p-4">
          <motion.h3
            className="text-lg font-bold text-gray-900 mb-1 truncate"
            initial={{ y: 0 }}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            {song.title}
          </motion.h3>
          
          <motion.p
            className="text-gray-600 text-sm mb-3 truncate"
            initial={{ y: 0 }}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            {song.artist}
          </motion.p>

          {/* Duration and Release Date */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDuration(song.duration)}
            </span>
            
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(song.releaseDate).getFullYear()}
            </span>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </motion.div>
    </Link>
  );
} 