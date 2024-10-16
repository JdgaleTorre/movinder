import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MovieVote from "./_components/MovieVote";
import { Suspense } from "react";
import Navbar from "./_components/navBar";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.movie.getRandomMovie.prefetch();

  return (
    <HydrateClient>
      <div className="relative">
        <Navbar name={session?.user.name} image={session?.user.image} />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pb-1">
          <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
            {session == null && (
              <div className="flex flex-col items-center gap-2">
                <p className="w-2/3 py-5 text-center text-xl">
                  Please Sign In to keep a track of your preferences in movies
                </p>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Link
                    href={session ? "/api/auth/signout" : "/api/auth/signin"}
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    {session ? "Sign out" : "Sign in"}
                  </Link>
                </div>
              </div>
            )}

            {session?.user && (
              <div className="flex flex-col items-stretch justify-center top-15 pt-7">
                <Suspense fallback={<img src="/rings.svg" className="w-[300px] h-[450px]" />}>
                  <MovieVote />
                </Suspense>
              </div>
            )}
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
