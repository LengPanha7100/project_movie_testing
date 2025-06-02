
import LandingPageComponent from "@/components/LandingPageComponent";
import { MovieService } from "@/service/MovieService";


export default async function Home() {

  const responseMovieAll = await MovieService.getMovieAll();
  console.log("123", responseMovieAll);

  return (
    <>
      <LandingPageComponent responseMovieAll={responseMovieAll} />
    </>
  );
}
