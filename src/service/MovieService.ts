import Path from "@/constants/movie-url/Path";
import { Movie } from "@/types/Movie";
import { RestService } from "./RestService";

export const MovieService = {
  getMovieAll: async (): Promise<Movie[]> => {
    return await RestService.get<Movie[]>(Path.movie.list(1, 1000000));
  },
};
