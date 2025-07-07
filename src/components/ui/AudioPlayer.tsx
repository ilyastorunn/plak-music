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
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showSongInfo, setShowSongInfo] = useState(false);
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

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        preload="metadata"
      />

      {/* Main Card Container */}
      <div 
        className="rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative overflow-hidden"
        style={{ backgroundColor: '#E8DCE1' }}
      >
        <div className="flex items-center gap-8">
          {/* Left Side - Album Cover */}
          <div className="relative">
            <div 
              className="w-80 h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer relative group"
              onMouseEnter={() => setShowSongInfo(true)}
              onMouseLeave={() => setShowSongInfo(false)}
            >
              {/* Album Cover Image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-4">
                    {song.artist.charAt(0)}
                  </div>
                  <div className="text-lg font-medium">
                    {song.title.split(' ').slice(0, 2).join(' ')}
                  </div>
                </div>
              </div>
              
              {/* Hover Overlay with Song Info */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: showSongInfo ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{song.title}</h3>
                  <p className="text-lg text-gray-300">{song.artist}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(song.releaseDate).getFullYear()}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Vinyl Record (Half Behind Album) */}
          <div className="relative flex-1 flex items-center justify-start -ml-40">
            <motion.div
              className="w-80 h-80 relative z-0"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: isPlaying ? Infinity : 0 
              }}
            >
              {/* Vinyl Record Image */}
              <img 
                src="/vinyl.png" 
                alt="Vinyl Record"
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Controls and Info Panel */}
            <div className="ml-8 flex-1 space-y-6 z-10 relative">
              {/* Song Title and Artist */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {song.title}
                </h2>
                <p className="text-xl text-gray-600">
                  {song.artist}
                </p>
              </div>

              {/* Progress Bar and Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
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
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${progress}%, #d1d5db ${progress}%, #d1d5db 100%)`
                    }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4">
                {/* Previous */}
                <motion.button 
                  className="p-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </motion.button>

                {/* Play/Pause */}
                <motion.button
                  className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-all"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 ml-1 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </motion.button>

                {/* Next */}
                <motion.button 
                  className="p-3 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition-all"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${isMuted ? 0 : volume * 100}%, #d1d5db ${isMuted ? 0 : volume * 100}%, #d1d5db 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 