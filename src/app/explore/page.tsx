'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/config';
import { SongCard } from '@/components/ui/SongCard';

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

// Supabase'den gelen genre verisi için interface
interface GenreResponse {
  genres: {
    name: string;
  }
}

export default function ExplorePage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Önce tüm şarkıları çek
        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select('*')
          .order('created_at', { ascending: false });

        if (songsError) throw songsError;

        // Her şarkı için genre'ları çek
        const songsWithGenres = await Promise.all(
          songsData.map(async (song) => {
            const { data: genresData, error: genresError } = await supabase
              .from('songs_genres')
              .select('genres(name)')
              .eq('song_id', song.id);

            if (genresError) throw genresError;

            // TypeScript için tip tanımlaması ekledik
            const genres = (genresData as GenreResponse[]).map(g => g.genres.name);

            return {
              ...song,
              genres
            };
          })
        );

        setSongs(songsWithGenres);
      } catch (err) {
        console.error('Şarkılar yüklenirken hata:', err);
        setError('Şarkılar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D7521D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5EDF0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#4B5D6C] mb-8 font-magtis">Explore Music</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              title={song.title}
              artist={song.artist}
              coverUrl={song.cover_url}
              songUrl={song.song_url}
              country={song.country}
              year={song.year}
              genres={song.genres}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
