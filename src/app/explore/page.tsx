'use client';

import { useEffect, useState } from 'react';
import { GenreCard } from "@/components/ui/GenreCard";
import { supabase } from '@/lib/supabase/config';
import Link from "next/link";

interface Genre {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

// Mock data'dan genre açıklamalarını ve resimlerini al
const genreDescriptions: { [key: string]: string } = {
  'Funk': 'Get down with the groove. Raw, rhythmic funk that makes you move.',
  'Jazz': 'Timeless jazz classics and hidden improvisational gems.',
  'Soul': 'Deep, emotional soul music from the heart.',
  'Gospel': 'Spiritual music that lifts the soul and moves the spirit.',
  'Lo-Fi': 'Chill, atmospheric beats perfect for studying and relaxing.',
  'Hip-Hop': 'Raw beats, clever rhymes, and urban storytelling.',
  'Blues': 'The foundation of modern music. Raw emotion in 12 bars.',
  'Folk': 'Acoustic storytelling and traditional melodies.',
  'Reggae': 'Island rhythms and conscious vibes from Jamaica.',
  'Electronic': 'Digital soundscapes and synthesized explorations.',
  'Experimental': 'Boundary-pushing sounds that challenge conventions.',
  'Disco': 'Dance floor classics from the golden age of nightlife.',
  'Psychedelic': 'Mind-bending sounds and cosmic musical journeys.',
  'Pop': 'Catchy melodies and timeless hooks that stick with you.',
  'Rock': 'Raw power, electric energy, and rebellious spirit.',
  'Ambient': 'Atmospheric soundscapes for contemplation and reflection.'
};

const genreImages: { [key: string]: string } = {
  'Funk': '/bg/funk.png',
  'Jazz': '/bg/jazz.png',
  'Soul': '/bg/soul.png',
  'Gospel': '/bg/gospel.png',
  'Lo-Fi': '/bg/lofi.png',
  'Hip-Hop': '/bg/hiphop.png',
  'Blues': '/bg/blues.png',
  'Folk': '/bg/folk.png',
  'Reggae': '/bg/reggae.png',
  'Electronic': '/bg/electronic.png',
  'Experimental': '/bg/experimental.png',
  'Disco': '/bg/disco.png',
  'Psychedelic': '/bg/psych.png',
  'Pop': '/bg/pop.png',
  'Rock': '/bg/rock.png',
  'Ambient': '/bg/ambient.png'
};

export default function ExplorePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data: genresData, error: genresError } = await supabase
          .from('genres')
          .select('id, name')
          .order('name', { ascending: true });

        if (genresError) throw genresError;

        // Genre'lara mock data'dan açıklama ve resim ekle
        const genresWithInfo = genresData.map(genre => ({
          ...genre,
          description: genreDescriptions[genre.name] || 'Discover amazing music in this genre.',
          imageUrl: genreImages[genre.name] || '/bg/ambient.png'
        }));

        setGenres(genresWithInfo);
      } catch (err) {
        console.error('Genre\'ler yüklenirken hata:', err);
        setError('Genre\'ler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EDF0]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D7521D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EDF0]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#D7521D] text-white rounded hover:bg-[#b64518]"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#F5EDF0" }}
    >
      {/* Header */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link
          href="/"
          className="font-Magtis text-[2rem] md:text-[3rem] text-[#4B5D6C] font-extrabold hover:text-[#FF6B00] transition duration-500"
        >
          &quot;plak&quot;
        </Link>
        <p
          className="font-Magtis font-bold pl-[1.25rem] text-sm md:text-base"
          style={{ color: "#4B5D6C" }}
        >
          genres
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-screen">
        {/* Left Panel - Fixed Title and Description */}
        <div className="w-1/2 fixed top-0 left-0 h-full pt-24">
          <div className="h-full flex flex-col justify-center pl-16 pr-8">
            <div className="max-w-md">
              <h1
                className="text-3xl md:text-4xl font-normal mb-5 leading-tight"
                style={{ color: "#4B5D6C", fontFamily: "Magtis" }}
              >
                Explore Genres
              </h1>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#4B5D6C", fontFamily: "Inter" }}
              >
                Dive deep into musical genres and discover rare, forgotten treasures waiting to be rediscovered.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Content Area */}
        <div className="w-1/2 ml-[50%]">
          <div className="pt-24 pl-4 pr-8 pb-16">
            <div className="grid grid-cols-2 gap-4">
              {genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}