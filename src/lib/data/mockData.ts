import { Genre, Song } from '../types';

export const mockGenres: Genre[] = [
  {
    id: 'jazz',
    name: 'Jazz Classics',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Discover the timeless sounds of jazz legends and hidden gems from the golden age of improvisation and swing.'
  },
  {
    id: 'folk',
    name: 'Folk Treasures',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'Uncover rare folk recordings and acoustic storytelling that captures the essence of human experience.'
  },
  {
    id: 'electronic',
    name: 'Vintage Soul',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Experience the raw emotion and powerful vocals of classic soul music from the 60s and 70s.'
  },
  {
    id: 'ambient',
    name: 'Blues Heritage',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Explore the roots of modern music through authentic blues recordings and forgotten masterpieces.'
  },
  {
    id: 'classical',
    name: 'Classic Rock',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Journey through the evolution of rock music with rare tracks and legendary performances.'
  },
  {
    id: 'world',
    name: 'World Music',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Discover musical traditions from around the globe, featuring rare recordings and cultural treasures.'
  }
];

export const mockSongs: Song[] = [
  // Electronic
  {
    id: 'song-1',
    title: 'Digital Dreams',
    artist: 'SynthWave',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/digital-dreams.mp3',
    genreId: 'electronic',
    duration: 245,
    releaseDate: '2024-01-15'
  },
  {
    id: 'song-2',
    title: 'Neon Nights',
    artist: 'ElectroMind',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/neon-nights.mp3',
    genreId: 'electronic',
    duration: 312,
    releaseDate: '2024-02-01'
  },
  {
    id: 'song-3',
    title: 'Circuit Flow',
    artist: 'TechnoSphere',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/circuit-flow.mp3',
    genreId: 'electronic',
    duration: 189,
    releaseDate: '2024-01-20'
  },
  
  // Ambient
  {
    id: 'song-4',
    title: 'Floating Clouds',
    artist: 'Serenity',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/floating-clouds.mp3',
    genreId: 'ambient',
    duration: 420,
    releaseDate: '2024-01-10'
  },
  {
    id: 'song-5',
    title: 'Ocean Depths',
    artist: 'Deep Space',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/ocean-depths.mp3',
    genreId: 'ambient',
    duration: 567,
    releaseDate: '2024-02-05'
  },
  
  // Jazz
  {
    id: 'song-6',
    title: 'Midnight Jazz',
    artist: 'Blue Note Trio',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/midnight-jazz.mp3',
    genreId: 'jazz',
    duration: 278,
    releaseDate: '2024-01-25'
  },
  {
    id: 'song-7',
    title: 'Smooth Saxophone',
    artist: 'Jazz Collective',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/smooth-saxophone.mp3',
    genreId: 'jazz',
    duration: 234,
    releaseDate: '2024-02-10'
  },
  
  // Classical
  {
    id: 'song-8',
    title: 'Piano Sonata',
    artist: 'Chamber Orchestra',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/piano-sonata.mp3',
    genreId: 'classical',
    duration: 456,
    releaseDate: '2024-01-05'
  },
  {
    id: 'song-9',
    title: 'String Quartet',
    artist: 'Baroque Ensemble',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/string-quartet.mp3',
    genreId: 'classical',
    duration: 334,
    releaseDate: '2024-02-15'
  },
  
  // Indie
  {
    id: 'song-10',
    title: 'Coffee Shop Dreams',
    artist: 'Indie Collective',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/coffee-shop-dreams.mp3',
    genreId: 'indie',
    duration: 201,
    releaseDate: '2024-01-30'
  },
  {
    id: 'song-11',
    title: 'Sunset Boulevard',
    artist: 'Urban Folk',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/sunset-boulevard.mp3',
    genreId: 'indie',
    duration: 287,
    releaseDate: '2024-02-20'
  },
  
  // World
  {
    id: 'song-12',
    title: 'Desert Winds',
    artist: 'World Fusion',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/desert-winds.mp3',
    genreId: 'world',
    duration: 345,
    releaseDate: '2024-01-12'
  },
  
  // Experimental
  {
    id: 'song-13',
    title: 'Sound Experiment #1',
    artist: 'Avant Garde',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/sound-experiment-1.mp3',
    genreId: 'experimental',
    duration: 412,
    releaseDate: '2024-02-25'
  },
  
  // Folk
  {
    id: 'song-14',
    title: 'Country Road',
    artist: 'Folk Wanderer',
    albumCover: '/api/placeholder/250/250',
    audioUrl: '/audio/country-road.mp3',
    genreId: 'folk',
    duration: 198,
    releaseDate: '2024-01-18'
  }
];

// Helper functions
export const getGenreById = (id: string): Genre | undefined => {
  return mockGenres.find(genre => genre.id === id);
};

export const getSongsByGenre = (genreId: string): Song[] => {
  return mockSongs.filter(song => song.genreId === genreId);
};

export const getSongById = (id: string): Song | undefined => {
  return mockSongs.find(song => song.id === id);
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}; 