import { Suspense } from "react";
import Image from "next/image";
import { api } from "~/trpc/server";
import SearchMovieList from "~/app/_components/SearchMovieList";

export default async function MovieSearch({ params }: { params: { search: string } }) {

    void api.movie.searchMovies.prefetch(params.search);
    return <Suspense
        fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
            </div>
        }
    >
        <SearchMovieList input={params.search} />
    </Suspense>;
}