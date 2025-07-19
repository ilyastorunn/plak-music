'use client';

import { useState, useEffect, use } from 'react';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { supabase } from '@/lib/supabase/config';
import Link from 'next/link';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover_url: string;
  song_url: string;
  country: string;
  year: number;
  genres: string[];
}

interface PlayerPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Supabase'den gelen genre verisi için interface
interface GenreResponse {
  genres: {
    name: string;
  };
}

export default function PlayerPage({ params }: PlayerPageProps) {
  // React.use() ile params'ı unwrap et
  const resolvedParams = use(params);
  
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        // Şarkı bilgisini çek
        const { data: songData, error: songError } = await supabase
          .from('songs')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (songError) throw songError;

        // Şarkının genre'larını çek
        const { data: genresData, error: genresError } = await supabase
          .from('songs_genres')
          .select('genres(name)')
          .eq('song_id', resolvedParams.id);

        if (genresError) throw genresError;

        const genres = (genresData as GenreResponse[]).map(g => g.genres.name);

        setSong({
          ...songData,
          genres
        });
      } catch (err) {
        console.error('Şarkı yüklenirken hata:', err);
        setError('Şarkı yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EDF0]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D7521D]"></div>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EDF0] px-4">
        <h1 className="text-2xl font-bold text-[#4B5D6C] mb-4">Song Not Found</h1>
        <p className="text-[#4B5D6C] mb-6 text-center">
          The song you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/explore"
          className="px-6 py-3 bg-[#D7521D] text-white rounded-lg hover:bg-[#b64518] transition-colors"
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  // AudioPlayer için uygun format
  const playerSong = {
    id: song.id,
    title: song.title,
    artist: song.artist,
    albumCover: song.cover_url,
    audioUrl: song.song_url,
    genreId: song.genres[0] || '', // İlk genre'u kullan
    duration: 0, // AudioPlayer kendi hesaplayacak
    releaseDate: song.year.toString()
  };

  return (
    <div className="min-h-screen relative bg-[#F5EDF0]">
      {/* Back Navigation */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link 
          href="/explore"
          className="font-Magtis text-[2rem] md:text-[3rem] font-extrabold text-[#4B5D6C] hover:text-[#D7521D] transition-colors duration-500"
        >
          &quot;plak&quot;
        </Link>
        <p className="font-Magtis font-bold text-[#4B5D6C] pl-[1.25rem] text-sm md:text-base">
          back to explore
        </p>
      </div>

      {/* Audio Player */}
      <AudioPlayer song={playerSong} />

      {/* Song Details */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#4B5D6C]">{song.title}</h3>
                <p className="text-[#4B5D6C] opacity-80">{song.artist}</p>
                <p className="text-sm text-[#4B5D6C] opacity-60">
                  {song.country} • {song.year}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {song.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#D7521D] text-white text-sm rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 