import Path from "@/constants/movie-url/Path";
import {
  BookingRequest,
  BookingResponse,
  CastResponse,
  CategoryResponse,
  MovieResponse,
  NormalMovieResponse,
} from "@/types/Movie";
import { RestService } from "./RestService";

export const MovieService = {
  getMovieAll: async (): Promise<MovieResponse> => {
    return await RestService.get<MovieResponse>(Path.movie.list(1, 1000000));
  },
  getCatgoryAll: async (): Promise<CategoryResponse> => {
    return await RestService.get<CategoryResponse>(
      Path.category.list(1, 1000000)
    );
  },

  getCategoryByName: async (
    categoryName: string,
    page: number,
    size: number
  ): Promise<MovieResponse> => {
    return await RestService.get<MovieResponse>(
      Path.movie.categoryByName(categoryName, page, size)
    );
  },

  getAllCast: async (): Promise<CastResponse> => {
    return await RestService.get<CastResponse>(Path.cast.list(1, 1000000));
  },

  getMovieById: async (id: number): Promise<NormalMovieResponse> => {
    return await RestService.get<NormalMovieResponse>(Path.movie.getById(id));
  },

  registerBook: async (data: BookingRequest): Promise<BookingResponse> => {
    return await RestService.post(Path.booking.register(), data);
  },
};
