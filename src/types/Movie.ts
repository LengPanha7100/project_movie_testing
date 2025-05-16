export interface Movie {
  id: number;
  title: string;
  genre: string;
  type: string;
  rating: number;
  year: number;
  duration: string;
  description: string;
  image: string;
  isFavorite: boolean;
}
export interface Category {
  name: string;
  type: string;
  count: number;
}
