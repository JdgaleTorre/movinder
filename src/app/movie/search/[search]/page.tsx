import { Suspense } from "react";
import Image from "next/image";
import { api } from "~/trpc/server";
import SearchMovieList from "~/app/_components/SearchMovieList";

export default async function MovieSearch({ params }: { params: { search: string } }) {

    void api.movie.searchMovies.prefetch(params.search);
    return (
        <main className="flex min-h-screen flex-col items-center justify-center pb-1">
            <div className="container flex flex-col items-center justify-center gap-9 px-4 py-4">
                <div className="flex flex-col top-15 pt-7">
                    <Suspense fallback={<Image src={`/rings.svg`} width={300} height={450} alt="Loading" />}>
                        <h3 className="text-2xl font-bold mb-4 text-center">Popular Movies</h3>
                        <SearchMovieList input={params.search} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
// Search results for "{decodeURIComponent(params.search)}"