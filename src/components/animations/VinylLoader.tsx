'use client';

import { motion } from 'framer-motion';

interface VinylLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function VinylLoader({ size = 'md', className = '' }: VinylLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-4 border-gray-300 border-t-black relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Center hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Vinyl grooves */}
        <div className="absolute inset-2 rounded-full border border-gray-200"></div>
        <div className="absolute inset-3 rounded-full border border-gray-200"></div>
      </motion.div>
    </div>
  );
} 