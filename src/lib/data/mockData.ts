import { Genre, Song } from '../types';

export const mockGenres: Genre[] = [
  {
    id: 'funk',
    name: 'Funk',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Get down with the groove. Raw, rhythmic funk that makes you move.'
  },
  {
    id: 'jazz',
    name: 'Jazz',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Timeless jazz classics and hidden improvisational gems.'
  },
  {
    id: 'soul',
    name: 'Soul',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Deep, emotional soul music from the heart.'
  },
  {
    id: 'gospel',
    name: 'Gospel',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'Spiritual music that lifts the soul and moves the spirit.'
  },
  {
    id: 'lo-fi',
    name: 'Lo-Fi',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Chill, atmospheric beats perfect for studying and relaxing.'
  },
  {
    id: 'hiphop',
    name: 'Hip-Hop',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Raw beats, clever rhymes, and urban storytelling.'
  },
  {
    id: 'blues',
    name: 'Blues',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'The foundation of modern music. Raw emotion in 12 bars.'
  },
  {
    id: 'folk',
    name: 'Folk',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'Acoustic storytelling and traditional melodies.'
  },
  {
    id: 'reggae',
    name: 'Reggae',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Island rhythms and conscious vibes from Jamaica.'
  },
  {
    id: 'electronic',
    name: 'Electronic',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Digital soundscapes and synthesized explorations.'
  },
  {
    id: 'experimental',
    name: 'Experimental',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'Boundary-pushing sounds that challenge conventions.'
  },
  {
    id: 'disco',
    name: 'Disco',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Dance floor classics from the golden age of nightlife.'
  },
  {
    id: 'psych',
    name: 'Psychedelic',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Mind-bending sounds and cosmic musical journeys.'
  },
  {
    id: 'pop',
    name: 'Pop',
    imageUrl: '/covers/folk-treasures.jpg',
    description: 'Catchy melodies and timeless hooks that stick with you.'
  },
  {
    id: 'rock',
    name: 'Rock',
    imageUrl: '/covers/vintage-soul.jpg',
    description: 'Raw power, electric energy, and rebellious spirit.'
  },
  {
    id: 'ambient',
    name: 'Ambient',
    imageUrl: '/covers/jazz-classics.webp',
    description: 'Atmospheric soundscapes for contemplation and reflection.'
  }
];

// Featured albums for the music selection page
export const featuredAlbums = [
  {
    id: 'album-1',
    src: '/covers/jazz-classics.webp',
    artist: 'Miles Davis',
    albumName: 'Kind of Blue',
    album: 'Kind of Blue',
    albumForeignLang: 'Kind of Blue',
    relDate: '1959',
    country: 'USA',
    genre: 'Jazz',
    songs: ['song-6', 'song-7']
  },
  {
    id: 'album-2', 
    src: '/covers/folk-treasures.jpg',
    artist: 'Bob Dylan',
    albumName: 'The Freewheelin\' Bob Dylan',
    album: 'The Freewheelin\' Bob Dylan',
    albumForeignLang: 'The Freewheelin\' Bob Dylan',
    relDate: '1963',
    country: 'USA',
    genre: 'Folk',
    songs: ['song-14']
  },
  {
    id: 'album-3',
    src: '/covers/vintage-soul.jpg',
    artist: 'Aretha Franklin',
    albumName: 'Lady Soul',
    album: 'Lady Soul',
    albumForeignLang: 'Lady Soul',
    relDate: '1968',
    country: 'USA',
    genre: 'Soul',
    songs: ['song-1', 'song-2']
  },
  {
    id: 'album-4',
    src: '/covers/jazz-classics.webp',
    artist: 'John Coltrane',
    albumName: 'A Love Supreme',
    album: 'A Love Supreme',
    albumForeignLang: 'A Love Supreme',
    relDate: '1965',
    country: 'USA',
    genre: 'Jazz',
    songs: ['song-8', 'song-9']
  },
  {
    id: 'album-5',
    src: '/covers/folk-treasures.jpg',
    artist: 'Joni Mitchell',
    albumName: 'Blue',
    album: 'Blue',
    albumForeignLang: 'Blue',
    relDate: '1971',
    country: 'Canada',
    genre: 'Folk',
    songs: ['song-10', 'song-11']
  },
  {
    id: 'album-6',
    src: '/covers/vintage-soul.jpg',
    artist: 'Stevie Wonder',
    albumName: 'Songs in the Key of Life',
    album: 'Songs in the Key of Life',
    albumForeignLang: 'Songs in the Key of Life',
    relDate: '1976',
    country: 'USA',
    genre: 'Soul',
    songs: ['song-4', 'song-5']
  },
  {
    id: 'album-7',
    src: '/covers/jazz-classics.webp',
    artist: 'Billie Holiday',
    albumName: 'Lady in Satin',
    album: 'Lady in Satin',
    albumForeignLang: 'Lady in Satin',
    relDate: '1958',
    country: 'USA',
    genre: 'Jazz',
    songs: ['song-12', 'song-13']
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