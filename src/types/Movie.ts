export interface Movie {
  movieId: number;
  title: string;
  year: number;
  duration: number;
  rating: number;
  overview: string;
  directorName: string;
  isFavorite: boolean;
  poster: string;
  thriller: string;
  category: Category;
  castMembers: CastMember[];
}
export interface Category {
  categoryId: number;
  name: string;
}

export interface UserMovieStatus {
  movieId: number;
  userId: number;
  hasPaid: boolean;
  hasWatched: boolean;
  userRating?: number;
  watchProgress?: number;
  watchedAt?: Date;
}

export interface MovieResponse {
  payload: Movie[];
  status?: string;
  message?: string;
}

export interface CategoryResponse {
  payload: Category[];
  status?: string;
  message?: string;
}

export interface CastMember {
  castId: number;
  name: string;
}

export interface CastResponse {
  payload: CastMember[];
  name: string;
}

export interface NormalMovieResponse {
  payload: Movie;
  status?: string;
  message?: string;
}

export interface Booking {
  bookingId: number;
  fullName: string;
  email: string;
  totalPrice: number;
  showId: Show;
  seatIds: Seat[];
}
export interface BookingResponse {
  payload: Booking[];
  status: string;
  message: string;
}

export interface BookingRequest {
  fullName: string;
  email: string;
  totalPrice: number;
  showId: Show;
  seatIds: Seat[];
}

export interface Show {
  showId: number;
  showDate: string;
  showTime: string;
  numberOfTicket: number;
}

export interface Seat {
  seatId: number;
  row: number;
  number: number;
}
