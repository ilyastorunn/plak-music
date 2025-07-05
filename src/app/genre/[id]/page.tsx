import { SongCard } from '@/components/ui/SongCard';
import { getGenreById, getSongsByGenre } from '@/lib/data/mockData';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: {
    id: string;
  };
}

export default function GenrePage({ params }: GenrePageProps) {
  const genre = getGenreById(params.id);
  const songs = getSongsByGenre(params.id);

  if (!genre) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {genre.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {genre.description}
          </p>
        </div>
        
        {/* Songs Grid */}
        {songs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No songs available</h3>
            <p className="text-gray-600">This genre doesn&apos;t have any songs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 