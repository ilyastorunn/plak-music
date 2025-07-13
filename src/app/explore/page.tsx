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
          genres
        </p>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-16">
        <div className="max-w-[1000px] mx-auto px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ color: '#4B5D6C', fontFamily: 'Magtis' }}
            >
              Explore Genres
            </h1>
            <p 
              className="text-md md:text-lg max-w-2xl mx-auto italic"
              style={{ color: '#4B5D6C', fontFamily: 'Inter' }}
            >
              Dive deep into musical genres and discover rare, forgotten treasures waiting to be rediscovered.
            </p>
          </div>

          {/* Genre Grid - 2 Column Layout with smaller cards */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
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