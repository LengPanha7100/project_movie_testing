import Path from "@/constants/movie-url/Path";
import { CategoryResponse, MovieResponse } from "@/types/Movie";
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
};
