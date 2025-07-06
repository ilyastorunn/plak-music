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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href={isAlbumPlayer ? "/select" : `/genre/${song.genreId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isAlbumPlayer ? "Back to Album Selection" : "Back to Genre"}
          </Link>
        </div>

        {/* Album Info (if playing from album) */}
        {isAlbumPlayer && album && (
          <div className="max-w-2xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={album.src} 
                alt={album.albumName}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{album.albumName}</h2>
                <p className="text-lg text-gray-600">{album.artist}</p>
                <p className="text-sm text-gray-500">{album.relDate} • {album.genre}</p>
              </div>
            </div>
          </div>
        )}

        {/* Audio Player */}
        <AudioPlayer song={song} />

        {/* Additional Song Info */}
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Song Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Genre:</span>
              <span className="ml-2 text-gray-900 capitalize">{song.genreId}</span>
            </div>
            <div>
              <span className="text-gray-500">Release Date:</span>
              <span className="ml-2 text-gray-900">
                {new Date(song.releaseDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Duration:</span>
              <span className="ml-2 text-gray-900">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Format:</span>
              <span className="ml-2 text-gray-900">MP3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 