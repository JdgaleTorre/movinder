import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MovieVote from "./_components/MovieVote";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-9 px-4 py-10">
          <div className="flex flex-row gap-5 items-center justify-between w-full">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Movinder
            </h1>
            {session?.user && (
              <div className="text-center text-2xl text-white">
                {session.user.image && (
                  <div className="flex size-16 items-center justify-center rounded-full bg-white">
                    <img
                      className="size-12 rounded-full"
                      src={session.user.image}
                      alt="profile picture"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {session == null && (
            <div className="flex flex-col items-center gap-2">
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
            <div className="flex flex-col items-stretch justify-center w-[400px] h-[750px]">
              <Suspense fallback={<img src="/rings.svg" className="w-[400px]" />}>
                <MovieVote />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
