'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Song } from '@/lib/types';
import { formatDuration } from '@/lib/data/mockData';

interface AudioPlayerProps {
  song: Song;
}

export function AudioPlayer({ song }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value) / 100;
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        preload="metadata"
      />

      {/* Album Art */}
      <div className="relative mb-8">
        <motion.div
          className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-2xl"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 10, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
        >
          {/* Vinyl Record */}
          <div className="w-56 h-56 bg-black rounded-full relative border-4 border-gray-700">
            {/* Vinyl grooves */}
            <div className="absolute inset-4 border border-gray-600 rounded-full opacity-30" />
            <div className="absolute inset-8 border border-gray-600 rounded-full opacity-20" />
            <div className="absolute inset-12 border border-gray-600 rounded-full opacity-10" />
            
            {/* Center label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full border-4 border-red-500 shadow-lg">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full" />
            </div>
            
            {/* Album cover in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center shadow-inner">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700 mb-1">
                  {song.artist.charAt(0)}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {song.title.split(' ').slice(0, 2).join(' ')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Song Info */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {song.title}
        </h2>
        <p className="text-xl text-gray-600 mb-1">
          {song.artist}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(song.releaseDate).getFullYear()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg pointer-events-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        {/* Previous */}
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        {/* Play/Pause */}
        <motion.button
          className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        {/* Next */}
        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
          <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        
        <div className="w-24 relative">
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg pointer-events-none"
            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
          />
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          border: 2px solid #3b82f6;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          border: 2px solid #3b82f6;
        }
      `}</style>
    </div>
  );
} 