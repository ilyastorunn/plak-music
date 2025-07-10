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
    <div className="min-h-screen relative bg-[#F5EDF0]">
      {/* Back Navigation */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link 
          href={isAlbumPlayer ? "/select" : `/genre/${song.genreId}`}
          className="font-Magtis text-[2rem] md:text-[3rem] font-extrabold text-[#4B5D6C] hover:text-[#D7521D] transition-colors duration-500"
        >
          &quot;plak&quot;
        </Link>
        <p className="font-Magtis font-bold text-[#4B5D6C] pl-[1.25rem] text-sm md:text-base">
          back to selection
        </p>
      </div>

      {/* Audio Player - Now handles its own centering */}
      <AudioPlayer song={song} />

      {/* Album Info Card */}
      {/* {isAlbumPlayer && album && (
        <div className="max-w-4xl mx-auto mt-2 px-8">
          <div className="bg-[#E8DCE1] bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
            <div className="flex items-center space-x-6">
              <img 
                src={album.src} 
                alt={album.albumName}
                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{album.albumName}</h3>
                    <p className="text-lg text-gray-600 mt-1">{album.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{album.relDate}</p>
                    <p className="text-sm text-gray-500 mt-1">{album.genre}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Now Playing: <span className="font-medium text-gray-900">{song.title}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
} 