import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { getSongById, featuredAlbums } from '@/lib/data/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PlayerPageProps {
  params: {
    id: string;
  };
}

export default function PlayerPage({ params }: PlayerPageProps) {
  // Check if it's an album ID first
  const album = featuredAlbums.find(album => album.id === params.id);
  
  let song;
  let isAlbumPlayer = false;
  
  if (album) {
    // If it's an album, get the first song from the album
    song = getSongById(album.songs[0]);
    isAlbumPlayer = true;
  } else {
    // If it's not an album, try to get the song directly
    song = getSongById(params.id);
  }

  if (!song) {
    notFound();
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F5EDF0' }}>
      {/* Back Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href={isAlbumPlayer ? "/select" : `/genre/${song.genreId}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {isAlbumPlayer ? "Back to Album Selection" : "Back to Genre"}
        </Link>
      </div>

      {/* Album Info (if playing from album) */}
      {isAlbumPlayer && album && (
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <img 
                src={album.src} 
                alt={album.albumName}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{album.albumName}</h3>
                <p className="text-sm text-gray-600">{album.artist}</p>
                <p className="text-xs text-gray-500">{album.relDate} • {album.genre}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Player - Now handles its own centering */}
      <AudioPlayer song={song} />
    </div>
  );
} 