'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGenreById, getSongsByGenre, formatDuration } from '@/lib/data/mockData';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: {
    id: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  const genre = getGenreById(params.id);
  const songs = getSongsByGenre(params.id);
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [vinylVisible, setVinylVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const moveToSelected = (direction: "next" | "prev") => {
    setVinylVisible(false);
    setTimeout(() => {
      if (direction === "next") {
        setSelectedIndex((prevIndex) =>
          prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
      } else if (direction === "prev") {
        setSelectedIndex((prevIndex) =>
          prevIndex === 0 ? songs.length - 1 : prevIndex - 1
        );
      }
      setTimeout(() => setVinylVisible(true), 100);
    }, 500);
  };

  useEffect(() => {
    setVinylVisible(true);
  }, []);

  if (!genre) {
    notFound();
  }

  if (songs.length === 0) {
    return (
      <div className="bg-[#F5EDF0] min-h-screen flex flex-col justify-center items-center px-4">
        <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
          <Link
            href="/explore"
            className="font-Magtis text-[2rem] md:text-[3rem] font-extrabold text-[#4B5D6C] hover:text-[#D7521D] transition-colors duration-500"
          >
            &quot;plak&quot;
          </Link>
          <p className="font-Magtis font-bold text-[#4B5D6C] pl-[1.25rem] text-sm md:text-base">
            {genre.name}
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#4B5D6C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#4B5D6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#4B5D6C] mb-2">No songs available</h3>
          <p className="text-[#4B5D6C]/70">This genre doesn&apos;t have any songs yet.</p>
        </div>
      </div>
    );
  }

  const getClassName = (index: number) => {
    const total = songs.length;
    const difference = (index - selectedIndex + total) % total;

    if (difference === 0) return "selected";
    if (difference === 1) return "next";
    if (difference === 2) return "nextRightSecond";
    if (difference === total - 1) return "prev";
    if (difference === total - 2) return "prevLeftSecond";
    return difference < total / 2 ? "hideRight" : "hideLeft";
  };

  const getStyles = (className: string) => {
    switch (className) {
      case "selected":
        return "z-30 translate-x-0 translate-y-0 scale-100 hover:scale-[1.02] transition-transform duration-300";
      case "next":
        return "z-20 translate-x-[6rem] sm:translate-x-[8rem] lg:translate-x-[10rem] translate-y-[-0.625rem] scale-[0.65] hover:scale-[0.67] transition-transform duration-300";
      case "nextRightSecond":
        return "z-10 translate-x-[10rem] sm:translate-x-[14rem] lg:translate-x-[18rem] translate-y-[-1.25rem] scale-[0.5] hover:scale-[0.52] transition-transform duration-300";
      case "prev":
        return "z-20 translate-x-[-6rem] sm:translate-x-[-8rem] lg:translate-x-[-10rem] translate-y-[-0.625rem] scale-[0.65] hover:scale-[0.67] transition-transform duration-300";
      case "prevLeftSecond":
        return "z-10 translate-x-[-10rem] sm:translate-x-[-14rem] lg:translate-x-[-18rem] translate-y-[-1.25rem] scale-[0.5] hover:scale-[0.52] transition-transform duration-300";
      default:
        return "opacity-0 translate-x-0 scale-0";
    }
  };

  const handleSongClick = (index: number) => {
    if (index === selectedIndex) {
      router.push(`/player/${songs[index].id}`);
    } else {
      setVinylVisible(false);
      setTimeout(() => {
        setSelectedIndex(index);
        setVinylVisible(true);
      }, 500);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getBlurClass = (index: number) => {
    return index === selectedIndex && hoveredIndex === index ? "blur-[2px]" : "";
  };

  return (
    <div className="bg-[#F5EDF0] min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-8 pb-8">
      {/* Header */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link
          href="/explore"
          className="font-Magtis text-[2rem] md:text-[3rem] font-extrabold text-[#4B5D6C] hover:text-[#D7521D] transition-colors duration-500"
        >
          &quot;plak&quot;
        </Link>
        <p className="font-Magtis font-bold text-[#4B5D6C] pl-[1.25rem] text-sm md:text-base">
          {genre.name}
        </p>
      </div>

      {/* Genre Info */}
      <div className="absolute top-[1rem] right-[1rem] z-50 pr-[0.5rem] pt-[0.5rem] text-right">
        <p className="font-Inter text-sm text-[#4B5D6C]/70 max-w-[300px]">
          {genre.description}
        </p>
      </div>

      {/* Songs Carousel */}
      <div className="relative h-[12rem] sm:h-[15rem] md:h-[25rem] w-full max-w-[62.5rem] flex justify-center items-center mx-auto">
        <div className="relative w-full flex justify-center items-center">
          {songs.map((song, index) => {
            const className = getClassName(index);
            const isSelected = className === "selected";
            return (
              <div
                key={song.id}
                className={`absolute transition-all duration-500 cursor-pointer ${getStyles(
                  className
                )}`}
                onClick={() => handleSongClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative">
                  {/* Vinyl Record Animation */}
                  {isSelected && (
                    <div
                      className={`vinyl absolute left-1/2 -translate-x-1/2 top-0 w-[80px] sm:w-[100px] md:w-[150px] lg:w-[200px] h-[80px] sm:h-[100px] md:h-[150px] lg:h-[200px] rounded-full overflow-hidden z-0 transition-all duration-1000 ease-in-out ${
                        vinylVisible
                          ? "opacity-100 scale-100 -translate-y-[45%] shadow-lg"
                          : "opacity-0 scale-80 translate-y-0"
                      }`}
                    >
                      <div className="w-full h-full relative animate-spin-slow bg-gradient-to-br from-gray-800 to-gray-900 rounded-full">
                        {/* Vinyl grooves */}
                        <div className="absolute inset-2 border border-gray-600 rounded-full opacity-30" />
                        <div className="absolute inset-4 border border-gray-600 rounded-full opacity-20" />
                        <div className="absolute inset-6 border border-gray-600 rounded-full opacity-10" />
                        
                        {/* Center label */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1.2rem] sm:w-[1.5rem] md:w-[2rem] lg:w-[3.125rem] h-[1.2rem] sm:h-[1.5rem] md:h-[2rem] lg:h-[3.125rem] rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-500">
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.4rem] sm:w-[0.5rem] md:w-[0.6rem] lg:w-[0.625rem] h-[0.4rem] sm:h-[0.5rem] md:h-[0.6rem] lg:h-[0.625rem] rounded-full bg-black" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Song Cover */}
                  <div className="relative">
                    <div
                      className={`w-[8rem] sm:w-[10rem] md:w-[14rem] lg:w-[18.75rem] h-[8rem] sm:h-[10rem] md:h-[14rem] lg:h-[18.75rem] rounded-sm transition-all duration-500 relative z-10 ring-1 ring-black/5 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${getBlurClass(
                        index
                      )}`}
                    >
                      {/* Vinyl Record Design */}
                      <div className="w-[60%] h-[60%] bg-black rounded-full relative border-2 border-gray-700 shadow-xl">
                        {/* Vinyl grooves */}
                        <div className="absolute inset-1 border border-gray-600 rounded-full opacity-30" />
                        <div className="absolute inset-2 border border-gray-600 rounded-full opacity-20" />
                        <div className="absolute inset-3 border border-gray-600 rounded-full opacity-10" />
                        
                        {/* Center label */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-gradient-to-br from-red-600 to-red-800 rounded-full border border-red-500">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] bg-black rounded-full" />
                        </div>
                        
                        {/* Song initial */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-700">
                          {song.artist.charAt(0)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Song Information Overlay */}
                    {isSelected && (
                      <div className="pt-[1rem] sm:pt-[1.25rem] px-[1rem] sm:px-[1.5rem] absolute inset-0 flex flex-col bg-[#4B5D6C]/50 rounded-lg shadow-md opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="text-white text-xs sm:text-sm font-Inter space-y-[0.25rem] sm:space-y-[0.5rem]">
                          <p className="font-semibold">Song:&nbsp;</p>
                          <span className="font-normal">{song.title}</span>
                          <p className="font-semibold">Artist:&nbsp;</p>
                          <span className="font-normal">{song.artist}</span>
                          <p className="font-semibold">Duration:&nbsp;</p>
                          <span className="font-normal">{formatDuration(song.duration)}</span>
                          <p className="font-semibold">Released:&nbsp;</p>
                          <span className="font-normal">{new Date(song.releaseDate).getFullYear()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Song Title and Artist */}
                {isSelected && (
                  <div className="absolute -bottom-[2.5rem] sm:-bottom-[3rem] md:-bottom-[4rem] left-0 w-full text-center z-20 transition-all duration-300">
                    <p className="text-xs sm:text-sm md:text-md lg:text-lg font-Inter font-medium text-zinc-800">
                      {song.artist}
                    </p>
                    <p className="text-[0.6rem] sm:text-xs md:text-sm lg:text-base font-Inter text-zinc-500 font-light">
                      {song.title}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Listen Button */}
      <div className="flex items-center justify-center bottom-0 mt-[1.5rem] sm:mt-[2rem] md:mt-[2.5rem]">
        <button
          className="px-[0.8rem] sm:px-[1rem] md:px-[1.25rem] py-[0.4rem] sm:py-[0.5rem] text-white rounded-lg bg-gradient-to-r from-[#D7521D] to-[#4B5D6C] text-xs sm:text-sm md:text-md font-Inter hover:translate-y-[-0.125rem] transition-transform duration-300 shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/player/${songs[selectedIndex].id}`);
          }}
        >
          Listen
        </button>
      </div>

      {/* Navigation Arrows */}
      {songs.length > 1 && (
        <div className="absolute w-full flex justify-between items-center max-w-[62.5rem] mx-auto px-4 sm:px-8">
          <button
            className="text-zinc-600 hover:text-[#D7521D] border-none bg-transparent transition-colors duration-300 -translate-x-[1rem] sm:-translate-x-[1.5rem] md:-translate-x-[2rem]"
            onClick={() => moveToSelected("prev")}
            aria-label="Previous song"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="text-zinc-600 hover:text-[#D7521D] border-none bg-transparent transition-colors duration-300 translate-x-[1rem] sm:translate-x-[1.5rem] md:translate-x-[2rem]"
            onClick={() => moveToSelected("next")}
            aria-label="Next song"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 