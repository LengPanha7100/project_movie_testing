import { MovieService } from "@/service/MovieService";
import MovieDetailComponent from "./MovieDetailComponent";
interface PageProps {
    params: { id: number };
}
export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const responseMovie = await MovieService.getMovieById(id);
    const movie = responseMovie.payload.find(m => m.movieId === id);
    return <MovieDetailComponent movieData={movie} />
}
