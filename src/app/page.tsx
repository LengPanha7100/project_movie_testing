
import LandingPageComponent from "@/components/LandingPageComponent";
import { MovieService } from "@/service/MovieService";


export default async function Home() {

  const responseMovieAll = await MovieService.getAllMovie();
  console.log("123", responseMovieAll);

  return (
    <>
      <LandingPageComponent responseMovieAll={responseMovieAll} />
    </>
  );
}
