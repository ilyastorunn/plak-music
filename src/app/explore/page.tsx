import { GenreCard } from '@/components/ui/GenreCard';
import { mockGenres } from '@/lib/data/mockData';
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F5EDF0' }}>
      {/* Header */}
      <div className="absolute top-[1rem] left-[1rem] z-50 pl-[0.5rem] pt-[0.5rem]">
        <Link 
          href="/" 
          className="font-Magtis text-[2rem] md:text-[3rem] font-extrabold hover:text-[#FF6B00] transition-colors duration-500"
          style={{ color: '#4B5D6C' }}
        >
          &quot;plak&quot;
        </Link>
        <p className="font-Magtis font-bold pl-[1.25rem] text-sm md:text-base" style={{ color: '#4B5D6C' }}>
          pick a song
        </p>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 
              className="text-5xl md:text-6xl font-normal mb-4"
              style={{ color: '#4B5D6C', fontFamily: 'Magtis' }}
            >
              Explore Genres
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
              style={{ color: '#4B5D6C', fontFamily: 'Inter' }}
            >
              Dive deep into musical genres and discover rare, forgotten treasures waiting to be rediscovered.
            </p>
            
            {/* Music Selection Link */}
            <div className="mb-8">
              <Link
                href="/select"
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#D7521D] to-[#4B5D6C] text-white rounded-lg font-Inter font-medium hover:translate-y-[-2px] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Featured Album Selection
              </Link>
            </div>
          </div>

          {/* Genre Grid - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockGenres.map((genre) => (
              <GenreCard 
                key={genre.id} 
                genre={genre}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 