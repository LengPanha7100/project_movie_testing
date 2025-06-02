import { getAllCategoriesAction, getAllMovieAction } from "@/action/MovieActio";
import LandingPageComponent from "@/components/LandingPageComponent";
import { Category, Movie } from "@/types/Movie";

type MovieResponse = {
  payload: Movie[];
};
type CategoryResponse = {
  payload: Category[];
}

export default async function Home() {
  const movieResponse: MovieResponse = await getAllMovieAction();
  const data = movieResponse.payload;

  const categoryResponse:CategoryResponse[]  = await getAllCategoriesAction();
  const category = categoryResponse[0].payload;

  return (
    <>
      <LandingPageComponent data={data} category={category} />
    </>
  );
}
