import Link from "next/link";
import { api } from "~/trpc/server";
import MovieVote from "./_components/MovieVote";
import { Suspense } from "react";

export default async function Home() {

  void api.movie.getRandomMovie.prefetch();

  return (

    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pb-1">
      <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
        <div className="flex flex-col items-stretch justify-center top-15 pt-7">
          <Suspense fallback={<img src="/rings.svg" className="w-[300px] h-[450px]" />}>
            <MovieVote />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
