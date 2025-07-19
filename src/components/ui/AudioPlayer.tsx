"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Song } from "@/lib/types";
import { formatDuration } from "@/lib/data/mockData";

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
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
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

  // Fallback resim URL'si
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
        <text x="200" y="350" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="20" font-weight="bold">${song.title}</text>
        <text x="200" y="375" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="16">${song.artist}</text>
      </svg>
    `)}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={song.audioUrl} preload="metadata" />

      {/* Main Card Container */}
      <div className="rounded-3xl shadow-2xl p-8 max-w-4xl w-full relative overflow-hidden bg-[#E8DCE1]">
        <div className="flex items-center gap-8">
          {/* Left Side - Album Cover */}
          <div className="relative z-10">
            <div
              className="w-80 h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer relative group"
              onMouseEnter={() => setShowSongInfo(true)}
              onMouseLeave={() => setShowSongInfo(false)}
            >
              {/* Album Cover Image */}
              <div className="w-full h-full">
                <img
                  src={imageError ? getFallbackImage() : song.albumCover}
                  alt={`${song.title} by ${song.artist}`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
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
                    {song.releaseDate}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Controls and Info */}
          <div className="flex-1 space-y-8">
            {/* Song Info */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{song.title}</h2>
              <p className="text-xl text-gray-600">{song.artist}</p>
              <p className="text-sm text-gray-500 mt-2">{song.releaseDate}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div
                className="w-full bg-gray-300 rounded-full h-2 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="bg-[#D7521D] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatDuration(Math.floor(currentTime))}</span>
                <span>{formatDuration(Math.floor(duration))}</span>
              </div>
            </div>

            {/* Play/Pause Button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlay}
                className="bg-[#D7521D] hover:bg-[#b64518] text-white rounded-full p-6 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-[#F5EDF0] text-[#4B5C6C] bg-opacity-50 hover:bg-opacity-75 transition-all"
              >
                {isMuted || volume === 0 ? (
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
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
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${
                    isMuted ? 0 : volume * 100
                  }%, #d1d5db ${isMuted ? 0 : volume * 100}%, #d1d5db 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
