'use client';

import { useState, useEffect, use } from "react";
import Link from "next/link";
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

interface Genre {
  id: string;
  name: string;
}

interface GenrePageProps {
  params: Promise<{
    id: string;
  }>;
}

interface SongGenreResponse {
  genres: {
    name: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  // React.use() ile params'ı unwrap et
  const resolvedParams = use(params);
  
  const [songs, setSongs] = useState<Song[]>([]);
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenreAndSongs = async () => {
      try {
        // URL'den gelen genre name'ini decode et
        const genreName = decodeURIComponent(resolvedParams.id);

        // Genre bilgisini name ile çek
        const { data: genreData, error: genreError } = await supabase
          .from('genres')
          .select('id, name')
          .eq('name', genreName)
          .single();

        if (genreError) throw genreError;
        setGenre(genreData);

        // Bu genre'ye ait şarkıları çek
        const { data: songGenres, error: songGenresError } = await supabase
          .from('songs_genres')
          .select('song_id')
          .eq('genre_id', genreData.id);

        if (songGenresError) throw songGenresError;

        if (songGenres.length === 0) {
          setSongs([]);
          return;
        }

        const songIds = songGenres.map(sg => sg.song_id);

        // Şarkı detaylarını çek
        const { data: songsData, error: songsError } = await supabase
          .from('songs')
          .select('*')
          .in('id', songIds)
          .order('created_at', { ascending: false });

        if (songsError) throw songsError;

        // Her şarkı için tüm genre'larını çek
        const songsWithGenres = await Promise.all(
          songsData.map(async (song) => {
            const { data: genresData, error: genresError } = await supabase
              .from('songs_genres')
              .select('genres(name)')
              .eq('song_id', song.id);

            if (genresError) throw genresError;

            // Type assertion düzeltildi
            const genres = (genresData as unknown as SongGenreResponse[]).map(g => g.genres.name);

            // Debug log ekle
            console.log('Song data:', {
              id: song.id,
              title: song.title,
              coverUrl: song.cover_url,
              genres
            });

            return {
              ...song,
              genres
            };
          })
        );

        setSongs(songsWithGenres);
      } catch (err) {
        console.error('Veriler yüklenirken hata:', err);
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndSongs();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EDF0]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D7521D]"></div>
      </div>
    );
  }

  if (error || !genre) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5EDF0] px-4">
        <h1 className="text-2xl font-bold text-[#4B5D6C] mb-4">Genre Not Found</h1>
        <p className="text-[#4B5D6C] mb-6 text-center">
          The genre you&apos;re looking for doesn&apos;t exist or has no songs yet.
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

  return (
    <div className="min-h-screen bg-[#F5EDF0]">
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

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Genre Info */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#4B5D6C] mb-4 font-magtis">
              {genre.name}
            </h1>
            <p className="text-[#4B5D6C] text-lg">
              {songs.length} song{songs.length !== 1 ? 's' : ''} in this genre
            </p>
          </div>

          {/* Songs Grid */}
          {songs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {songs.map((song) => {
                // Her şarkı için debug log
                console.log('Rendering song:', {
                  id: song.id,
                  title: song.title,
                  coverUrl: song.cover_url
                });

                return (
                  <SongCard
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    artist={song.artist}
                    coverUrl={song.cover_url}
                    songUrl={song.song_url}
                    country={song.country}
                    year={song.year}
                    genres={song.genres}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6">
                <svg 
                  className="mx-auto h-24 w-24 text-[#4B5D6C] opacity-50" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#4B5D6C] mb-2">
                No songs in this genre yet
              </h3>
              <p className="text-[#4B5D6C] mb-6">
                Be the first to add music to the {genre.name} genre!
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center px-6 py-3 bg-[#D7521D] text-white rounded-lg hover:bg-[#b64518] transition-colors"
              >
                Explore Other Genres
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}