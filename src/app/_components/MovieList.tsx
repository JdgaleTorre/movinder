"use client";

import Image from "next/image";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieList() {
    const [movies] = api.movieVote.get_votes_user.useSuspenseQuery();
    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-12">
            {movies && !isLoading && (
                <div className="flex flex-col items-center justify-center w-full max-w-md">
                    {movies && movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} />
                    ))
                    }
                </div>
            )}
            {isLoading && (
                <div className="w-[300px] h-[450px] flex items-center justify-center">
                    <Image src={`/rings.svg`} width={300} height={450} alt="Loading" />
                </div>
                // <img src="/rings.svg" className="w-[400px] h-[632px] min-w-[400px] max-w-screen-md" />

            )}
            {movies == null && (
                <p className="w-2/3 py-5 text-center text-xl">
                    There is no votes.
                </p>
            )}
        </div >
    );
}
