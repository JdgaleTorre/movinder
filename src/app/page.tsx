import { api } from "~/trpc/server";
import MovieVote from "./_components/MovieVote";
import { Suspense } from "react";
import Image from "next/image";
import PopularMovies from "./_components/PopularMovies";

export default async function Home() {

  void api.movie.getPopularMovies.prefetch();

  return (

    <main className="flex min-h-screen flex-col items-center justify-center pb-1">
      <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
        <div className="flex flex-col items-stretch justify-center top-15 pt-7">
          <Suspense fallback={<Image src={`/rings.svg`} width={300} height={450} alt="Loading" />}>
            <PopularMovies />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
