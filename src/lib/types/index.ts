export interface Genre {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  genreId: string;
  duration: number;
  releaseDate: string;
} 