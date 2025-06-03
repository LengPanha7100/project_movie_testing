
import LandingPageComponent from "@/components/LandingPageComponent";
import { MovieService } from "@/service/MovieService";


export default async function Home() {
  const responseMovieAll = await MovieService.getMovieAll();
  const responseCategory = await MovieService.getCatgoryAll();
  const responseBooking = await MovieService.getAllBooking();
  return (
    <>
      <LandingPageComponent responseMovieAll={responseMovieAll} responseCategory={responseCategory} responseBooking={responseBooking} />
    </>
  );
}
