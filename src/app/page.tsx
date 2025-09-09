import { api } from "~/trpc/server";
import { Suspense } from "react";
import Image from "next/image";
import PopularMovies from "./_components/PopularMovies";
import WakeServer from "./_components/WakeServer";
import HybridRecommendations from "./_components/HybridRecommendations";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {

  void api.movie.getPopularMovies.prefetch();
  const session = await getServerAuthSession();

  return (

    <main className="flex min-h-screen flex-col items-center justify-center pb-1">
      <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
        <div className="flex flex-col top-15 pt-7">
          <WakeServer />
          <Suspense fallback={<Image src={`/rings.svg`} width={300} height={450} alt="Loading" />}>
            {session == null && (
              <div className="flex flex-col items-center justify-center pb-1 rounded-lg p-5 mb-10">
                <div className="flex flex-col items-center gap-2">
                  <p className="w-2/3 py-5 text-center text-xl">
                    Please <a
                      href={session ? "/api/auth/signout" : "/api/auth/signin"}
                      className="text-blue-800 italic"
                    >
                      {session ? "Sign out" : "Sign in"}
                    </a> to keep a track of your preferences in movies and get personalized recommendations
                  </p>
                </div>
              </div>
            )}
            {session?.user && (<>
              <h3 className="text-2xl font-bold mb-4 text-center">Your Recommendations</h3>
              <HybridRecommendations />
            </>)}


            <h3 className="text-2xl font-bold mb-4 text-center">Popular Movies</h3>
            <PopularMovies />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
