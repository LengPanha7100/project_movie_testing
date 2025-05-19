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
  cast?: string[];
  director?: string;
}
export interface Category {
  name: string;
  type: string;
  count: number;
}
