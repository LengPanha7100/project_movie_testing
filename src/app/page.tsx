
import LandingPageComponent from "@/components/LandingPageComponent";
import { MovieService } from "@/service/MovieService";


export default async function Home() {

  const responseMovieAll = await MovieService.getMovieAll();
  const responseCategory = await MovieService.getCatgoryAll();
  console.log("category", responseCategory)
  return (
    <>
      <LandingPageComponent responseMovieAll={responseMovieAll} responseCategory={responseCategory} />
    </>
  );
}
